-- Script pour configurer la table des données financières avec des politiques d'accès
-- À exécuter dans la console SQL de Supabase

-- Créer une table pour les données financières
CREATE TABLE IF NOT EXISTS financial_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  transaction_date DATE NOT NULL,
  category TEXT NOT NULL,
  is_expense BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES auth.users(id),
  notes TEXT
);

-- Mettre à jour la colonne updated_at automatiquement
DROP TRIGGER IF EXISTS update_financial_data_updated_at ON financial_data;
CREATE TRIGGER update_financial_data_updated_at
BEFORE UPDATE ON financial_data
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Activer RLS (Row Level Security) pour la table financial_data
ALTER TABLE financial_data ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Admins can read financial data" ON financial_data;
DROP POLICY IF EXISTS "Admins can insert financial data" ON financial_data;
DROP POLICY IF EXISTS "Admins can update financial data" ON financial_data;
DROP POLICY IF EXISTS "Admins can delete financial data" ON financial_data;

-- Politique : Seuls les administrateurs peuvent lire les données financières
CREATE POLICY "Admins can read financial data"
ON financial_data
FOR SELECT
USING (
  auth.role() = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Politique : Seuls les administrateurs peuvent insérer des données financières
CREATE POLICY "Admins can insert financial data"
ON financial_data
FOR INSERT
WITH CHECK (
  auth.role() = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Politique : Seuls les administrateurs peuvent mettre à jour des données financières
CREATE POLICY "Admins can update financial data"
ON financial_data
FOR UPDATE
USING (
  auth.role() = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Politique : Seuls les administrateurs peuvent supprimer des données financières
CREATE POLICY "Admins can delete financial data"
ON financial_data
FOR DELETE
USING (
  auth.role() = 'service_role' OR 
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Créer une fonction pour vérifier si un utilisateur est administrateur
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Accorder les privilèges nécessaires
GRANT ALL ON financial_data TO service_role;
GRANT SELECT ON financial_data TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;

-- Insérer quelques données d'exemple (à exécuter avec le rôle service_role)
INSERT INTO financial_data (description, amount, transaction_date, category, is_expense, notes)
VALUES
  ('Don d''entreprise', 1000.00, CURRENT_DATE, 'Dons', false, 'Don annuel de l''entreprise XYZ'),
  ('Achat de matériel scolaire', 250.00, CURRENT_DATE - INTERVAL '2 days', 'Fournitures', true, 'Pour les ateliers d''aide aux devoirs'),
  ('Subvention municipale', 3000.00, CURRENT_DATE - INTERVAL '7 days', 'Subventions', false, 'Projet d''alphabétisation'),
  ('Location de salle', 150.00, CURRENT_DATE - INTERVAL '5 days', 'Locaux', true, 'Pour l''événement du 15 avril')
ON CONFLICT DO NOTHING;

-- Instructions pour tester l'accès:
-- 1. Connectez-vous en tant qu'administrateur et essayez d'accéder à "SELECT * FROM financial_data"
-- 2. Connectez-vous en tant que membre non-admin et essayez la même requête
-- 3. Vérifiez que seul l'administrateur peut voir les données 