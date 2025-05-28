import React from 'react';

export default function TermsPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Présentation de l'association</h2>
        <p>
          L'ATMF Argenteuil est une association loi 1901 à but non lucratif, dont l'objectif est de soutenir, accompagner et défendre les droits des habitants d'Argenteuil, notamment les personnes issues de l'immigration maghrébine.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Objet du site</h2>
        <p>
          Ce site a pour vocation d'informer le public sur les activités, événements, services et actualités de l'association. Il permet également de faciliter la prise de contact, l'adhésion et le soutien à nos actions.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus présents sur ce site (textes, images, logos, documents, etc.) sont la propriété exclusive de l'association ou de leurs auteurs respectifs. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite, est interdite.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Responsabilité</h2>
        <p>
          L'association s'efforce de fournir des informations exactes et à jour. Toutefois, elle ne saurait être tenue responsable des erreurs, omissions ou d'une absence de disponibilité des informations. L'utilisateur est invité à vérifier toute information auprès de l'association.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Liens externes</h2>
        <p>
          Le site peut contenir des liens vers d'autres sites. L'association n'est pas responsable du contenu ou du fonctionnement de ces sites tiers.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Modification des conditions</h2>
        <p>
          L'association se réserve le droit de modifier à tout moment les présentes conditions d'utilisation. Les utilisateurs sont invités à les consulter régulièrement.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
        <p>
          Pour toute question concernant ces conditions, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:contact@atmf-argenteuil.org" className="text-primary underline">contact@atmf-argenteuil.org</a>.
        </p>
      </section>
    </div>
  );
} 