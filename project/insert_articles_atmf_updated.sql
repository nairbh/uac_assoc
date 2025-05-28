-- Articles mis à jour et plus pertinents pour l'ATMF Argenteuil
-- À exécuter après avoir supprimé les anciens articles

-- Supprimer les anciens articles
DELETE FROM articles;

-- Insérer des articles pertinents et détaillés sur l'ATMF Argenteuil
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
 '2024-11-25 16:00:00+00'),

-- Article 4: Lutte contre les discriminations
('Lutte Contre les Discriminations : Un Combat Quotidien', 
 'lutte-discriminations-2024', 
 'La lutte contre les discriminations reste au cœur de l''action de l''ATMF Argenteuil. En 2024, l''association a traité 45 signalements et accompagné les victimes dans leurs démarches.

**Types de Discriminations Signalées**

Les discriminations touchent principalement :
- L''emploi (60% des cas) : refus d''embauche, différences de traitement
- Le logement (25% des cas) : refus de location, conditions dégradées
- L''accès aux services (15% des cas) : administrations, commerces

**Accompagnement des Victimes**

Notre équipe formée propose :
- Une écoute et un soutien psychologique
- Un accompagnement juridique avec notre avocat partenaire
- Une médiation avec les parties concernées
- Un suivi jusqu''à la résolution du conflit

**Actions de Prévention**

L''ATMF organise des sessions de sensibilisation dans :
- Les entreprises locales
- Les établissements scolaires
- Les services publics
- Les associations de quartier

**Résultats Encourageants**

En 2024, 70% des dossiers traités ont trouvé une issue favorable :
- 15 embauches obtenues après médiation
- 8 logements attribués
- 12 sanctions disciplinaires contre des agents discriminants

**Partenariat avec le Défenseur des Droits**

L''ATMF Argenteuil est point relais du Défenseur des Droits, permettant un accès facilité aux recours pour les victimes de discriminations.

"Chaque discrimination signalée et traitée contribue à faire reculer les préjugés", affirme Karim Ziani, notre référent juridique.', 
 'En 2024, l''ATMF a traité 45 signalements de discriminations avec 70% d''issues favorables. Un combat quotidien pour l''égalité.', 
 '/images/lutte-discriminations.jpg', 
 'Droits', 
 NULL, 
 'published', 
 '2024-11-15 12:00:00+00', 
 '2024-11-15 12:00:00+00'),

-- Article 5: Transmission intergénérationnelle
('Transmission et Mémoire : Construire des Ponts Entre les Générations', 
 'transmission-intergenerationnelle', 
 'L''ATMF Argenteuil place la transmission de la mémoire et des valeurs au cœur de ses préoccupations. Comment transmettre l''histoire de l''immigration aux jeunes générations ?

**Projet "Mémoires Vivantes"**

Lancé en 2024, ce projet recueille les témoignages des primo-arrivants des années 1960-1980. Douze anciens ont accepté de partager leur parcours :
- Conditions d''arrivée en France
- Difficultés d''intégration
- Évolution du regard de la société
- Messages aux jeunes générations

Ces témoignages sont compilés dans un livre qui paraîtra en 2025.

**Ateliers Intergénérationnels**

Chaque mois, l''ATMF organise des rencontres entre anciens et jeunes :
- Cours de cuisine traditionnelle
- Initiation à la calligraphie arabe
- Récits de vie et échanges
- Apprentissage de la langue berbère

**Partenariat Scolaire**

En collaboration avec le collège Joliot-Curie, l''ATMF intervient dans les classes pour :
- Présenter l''histoire de l''immigration maghrébine
- Lutter contre les stéréotypes
- Valoriser la diversité culturelle
- Sensibiliser au vivre-ensemble

**Résultats Observés**

Ces actions portent leurs fruits :
- Meilleure connaissance de l''histoire familiale chez les jeunes
- Renforcement de l''estime de soi
- Dialogue apaisé entre générations
- Fierté retrouvée des origines

**Témoignage**

"Grâce à l''ATMF, j''ai découvert le parcours de mon grand-père. Cela m''a aidé à comprendre d''où je viens et à me projeter dans l''avenir", confie Yasmine, 16 ans, participante aux ateliers.

La transmission n''est pas seulement un devoir de mémoire, c''est un investissement pour l''avenir de notre société multiculturelle.', 
 'Le projet "Mémoires Vivantes" recueille les témoignages des anciens pour transmettre l''histoire de l''immigration aux jeunes générations.', 
 '/images/transmission-memoire.jpg', 
 'Culture', 
 NULL, 
 'published', 
 '2024-10-20 15:00:00+00', 
 '2024-10-20 15:00:00+00'),

-- Article 6: Innovation numérique
('Fracture Numérique : L''ATMF Accompagne la Transition Digitale', 
 'accompagnement-numerique-2024', 
 'Face à la dématérialisation croissante des services publics, l''ATMF Argenteuil a développé un programme d''accompagnement numérique pour réduire la fracture digitale.

**Constat Alarmant**

Une étude interne révèle que 65% de nos usagers rencontrent des difficultés avec les outils numériques :
- Méconnaissance des interfaces
- Absence d''équipement adapté
- Barrière linguistique
- Appréhension technologique

**Programme "Numérique Pour Tous"**

Lancé en septembre 2024, ce programme propose :
- Ateliers d''initiation informatique (2h/semaine)
- Accompagnement personnalisé aux démarches en ligne
- Prêt de tablettes pour les familles
- Formation des bénévoles aux outils numériques

**Partenariats Stratégiques**

L''ATMF collabore avec :
- La médiathèque d''Argenteuil pour l''accès aux ordinateurs
- Orange Solidarité pour les équipements
- Emmaüs Connect pour les forfaits téléphoniques
- La Poste pour les démarches administratives

**Résultats Encourageants**

Après 3 mois de fonctionnement :
- 80 personnes formées aux bases de l''informatique
- 200 démarches CAF réalisées en ligne
- 150 prises de rendez-vous préfecture dématérialisées
- 95% de satisfaction des participants

**Témoignage**

"Avant, je devais faire la queue pendant des heures. Maintenant, je peux faire mes démarches depuis chez moi", se réjouit Fatima, 52 ans, participante aux ateliers.

**Perspectives**

L''ATMF prévoit d''étendre le programme en 2025 avec :
- Des ateliers pour les seniors
- Une formation aux réseaux sociaux
- Un accompagnement à la recherche d''emploi en ligne

Le numérique ne doit pas être un facteur d''exclusion mais un outil d''émancipation.', 
 'Le programme "Numérique Pour Tous" a formé 80 personnes en 3 mois pour lutter contre la fracture digitale.', 
 '/images/numerique-pour-tous.jpg', 
 'Services', 
 NULL, 
 'published', 
 '2024-12-05 11:00:00+00', 
 '2024-12-05 11:00:00+00');

-- Script pour mettre à jour l'author_id avec un UUID valide après insertion
-- UPDATE articles SET author_id = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE author_id IS NULL; 