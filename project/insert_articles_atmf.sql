-- Script pour insérer des articles pertinents pour l'ATMF Argenteuil
-- À exécuter dans Supabase Studio ou via psql

-- Supprimer les anciens articles (optionnel)
-- DELETE FROM articles;

-- Insérer des articles pertinents à l'ATMF Argenteuil
INSERT INTO articles (title, slug, content, excerpt, image_url, category, author_id, status, published_at, created_at) VALUES

-- Article 1: Assemblée générale
('Assemblée Générale Annuelle 2024 de l''ATMF Argenteuil', 
 'assemblee-generale-2024', 
 'L''Assemblée Générale Annuelle de l''ATMF Argenteuil s''est tenue le samedi 15 juin 2024 à la salle des fêtes d''Argenteuil. Plus de 150 membres étaient présents pour faire le bilan de l''année écoulée et définir les orientations pour 2024-2025.

Le président Mohammed Benali a présenté le rapport moral, soulignant les nombreuses actions menées : aide aux démarches administratives (plus de 800 dossiers traités), cours de français (120 bénéficiaires), activités culturelles et événements de solidarité.

Le trésorier a présenté un bilan financier sain avec une augmentation de 15% des adhésions. Les projets pour 2024-2025 incluent l''ouverture d''une permanence juridique et l''organisation d''un festival culturel maghrébin.

L''assemblée a également élu le nouveau conseil d''administration avec la reconduction de Mohammed Benali comme président et l''arrivée de nouveaux membres dynamiques.', 
 'Retour sur l''Assemblée Générale 2024 qui a rassemblé plus de 150 membres pour faire le bilan et définir les orientations futures.', 
 '/images/ag-2024.jpg', 
 'Institutionnel', 
 NULL, 
 'published', 
 '2024-06-16 10:00:00+00', 
 '2024-06-16 10:00:00+00'),

-- Article 2: Aide administrative
('Permanence d''aide aux démarches administratives : un service essentiel', 
 'permanence-aide-administrative', 
 'Chaque mardi et jeudi de 14h à 17h, l''ATMF Argenteuil propose une permanence d''aide aux démarches administratives dans ses locaux du 25 rue Gabriel Péri.

Ce service gratuit, assuré par nos bénévoles formés, accompagne les membres de la communauté dans leurs démarches : renouvellement de titres de séjour, demandes de naturalisation, regroupement familial, inscriptions scolaires, démarches CAF, Pôle Emploi...

En 2024, plus de 800 dossiers ont été traités avec un taux de réussite de 95%. "C''est un service vital pour notre communauté", explique Fatima Benali, responsable du service. "Beaucoup de nos compatriotes se sentent perdus face à l''administration française. Nous les accompagnons avec patience et bienveillance."

Le service s''est enrichi cette année d''une permanence juridique mensuelle avec Maître Karim Ziani, avocat spécialisé en droit des étrangers.

Pour bénéficier de ce service, il suffit de prendre rendez-vous au 01 39 61 12 34 ou de se présenter aux heures de permanence.', 
 'Notre permanence d''aide administrative a traité plus de 800 dossiers en 2024. Un service essentiel pour la communauté.', 
 '/images/permanence-admin.jpg', 
 'Services', 
 NULL, 
 'published', 
 '2024-11-20 14:00:00+00', 
 '2024-11-20 14:00:00+00'),

