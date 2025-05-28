-- Script complet pour configurer la base de données ATMF Argenteuil
-- À exécuter dans Supabase Studio ou via psql

-- 1. Insérer les événements
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

-- 2. Supprimer les anciens articles et insérer les nouveaux
DELETE FROM articles;

INSERT INTO articles (title, slug, content, excerpt, image_url, category, author_id, status, published_at, created_at) VALUES

-- Article 1: Histoire et mission de l'ATMF
('Vers une Citoyenneté Active : L''Engagement de l''ATMF Argenteuil', 
 'engagement-atmf-citoyennete-active', 
 'Depuis sa création en 1982, l''Association des Travailleurs Maghrébins de France (ATMF) œuvre pour la défense des droits des immigrés maghrébins et la promotion d''une citoyenneté active en France. Née de la volonté de lutter contre les discriminations et de favoriser l''intégration, l''ATMF s''est imposée comme un acteur incontournable dans le paysage associatif français.

**Un Combat pour l''Égalité des Droits**

L''ATMF milite pour l''égalité des droits dans tous les domaines : logement, travail, éducation, santé. Elle lutte contre le racisme, la xénophobie et toutes les formes d''exclusion. En se portant partie civile dans des affaires de discriminations, elle affirme son engagement pour une société plus juste.

La section d''Argenteuil, créée en 1985, s''inscrit pleinement dans cette démarche. "Notre mission est d''accompagner nos concitoyens vers une citoyenneté pleine et entière", explique Mohammed Benali, président de l''ATMF Argenteuil.

**Des Actions Concrètes sur le Terrain**

Présente dans le Val-d''Oise depuis près de 40 ans, l''ATMF Argenteuil organise des permanences juridiques et sociales pour accompagner les personnes primo-arrivantes. Elle propose également des ateliers de formation au numérique, facilitant ainsi l''accès aux droits sociaux et juridiques.

En 2024, plus de 800 dossiers administratifs ont été traités, 120 personnes ont suivi nos cours de français, et nos actions de médiation ont permis de résoudre de nombreux conflits de voisinage.

**Une Mémoire à Préserver**

L''ATMF s''investit également dans la préservation de la mémoire des immigrés maghrébins. Elle organise régulièrement des conférences et des expositions sur l''histoire de l''immigration, contribuant ainsi à la transmission intergénérationnelle.

**Un Réseau Solidaire**

En collaborant avec d''autres associations locales et en participant à des campagnes nationales, l''ATMF Argenteuil renforce la solidarité entre les peuples et promeut les valeurs de démocratie et de laïcité qui fondent notre République.', 
 'Depuis 1982, l''ATMF œuvre pour la défense des droits des immigrés maghrébins et la promotion d''une citoyenneté active. Retour sur 40 ans d''engagement.', 
 '/images/atmf-citoyennete.jpg', 
 'Institutionnel', 
 NULL, 
 'published', 
 '2024-12-15 10:00:00+00', 
 '2024-12-15 10:00:00+00'),

