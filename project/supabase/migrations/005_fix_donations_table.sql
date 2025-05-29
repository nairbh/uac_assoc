-- Supprimer la table existante si elle existe
DROP TABLE IF EXISTS public.donations CASCADE;

-- Recréer la table des dons
CREATE TABLE IF NOT EXISTS public.donations (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'EUR',
  payment_method VARCHAR(50), -- 'card', 'bank_transfer', 'paypal', 'cash', 'check'
  transaction_id VARCHAR(255), -- ID de transaction externe
  status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
  donation_type VARCHAR(50) DEFAULT 'general', -- 'general', 'event', 'project', 'membership'
  tax_receipt_requested BOOLEAN DEFAULT TRUE,
  tax_receipt_sent BOOLEAN DEFAULT FALSE,
  tax_receipt_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX idx_donations_user_id ON public.donations(user_id);
CREATE INDEX idx_donations_created_at ON public.donations(created_at DESC);
CREATE INDEX idx_donations_status ON public.donations(status);
CREATE INDEX idx_donations_amount ON public.donations(amount DESC);

-- Commentaires pour la documentation
COMMENT ON TABLE public.donations IS 'Table des dons et contributions des utilisateurs';
COMMENT ON COLUMN public.donations.amount IS 'Montant du don en euros';
COMMENT ON COLUMN public.donations.tax_receipt_requested IS 'Si l''utilisateur souhaite un reçu fiscal';
COMMENT ON COLUMN public.donations.tax_receipt_sent IS 'Si le reçu fiscal a été envoyé';
COMMENT ON COLUMN public.donations.tax_receipt_number IS 'Numéro du reçu fiscal';

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_donations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour updated_at
DROP TRIGGER IF EXISTS trigger_update_donations_updated_at ON public.donations;
CREATE TRIGGER trigger_update_donations_updated_at
  BEFORE UPDATE ON public.donations
  FOR EACH ROW
  EXECUTE FUNCTION update_donations_updated_at();

-- S'assurer qu'un utilisateur admin existe
DO $$
DECLARE
    admin_id UUID;
BEGIN
    -- Vérifier si l'utilisateur admin existe
    SELECT id INTO admin_id FROM public.profiles WHERE email = 'admin@atmf-argenteuil.org' LIMIT 1;
    
    -- Si l'utilisateur admin existe, insérer les dons de test
    IF admin_id IS NOT NULL THEN
        INSERT INTO public.donations (user_id, amount, payment_method, donation_type, notes) VALUES
        (admin_id, 50.00, 'card', 'general', 'Don mensuel'),
        (admin_id, 100.00, 'bank_transfer', 'event', 'Soutien événement Ramadan'),
        (admin_id, 25.00, 'card', 'project', 'Aide aux familles');
    END IF;
END $$;

-- Politique de sécurité : les utilisateurs peuvent voir leurs propres dons
CREATE POLICY "Users can view their own donations" ON public.donations
  FOR SELECT USING (auth.uid() = user_id);

-- Politique de sécurité : seuls les admins peuvent insérer/modifier des dons
CREATE POLICY "Only admins can manage donations" ON public.donations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Activer RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY; 