-- Article 3: Cours de français
('Cours de français : 120 apprenants accompagnés vers l''autonomie', 
 'cours-francais-2024', 
 'L''apprentissage du français est un pilier de l''intégration. C''est pourquoi l''ATMF Argenteuil propose depuis 15 ans des cours de français langue étrangère (FLE) adaptés à tous les niveaux.

Cette année, 120 apprenants ont bénéficié de nos cours dispensés par une équipe de 8 bénévoles qualifiés. Les cours ont lieu du lundi au vendredi, avec des créneaux matin et soir pour s''adapter aux contraintes professionnelles.

"Nous proposons 4 niveaux : alphabétisation, débutant, intermédiaire et perfectionnement", explique Samira Khaldi, coordinatrice pédagogique. "L''objectif est de permettre à chacun de gagner en autonomie dans sa vie quotidienne et professionnelle."

Les résultats sont encourageants : 85% des apprenants ont progressé d''au moins un niveau, et 40 d''entre eux ont obtenu leur diplôme DELF. Plusieurs ont trouvé un emploi ou ont pu reprendre des études.

Au-delà de l''apprentissage linguistique, ces cours créent du lien social et favorisent l''échange interculturel. Des sorties pédagogiques sont organisées : visite de musées, découverte du patrimoine local, participation à des événements culturels.

Les inscriptions pour 2025 ouvriront en janvier. Tarif : 30€ par an pour les adhérents ATMF.', 
 '120 personnes ont suivi nos cours de français en 2024 avec d''excellents résultats d''apprentissage et d''intégration.', 
 '/images/cours-francais.jpg', 
 'Éducation', 
 NULL, 
 'published', 
 '2024-12-01 16:00:00+00', 
 '2024-12-01 16:00:00+00'),

-- Article 4: Solidarité Maroc
('Solidarité avec les victimes du séisme au Maroc', 
 'solidarite-seisme-maroc', 
 'Suite au terrible séisme qui a frappé la région d''Al Haouz au Maroc le 8 septembre 2023, l''ATMF Argenteuil s''est immédiatement mobilisée pour venir en aide aux victimes.

Une collecte de fonds a été organisée dans nos locaux et lors de nos événements. Grâce à la générosité de nos adhérents et sympathisants, nous avons pu réunir 15 000 euros qui ont été intégralement reversés à l''association "Solidarité Maroc" pour l''achat de matériel de première nécessité.

Parallèlement, une collecte de vêtements, couvertures et produits d''hygiène a permis de constituer 50 colis expédiés vers les zones sinistrées en partenariat avec l''association "Cœur de Gazelles".

"Face à de telles tragédies, la solidarité n''a pas de frontières", déclare Mohammed Benali, président de l''ATMF. "Nos pensées vont vers toutes les familles touchées par cette catastrophe."

L''association continue de suivre la situation et reste mobilisée pour apporter son aide aux opérations de reconstruction.', 
 'L''ATMF Argenteuil s''est mobilisée pour les victimes du séisme au Maroc avec une collecte de 15 000 euros et 50 colis.', 
 '/images/solidarite-maroc.jpg', 
 'Solidarité', 
 NULL, 
 'published', 
 '2023-10-15 12:00:00+00', 
 '2023-10-15 12:00:00+00'),

-- Article 5: Ramadan
('Iftar communautaire : 300 personnes réunies pour rompre le jeûne', 
 'iftar-communautaire-2024', 
 'Comme chaque année, l''ATMF Argenteuil a organisé son traditionnel iftar communautaire le samedi 23 mars 2024 à la salle des fêtes d''Argenteuil. Plus de 300 personnes de toutes origines se sont rassemblées pour partager ce moment de convivialité.

Cet événement, devenu incontournable, illustre parfaitement les valeurs de partage et d''ouverture portées par notre association. "Le Ramadan est un mois de spiritualité mais aussi de solidarité", rappelle l''imam Abdellah Mansouri qui a dirigé la prière du Maghreb.

Le repas, préparé par nos bénévoles avec l''aide de restaurateurs locaux, proposait des spécialités du Maghreb : chorba, chebakia, makroudh... Un moment de découverte culinaire apprécié par tous.

La soirée s''est poursuivie par des chants religieux interprétés par le groupe "Nour Al-Islam" et des témoignages sur l''importance du vivre-ensemble.

Cet iftar a également été l''occasion de présenter nos actions solidaires du mois de Ramadan : distribution de colis alimentaires à 80 familles en difficulté et collecte pour l''association "Les Restos du Cœur".

Rendez-vous l''année prochaine pour un nouveau moment de partage !', 
 'Plus de 300 personnes ont participé à notre iftar communautaire, un moment fort de partage et de convivialité.', 
 '/images/iftar-2024.jpg', 
 'Religieux', 
 NULL, 
 'published', 
 '2024-03-24 20:00:00+00', 
 '2024-03-24 20:00:00+00'),

