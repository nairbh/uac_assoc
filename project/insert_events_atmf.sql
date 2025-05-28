-- Script pour insérer des événements pertinents pour l'ATMF Argenteuil
-- À exécuter dans Supabase Studio ou via psql

-- Supprimer les anciens événements (optionnel)
-- DELETE FROM events;

-- Insérer des événements pertinents à l'ATMF Argenteuil
INSERT INTO events (title, slug, description, details, image_url, category, date, time_start, time_end, location, max_participants, status, created_by) VALUES

-- Événement 1: Assemblée générale 2025
('Assemblée Générale Annuelle 2025', 
 'assemblee-generale-2025', 
 'Venez participer à notre Assemblée Générale annuelle pour faire le bilan de l''année 2024 et définir ensemble les orientations pour 2025.',
 'Ordre du jour :
- Rapport moral du président
- Rapport financier du trésorier
- Présentation des projets 2025
- Élection du conseil d''administration
- Questions diverses

Tous les adhérents sont invités à participer. Une collation sera offerte à l''issue de la réunion.',
 '/images/ag-2025.jpg',
 'Institutionnel',
 '2025-06-14',
 '14:00',
 '17:00',
 'Salle des fêtes d''Argenteuil, 2 rue Henri Barbusse, 95100 Argenteuil',
 200,
 'published',
 NULL),

-- Événement 2: Permanence juridique
('Permanence Juridique Gratuite',
 'permanence-juridique-janvier',
 'Consultation juridique gratuite avec Maître Karim Ziani, avocat spécialisé en droit des étrangers.',
 'Maître Karim Ziani, avocat au barreau de Paris, spécialisé en droit des étrangers, vous reçoit pour des consultations gratuites.

Domaines de compétence :
- Droit au séjour et naturalisation
- Regroupement familial
- Recours contre les décisions préfectorales
- Droit d''asile
- Contentieux administratif

Sur rendez-vous uniquement. Appelez le 01 39 61 12 34 pour prendre rendez-vous.',
 '/images/permanence-juridique.jpg',
 'Services',
 '2025-01-25',
 '14:00',
 '17:00',
 'Locaux ATMF, 25 rue Gabriel Péri, 95100 Argenteuil',
 15,
 'published',
 NULL),

-- Événement 3: Cours de français
('Inscription aux Cours de Français 2025',
 'inscription-cours-francais-2025',
 'Ouverture des inscriptions pour les cours de français langue étrangère (FLE) pour l''année 2025.',
 'L''ATMF Argenteuil propose des cours de français adaptés à tous les niveaux :

Niveaux proposés :
- Alphabétisation
- Débutant (A1-A2)
- Intermédiaire (B1)
- Perfectionnement (B2)

Horaires :
- Matin : 9h30-11h30 (lundi, mercredi, vendredi)
- Soir : 18h30-20h30 (mardi, jeudi)

Tarif : 30€ par an pour les adhérents ATMF
Inscription obligatoire. Test de niveau le jour de l''inscription.',
 '/images/cours-francais-inscription.jpg',
 'Éducation',
 '2025-01-20',
 '14:00',
 '18:00',
 'Locaux ATMF, 25 rue Gabriel Péri, 95100 Argenteuil',
 50,
 'published',
 NULL),

-- Événement 4: Iftar communautaire
('Iftar Communautaire 2025',
 'iftar-communautaire-2025',
 'Rejoignez-nous pour notre traditionnel iftar communautaire, un moment de partage et de convivialité ouvert à tous.',
 'Comme chaque année, l''ATMF Argenteuil organise son iftar communautaire pendant le mois de Ramadan.

Programme :
- 19h30 : Accueil et prière du Maghreb
- 20h00 : Rupture du jeûne
- 20h30 : Repas communautaire
- 21h30 : Chants religieux et témoignages

Menu traditionnel maghrébin préparé par nos bénévoles.
Participation libre aux frais.

Inscription recommandée pour l''organisation.',
 '/images/iftar-2025.jpg',
 'Religieux',
 '2025-03-22',
 '19:30',
 '22:30',
 'Salle des fêtes d''Argenteuil, 2 rue Henri Barbusse, 95100 Argenteuil',
 300,
 'published',
 NULL),

-- Événement 5: Fête de l'indépendance
('Célébration de l''Indépendance Algérienne',
 'fete-independance-2025',
 'Commémoration du 63ème anniversaire de l''indépendance de l''Algérie avec cérémonie officielle et festivités culturelles.',
 'Programme de la journée :

14h00 : Cérémonie officielle
- Levée des drapeaux
- Minute de silence
- Témoignages d''anciens combattants
- Dépôt de gerbe

15h30 : Festivités culturelles
- Danses folkloriques
- Concert de musique chaâbi
- Exposition d''artisanat traditionnel
- Stand de calligraphie arabe
- Dégustation de pâtisseries orientales

Entrée libre. Venez nombreux célébrer notre histoire et notre culture !',
 '/images/independance-2025.jpg',
 'Culture',
 '2025-07-05',
 '14:00',
 '18:00',
 'Square Nelson Mandela, Argenteuil',
 500,
 'published',
 NULL),

-- Événement 6: Conférence citoyenneté
('Conférence : Vers une Citoyenneté Active',
 'conference-citoyennete-active',
 'Conférence-débat sur l''engagement citoyen et la participation démocratique des populations d''origine maghrébine.',
 'L''ATMF vous invite à une conférence-débat sur le thème "Vers une Citoyenneté Active : Défis et Opportunités".

Intervenants :
- Dr. Fatima Lalem, sociologue spécialiste des migrations
- Karim Amellal, écrivain et essayiste
- Représentant de la Préfecture du Val-d''Oise
- Élu municipal d''Argenteuil

Thèmes abordés :
- Histoire de l''immigration maghrébine en France
- Droits et devoirs du citoyen
- Participation à la vie démocratique locale
- Lutte contre les discriminations
- Transmission aux jeunes générations

Débat avec le public et questions-réponses.
Entrée libre.',
 '/images/conference-citoyennete.jpg',
 'Institutionnel',
 '2025-02-15',
 '14:30',
 '17:30',
 'Centre culturel d''Argenteuil, 5 rue Léon Feix, 95100 Argenteuil',
 150,
 'published',
 NULL),

-- Événement 7: Collecte solidaire
('Collecte Solidaire pour les Sinistrés',
 'collecte-solidaire-2025',
 'Organisation d''une collecte de vêtements et produits de première nécessité pour les victimes des catastrophes naturelles.',
 'L''ATMF Argenteuil organise une grande collecte solidaire pour venir en aide aux populations sinistrées.

Articles recherchés :
- Vêtements (tous âges et toutes tailles)
- Couvertures et linge de maison
- Produits d''hygiène
- Médicaments (non périmés)
- Jouets pour enfants
- Produits alimentaires non périssables

Points de collecte :
- Locaux ATMF (25 rue Gabriel Péri)
- Mosquée d''Argenteuil
- Centre social du quartier

Les dons seront triés par nos bénévoles et expédiés vers les zones sinistrées en partenariat avec des associations humanitaires.

Merci pour votre générosité !',
 '/images/collecte-solidaire.jpg',
 'Solidarité',
 '2025-01-18',
 '09:00',
 '17:00',
 'Locaux ATMF, 25 rue Gabriel Péri, 95100 Argenteuil',
 NULL,
 'published',
 NULL);

-- Script pour mettre à jour le created_by avec un UUID valide après insertion
-- UPDATE events SET created_by = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE created_by IS NULL; 