import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { SecurityValidator } from '@/lib/security';

// Client admin pour les opérations de suppression
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Rate limiting pour les suppressions (max 5 suppressions par heure par IP)
const deletionAttempts = new Map<string, { count: number; resetTime: number }>();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const startTime = Date.now();
  const clientIP = request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown';

  try {
    const userId = params.id;

    // 1. Validation de base
    if (!userId || typeof userId !== 'string' || userId.length < 10) {
      SecurityValidator.logSecurityEvent(
        'INVALID_USER_ID_DELETE',
        'medium',
        `Tentative de suppression avec ID invalide: ${SecurityValidator.obfuscate(userId)}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'ID utilisateur invalide' },
        { status: 400 }
      );
    }

    // 2. Protection contre les injections
    if (SecurityValidator.detectSQLInjection(userId)) {
      SecurityValidator.logSecurityEvent(
        'SQL_INJECTION_DELETE_USER',
        'critical',
        `Tentative d'injection SQL dans suppression utilisateur: ${SecurityValidator.obfuscate(userId)}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'Tentative d\'attaque détectée' },
        { status: 403 }
      );
    }

    // 3. Rate limiting pour les suppressions
    const now = Date.now();
    const attempts = deletionAttempts.get(clientIP);
    
    if (attempts) {
      if (now < attempts.resetTime) {
        if (attempts.count >= 5) {
          SecurityValidator.logSecurityEvent(
            'RATE_LIMIT_DELETE_USER',
            'high',
            `Limite de suppressions dépassée pour IP: ${clientIP}`,
            clientIP
          );
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

    // 4. Vérification de l'autorisation via token
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      SecurityValidator.logSecurityEvent(
        'UNAUTHORIZED_DELETE_ATTEMPT',
        'high',
        `Tentative de suppression sans autorisation pour user: ${SecurityValidator.obfuscate(userId)}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      SecurityValidator.logSecurityEvent(
        'INVALID_TOKEN_DELETE',
        'high',
        `Token invalide pour suppression utilisateur: ${SecurityValidator.obfuscate(userId)}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // 5. Vérifier que l'utilisateur est admin
    const { data: adminProfile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError || !adminProfile || adminProfile.role !== 'admin') {
      SecurityValidator.logSecurityEvent(
        'NON_ADMIN_DELETE_ATTEMPT',
        'critical',
        `Utilisateur non-admin tentant de supprimer: ${SecurityValidator.obfuscate(userId)} par ${SecurityValidator.obfuscate(user.email || '')}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'Permissions insuffisantes' },
        { status: 403 }
      );
    }

    // 6. Vérifier que l'utilisateur à supprimer existe
    const { data: targetUser, error: targetError } = await supabase
      .from('profiles')
      .select('email, role, first_name, last_name')
      .eq('id', userId)
      .single();

    if (targetError || !targetUser) {
      SecurityValidator.logSecurityEvent(
        'DELETE_NONEXISTENT_USER',
        'medium',
        `Tentative de suppression d'utilisateur inexistant: ${SecurityValidator.obfuscate(userId)}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      );
    }

    // 7. Empêcher la suppression d'admins par d'autres admins (sauf si c'est lui-même)
    if (targetUser.role === 'admin' && user.id !== userId) {
      SecurityValidator.logSecurityEvent(
        'ADMIN_DELETE_ATTEMPT',
        'critical',
        `Tentative de suppression d'admin: ${SecurityValidator.obfuscate(targetUser.email)} par ${SecurityValidator.obfuscate(user.email || '')}`,
        clientIP
      );
      return NextResponse.json(
        { error: 'Impossible de supprimer un autre administrateur' },
        { status: 403 }
      );
    }

    // 8. Log de l'action autorisée
    SecurityValidator.logSecurityEvent(
      'AUTHORIZED_USER_DELETION',
      'low',
      `Suppression autorisée de ${SecurityValidator.obfuscate(targetUser.email)} par admin ${SecurityValidator.obfuscate(user.email || '')}`,
      clientIP,
      user.id
    );

    console.log(`Suppression autorisée de l'utilisateur: ${userId} par admin: ${user.id}`);

    // 9. Supprimer le profil d'abord
    console.log('Suppression du profil...');
    const { error: profileDeleteError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (profileDeleteError) {
      console.error('Erreur suppression profil:', profileDeleteError);
      SecurityValidator.logSecurityEvent(
        'PROFILE_DELETE_ERROR',
        'medium',
        `Erreur suppression profil: ${profileDeleteError.message}`,
        clientIP,
        user.id
      );
      return NextResponse.json(
        { error: 'Erreur lors de la suppression du profil' },
        { status: 500 }
      );
    }

    console.log('Profil supprimé avec succès');

    // 10. Supprimer l'utilisateur de l'authentification
    console.log('Suppression de l\'utilisateur auth...');
    const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (authDeleteError) {
      console.error('Erreur suppression utilisateur:', authDeleteError);
      SecurityValidator.logSecurityEvent(
        'AUTH_DELETE_ERROR',
        'medium',
        `Erreur suppression auth: ${authDeleteError.message}`,
        clientIP,
        user.id
      );
      return NextResponse.json(
        { error: 'Erreur lors de la suppression de l\'utilisateur' },
        { status: 500 }
      );
    }

    console.log('Utilisateur supprimé avec succès');

    // 11. Log de succès
    SecurityValidator.logSecurityEvent(
      'USER_DELETED_SUCCESS',
      'low',
      `Utilisateur ${SecurityValidator.obfuscate(targetUser.email)} supprimé avec succès`,
      clientIP,
      user.id
    );

    const processingTime = Date.now() - startTime;
    console.log(`Suppression complétée en ${processingTime}ms`);

    return NextResponse.json(
      { message: 'Utilisateur supprimé avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur suppression compte:', error);
    SecurityValidator.logSecurityEvent(
      'DELETE_USER_EXCEPTION',
      'high',
      `Exception lors de la suppression: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      clientIP
    );
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
} 