-- Article 2: Bilan des actions 2024
('Bilan 2024 : Une Année Riche en Actions Solidaires', 
 'bilan-actions-2024', 
 'L''année 2024 aura été marquée par une intensification de nos actions au service de la communauté argenteuillaise. Retour sur une année riche en réalisations et en rencontres humaines.

**Accompagnement Administratif : Un Service Essentiel**

Notre permanence d''aide aux démarches administratives a connu une fréquentation record avec 800 dossiers traités, soit une augmentation de 20% par rapport à 2023. Renouvellements de titres de séjour, demandes de naturalisation, regroupements familiaux : nos bénévoles formés ont accompagné chaque demandeur avec patience et professionnalisme.

"Chaque dossier représente une famille, un projet de vie", souligne Fatima Benali, responsable du service. "Nous mesurons l''impact de notre action au quotidien."

**Formation et Intégration**

Nos cours de français langue étrangère ont accueilli 120 apprenants répartis sur 4 niveaux. Les résultats sont encourageants : 85% ont progressé d''au moins un niveau, et 40 ont obtenu leur diplôme DELF. Ces succès ouvrent des portes vers l''emploi et l''autonomie.

**Actions de Solidarité**

L''ATMF Argenteuil s''est mobilisée lors de plusieurs crises humanitaires :
- Collecte de 15 000 euros pour les victimes du séisme au Maroc
- Distribution de 200 colis alimentaires pendant le Ramadan
- Aide d''urgence à 50 familles en situation précaire

**Rayonnement Culturel**

Nos événements culturels ont rassemblé plus de 1 500 participants : iftar communautaire, célébration de l''indépendance algérienne, soirées poésie... Ces moments de partage renforcent les liens intergénérationnels et favorisent le dialogue interculturel.

**Perspectives 2025**

Fort de ces résultats, l''ATMF Argenteuil aborde 2025 avec ambition : ouverture d''une permanence juridique mensuelle, lancement d''un programme de médiation familiale, et organisation du premier festival culturel maghrébin d''Argenteuil.', 
 'Retour sur une année 2024 riche en actions : 800 dossiers traités, 120 apprenants en français, 15 000€ collectés pour la solidarité.', 
 '/images/bilan-2024.jpg', 
 'Institutionnel', 
 NULL, 
 'published', 
 '2024-12-10 14:00:00+00', 
 '2024-12-10 14:00:00+00'),

-- Article 3: Partenariat avec les institutions
('Renforcement des Partenariats Institutionnels', 
 'partenariats-institutionnels-2024', 
 'L''ATMF Argenteuil développe ses partenariats avec les institutions locales et nationales pour mieux servir sa mission d''accompagnement et d''intégration.

**Convention avec la Préfecture du Val-d''Oise**

Une nouvelle convention a été signée avec la Préfecture pour faciliter l''accès aux services publics. Cette collaboration permet :
- Des formations régulières de nos bénévoles sur l''évolution de la réglementation
- Un accès privilégié aux informations sur les procédures administratives
- Une médiation en cas de difficultés dans les démarches

**Partenariat avec la Ville d''Argenteuil**

La municipalité renouvelle son soutien à nos actions par une subvention de 25 000 euros pour 2024-2026. En contrepartie, l''ATMF s''engage dans :
- La participation aux conseils de quartier
- L''organisation d''événements interculturels
- La médiation sociale dans les quartiers sensibles

**Collaboration avec l''Éducation Nationale**

Un partenariat avec les établissements scolaires d''Argenteuil permet :
- L''accompagnement des familles dans le suivi scolaire
- Des ateliers de sensibilisation à la diversité culturelle
- Un soutien aux élèves en difficulté

**Réseau Associatif**

L''ATMF Argenteuil coordonne ses actions avec :
- Les Restos du Cœur pour la distribution alimentaire
- La Croix-Rouge pour l''aide d''urgence
- Les centres sociaux pour les activités de quartier

Ces partenariats renforcent l''efficacité de nos actions et évitent les doublons, au bénéfice des usagers.', 
 'L''ATMF Argenteuil renforce ses partenariats avec les institutions pour mieux accompagner les familles dans leurs démarches.', 
 '/images/partenariats-institutions.jpg', 
 'Partenariat', 
 NULL, 
 'published', 
 '2024-11-25 16:00:00+00', 
 '2024-11-25 16:00:00+00');

-- 3. Mettre à jour les UUID des auteurs
UPDATE events SET created_by = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE created_by IS NULL;
UPDATE articles SET author_id = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE author_id IS NULL;

-- 4. Vérifier les données insérées
SELECT 'ÉVÉNEMENTS INSÉRÉS:' as info;
SELECT id, title, category, date FROM events ORDER BY date;

SELECT 'ARTICLES INSÉRÉS:' as info;
SELECT id, title, category, created_at FROM articles ORDER BY created_at DESC; 