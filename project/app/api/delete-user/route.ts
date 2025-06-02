import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Client admin pour les opérations de suppression
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Rate limiting pour les suppressions de compte (max 3 par heure par IP)
const deletionAttempts = new Map<string, { count: number; resetTime: number }>();

export async function DELETE(request: NextRequest) {
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

  try {
    // 1. Vérification de l'autorisation via token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      console.log('Tentative de suppression sans autorisation');
      return NextResponse.json(
        { error: 'Non autorisé - Token requis' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      console.log('Token invalide pour suppression compte');
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // 2. Rate limiting pour les suppressions
    const now = Date.now();
    const attempts = deletionAttempts.get(clientIP);
    
    if (attempts) {
      if (now < attempts.resetTime) {
        if (attempts.count >= 3) {
          console.log(`Rate limit dépassé pour suppression de compte - IP: ${clientIP}`);
          return NextResponse.json(
            { error: 'Trop de tentatives de suppression. Réessayez dans 1 heure.' },
            { status: 429 }
          );
        }
        attempts.count++;
      } else {
        // Reset du compteur après 1 heure
        deletionAttempts.set(clientIP, { count: 1, resetTime: now + 3600000 });
      }
    } else {
      deletionAttempts.set(clientIP, { count: 1, resetTime: now + 3600000 });
    }

    // 3. L'utilisateur ne peut supprimer que son propre compte
    const userId = user.id;

    console.log(`Suppression du compte demandée par l'utilisateur: ${userId}`);

    // 4. Vérifier que l'utilisateur à supprimer existe et récupérer ses infos
    const { data: targetUser, error: targetError } = await supabase
      .from('profiles')
      .select('email, role, first_name, last_name')
      .eq('id', userId)
      .single();

    if (targetError || !targetUser) {
      console.log('Utilisateur non trouvé pour suppression');
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // 5. Empêcher la suppression d'admins via cette route (ils doivent utiliser l'admin)
    if (targetUser.role === 'admin') {
      console.log('Tentative de suppression de compte admin via route membre');
      return NextResponse.json(
        { error: 'Les administrateurs ne peuvent pas supprimer leur compte via cette route. Contactez un autre administrateur.' },
        { status: 403 }
      );
    }

    console.log(`Suppression autorisée du compte: ${targetUser.email}`);

    // 6. Supprimer le profil d'abord
    console.log('Suppression du profil...');
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.error('Erreur suppression profil:', profileError);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression du profil' },
        { status: 500 }
      );
    }

    console.log('Profil supprimé avec succès');

    // 7. Supprimer l'utilisateur de l'authentification
    console.log('Suppression de l\'utilisateur auth...');
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error('Erreur suppression utilisateur:', deleteAuthError);
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de l\'utilisateur' },
        { status: 500 }
      );
    }

    console.log('Suppression de compte terminée avec succès');

    return NextResponse.json(
      { message: 'Compte supprimé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur suppression compte:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 