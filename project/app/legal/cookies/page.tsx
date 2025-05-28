import React from 'react';

export default function CookiesPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestion des cookies</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site internet. Il permet de stocker des informations relatives à votre navigation.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Utilisation des cookies sur ce site</h2>
        <p>
          Le site de l'ATMF Argenteuil utilise des cookies strictement nécessaires à son fonctionnement (gestion de session, sécurité) et des cookies de mesure d'audience (statistiques anonymes).
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Gestion de vos préférences</h2>
        <p>
          Vous pouvez à tout moment configurer votre navigateur pour accepter ou refuser les cookies. Le refus des cookies peut limiter l'accès à certaines fonctionnalités du site.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">4. Contact</h2>
        <p>
          Pour toute question concernant la gestion des cookies, contactez-nous à <a href="mailto:contact@atmf-argenteuil.org" className="text-primary underline">contact@atmf-argenteuil.org</a>.
        </p>
      </section>
    </div>
  );
} 