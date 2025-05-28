import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Collecte des données</h2>
        <p>
          L'association ATMF Argenteuil collecte uniquement les données strictement nécessaires à la gestion de ses activités (adhésion, dons, inscription à la newsletter, prise de contact). Les données collectées sont : nom, prénom, adresse e-mail, téléphone, et toute information transmise via les formulaires du site.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Utilisation des données</h2>
        <p>
          Les données sont utilisées exclusivement pour répondre à vos demandes, gérer votre adhésion, vous informer sur nos activités, ou vous adresser notre newsletter si vous y avez consenti. Elles ne sont jamais cédées ou vendues à des tiers.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Conservation des données</h2>
        <p>
          Les données sont conservées pendant la durée strictement nécessaire à la finalité pour laquelle elles ont été collectées, et dans le respect de la législation en vigueur.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Sécurité</h2>
        <p>
          L'association met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre la perte, l'accès non autorisé, la divulgation ou l'altération.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Vos droits</h2>
        <p>
          Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d'un droit d'accès, de rectification, d'opposition, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à <a href="mailto:contact@atmf-argenteuil.org" className="text-primary underline">contact@atmf-argenteuil.org</a>.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
        <p>
          Ce site utilise des cookies strictement nécessaires à son bon fonctionnement et à la mesure d'audience. Vous pouvez configurer votre navigateur pour refuser les cookies.
        </p>
      </section>
    </div>
  );
} 