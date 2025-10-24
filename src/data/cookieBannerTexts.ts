/**
 * Cookie Banner Texts
 * Multilingual content for cookie consent banner
 */

export const cookieBannerTexts = {
  es: {
    title: 'Este sitio utiliza cookies',
    description: 'Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.',
    acceptLabel: 'Aceptar cookies',
    rejectLabel: 'Rechazar',
    policyLink: '/es/politica-privacidad/',
    policyText: 'Ver nuestra política de privacidad'
  },
  ca: {
    title: 'Aquest lloc utilitza cookies',
    description: 'Utilitzem cookies pròpies i de tercers per millorar els nostres serveis i mostrar-li publicitat relacionada amb les seves preferències mitjançant l\'anàlisi dels seus hàbits de navegació.',
    acceptLabel: 'Acceptar cookies',
    rejectLabel: 'Rebutjar',
    policyLink: '/ca/politica-privacitat/',
    policyText: 'Veure la nostra política de privacitat'
  },
  en: {
    title: 'This site uses cookies',
    description: 'We use our own and third-party cookies to improve our services and show you advertising related to your preferences by analyzing your browsing habits.',
    acceptLabel: 'Accept cookies',
    rejectLabel: 'Reject',
    policyLink: '/en/privacy-policy/',
    policyText: 'View our privacy policy'
  },
  fr: {
    title: 'Ce site utilise des cookies',
    description: 'Nous utilisons nos propres cookies et ceux de tiers pour améliorer nos services et vous montrer des publicités liées à vos préférences en analysant vos habitudes de navigation.',
    acceptLabel: 'Accepter les cookies',
    rejectLabel: 'Refuser',
    policyLink: '/fr/politique-confidentialite/',
    policyText: 'Voir notre politique de confidentialité'
  }
} as const;

export type Language = keyof typeof cookieBannerTexts;
