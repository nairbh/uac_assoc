import { supabase } from '@/lib/supabase';

export interface Donation {
  id: number;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  transaction_id?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  donation_type: 'general' | 'event' | 'project' | 'membership';
  tax_receipt_requested: boolean;
  tax_receipt_sent: boolean;
  tax_receipt_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DonationStats {
  totalAmount: number;
  donationCount: number;
  yearlyAmount: number;
  taxDeduction: number;
  averageDonation: number;
  lastDonation?: Donation;
}

// Récupérer tous les dons d'un utilisateur
export async function getUserDonations(userId: string): Promise<Donation[]> {
  const { data, error } = await supabase
    .from('donations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des dons:', error);
    throw error;
  }

  return data || [];
}

// Calculer les statistiques de dons d'un utilisateur
export async function getUserDonationStats(userId: string): Promise<DonationStats> {
  const donations = await getUserDonations(userId);
  
  if (donations.length === 0) {
    return {
      totalAmount: 0,
      donationCount: 0,
      yearlyAmount: 0,
      taxDeduction: 0,
      averageDonation: 0,
    };
  }

  const currentYear = new Date().getFullYear();
  const completedDonations = donations.filter(d => d.status === 'completed');
  const yearlyDonations = completedDonations.filter(d => 
    new Date(d.created_at).getFullYear() === currentYear
  );

  const totalAmount = completedDonations.reduce((sum, d) => sum + d.amount, 0);
  const yearlyAmount = yearlyDonations.reduce((sum, d) => sum + d.amount, 0);
  
  // Calcul de la réduction d'impôt (66% du montant, plafonné à 20% du revenu imposable)
  // Pour simplifier, on applique 66% sans plafond ici
  const taxDeduction = yearlyAmount * 0.66;

  return {
    totalAmount,
    donationCount: completedDonations.length,
    yearlyAmount,
    taxDeduction,
    averageDonation: totalAmount / completedDonations.length,
    lastDonation: completedDonations[0],
  };
}

// Créer un nouveau don
export async function createDonation(donation: Omit<Donation, 'id' | 'created_at' | 'updated_at'>): Promise<Donation> {
  const { data, error } = await supabase
    .from('donations')
    .insert([donation])
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de la création du don:', error);
    throw error;
  }

  return data;
}

// Mettre à jour le statut d'un don
export async function updateDonationStatus(donationId: number, status: Donation['status']): Promise<void> {
  const { error } = await supabase
    .from('donations')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', donationId);

  if (error) {
    console.error('Erreur lors de la mise à jour du don:', error);
    throw error;
  }
}

// Marquer le reçu fiscal comme envoyé
export async function markTaxReceiptSent(donationId: number, receiptNumber: string): Promise<void> {
  const { error } = await supabase
    .from('donations')
    .update({ 
      tax_receipt_sent: true, 
      tax_receipt_number: receiptNumber,
      updated_at: new Date().toISOString()
    })
    .eq('id', donationId);

  if (error) {
    console.error('Erreur lors de la mise à jour du reçu fiscal:', error);
    throw error;
  }
}

// Obtenir tous les dons pour l'admin
export async function getAllDonations(): Promise<Donation[]> {
  const { data, error } = await supabase
    .from('donations')
    .select(`
      *,
      profiles!donations_user_id_fkey (
        first_name,
        last_name,
        email
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération de tous les dons:', error);
    throw error;
  }

  return data || [];
} 