-- Article 6: Partenariat mairie
('Nouveau partenariat avec la Ville d''Argenteuil', 
 'partenariat-mairie-argenteuil', 
 'L''ATMF Argenteuil vient de signer une nouvelle convention de partenariat avec la Ville d''Argenteuil pour la période 2024-2026. Cette convention renforce notre collaboration dans plusieurs domaines.

La municipalité s''engage à soutenir nos actions d''insertion et d''accompagnement social par une subvention annuelle de 25 000 euros. En contrepartie, l''ATMF s''engage à maintenir ses permanences d''aide administrative et à développer de nouveaux services.

"Cette convention reconnaît le travail remarquable de l''ATMF au service de l''intégration et du vivre-ensemble", déclare Madame Sophie Martin, adjointe au maire chargée de la cohésion sociale.

Les nouveaux axes de collaboration incluent :
- Participation aux conseils de quartier
- Organisation d''événements interculturels
- Médiation sociale dans les quartiers
- Accompagnement vers l''emploi en partenariat avec la Mission Locale

Cette reconnaissance institutionnelle nous encourage à poursuivre et amplifier nos actions au service de la communauté argenteuillaise.', 
 'Signature d''une nouvelle convention de partenariat avec la Ville d''Argenteuil pour 2024-2026.', 
 '/images/partenariat-mairie.jpg', 
 'Partenariat', 
 NULL, 
 'published', 
 '2024-01-15 11:00:00+00', 
 '2024-01-15 11:00:00+00'),

-- Article 7: Fête de l'indépendance
('Célébration de l''indépendance algérienne : un moment d''émotion et de fierté', 
 'fete-independance-algerie-2024', 
 'Le 5 juillet 2024, l''ATMF Argenteuil a organisé une cérémonie de commémoration du 62ème anniversaire de l''indépendance de l''Algérie au square Nelson Mandela.

Plus de 200 personnes se sont rassemblées pour ce moment chargé d''émotion. La cérémonie a débuté par la levée des drapeaux algérien et français, suivie d''une minute de silence à la mémoire des martyrs de la guerre de libération.

Plusieurs témoignages de moudjahidines présents ont rappelé l''importance de transmettre cette mémoire aux jeunes générations. "Il est essentiel que nos enfants connaissent leur histoire", souligne Hadj Ahmed Boudiaf, ancien combattant.

La journée s''est poursuivie par un défilé en costumes traditionnels, des danses folkloriques et un concert de musique chaâbi. Un stand de calligraphie arabe et d''artisanat traditionnel a permis aux plus jeunes de découvrir leur patrimoine culturel.

Cette célébration, organisée en partenariat avec l''Amicale des Algériens d''Argenteuil, illustre notre attachement aux valeurs de liberté et notre volonté de faire vivre la culture algérienne en France.

Un grand merci à tous les bénévoles qui ont contribué au succès de cette journée mémorable.', 
 'Plus de 200 personnes ont célébré le 62ème anniversaire de l''indépendance algérienne dans un esprit de mémoire et de fierté.', 
 '/images/independance-algerie.jpg', 
 'Culture', 
 NULL, 
 'published', 
 '2024-07-06 18:00:00+00', 
 '2024-07-06 18:00:00+00');

-- Script pour mettre à jour l'author_id avec un UUID valide après insertion
-- Remplacez 'YOUR_ADMIN_UUID_HERE' par l'UUID réel d'un utilisateur admin de votre base
-- UPDATE articles SET author_id = 'YOUR_ADMIN_UUID_HERE' WHERE author_id IS NULL;

-- Pour voir les IDs générés après insertion :
-- SELECT id, title FROM articles ORDER BY created_at DESC; 