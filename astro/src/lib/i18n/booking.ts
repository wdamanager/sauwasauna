/**
 * WDA-904: Traducciones para páginas de booking/sesiones
 * WDA-899: Frontend Booking - Evento Puertas Abiertas
 * Multiidioma: ES, CA, EN, FR
 */

export type BookingLocale = 'es' | 'ca' | 'en' | 'fr';

export interface BookingPageContent {
  seoTitle: string;
  seoDescription: string;
  hero: {
    title: string;
    heading: string;
    subtitle: string;
    ctaText: string;
  };
  details: {
    duration: string;
    capacity: string;
    price: string;
  };
  about: {
    title: string;
    heading: string;
    description: string[];
    highlights: string[];
  };
  booking: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  faq: {
    title: string;
    heading: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

/**
 * Puertas Abiertas Event Content
 * Session ID: 167 - "Jornadas de puertas abiertas SAUWA"
 */
export const puertasAbiertasContent: Record<BookingLocale, BookingPageContent> = {
  es: {
    seoTitle: 'Puertas Abiertas SAUWA | Evento Gratuito de Sauna en Andorra',
    seoDescription: 'Descubre la experiencia SAUWA en nuestras jornadas de puertas abiertas. Evento gratuito para conocer nuestra sauna finlandesa en Andorra. Reserva tu plaza.',
    hero: {
      title: 'Evento Exclusivo',
      heading: 'Jornadas de Puertas Abiertas',
      subtitle: 'Descubre la auténtica experiencia de sauna finlandesa en SAUWA. Sesión gratuita de introducción para conocer nuestras instalaciones y nuestra filosofía.',
      ctaText: 'Reservar plaza',
    },
    details: {
      duration: '60 minutos',
      capacity: '6 personas',
      price: 'Gratuito',
    },
    about: {
      title: 'Sobre el evento',
      heading: 'Tu primera experiencia SAUWA',
      description: [
        'Las Jornadas de Puertas Abiertas son la oportunidad perfecta para descubrir SAUWA sin compromiso. Durante 60 minutos, te guiaremos a través de una sesión introductoria donde experimentarás la autenticidad de la sauna finlandesa.',
        'Nuestros Sauna Masters certificados te explicarán los beneficios del calor, las técnicas de respiración y el ritual del Aufguss. Es una experiencia diseñada tanto para principiantes como para aquellos que quieren conocer nuestra propuesta antes de reservar una sesión completa.',
      ],
      highlights: [
        'Sesión guiada por Sauna Master certificado',
        'Introducción a la sauna finlandesa auténtica',
        'Demostración del ritual Aufguss con aromas naturales',
        'Conoce nuestras instalaciones premium',
        'Evento totalmente gratuito',
      ],
    },
    booking: {
      sectionTitle: 'Reserva tu plaza',
      sectionSubtitle: 'Las plazas son limitadas. Selecciona fecha y horario.',
    },
    faq: {
      title: 'Preguntas frecuentes',
      heading: 'Todo lo que necesitas saber',
      items: [
        {
          question: '¿Qué debo traer a la sesión?',
          answer: 'Te recomendamos traer bañador, toalla y chanclas. Nosotros proporcionamos toallas adicionales si las necesitas.',
        },
        {
          question: '¿Es apta para principiantes?',
          answer: 'Absolutamente. Esta sesión está diseñada especialmente para quienes nunca han experimentado una sauna finlandesa auténtica.',
        },
        {
          question: '¿Cuántas personas pueden asistir?',
          answer: 'Cada sesión tiene un máximo de 6 personas para garantizar una experiencia personalizada y cómoda.',
        },
        {
          question: '¿Puedo cancelar mi reserva?',
          answer: 'Sí, puedes cancelar tu reserva hasta 24 horas antes de la sesión sin ningún cargo.',
        },
        {
          question: '¿Hay restricciones de salud?',
          answer: 'La sauna no es recomendable para personas con problemas cardíacos graves, embarazadas o con fiebre. Consulta con tu médico si tienes dudas.',
        },
      ],
    },
  },
  ca: {
    seoTitle: 'Portes Obertes SAUWA | Esdeveniment Gratuït de Sauna a Andorra',
    seoDescription: 'Descobreix l\'experiència SAUWA a les nostres jornades de portes obertes. Esdeveniment gratuït per conèixer la nostra sauna finlandesa a Andorra. Reserva la teva plaça.',
    hero: {
      title: 'Esdeveniment Exclusiu',
      heading: 'Jornades de Portes Obertes',
      subtitle: 'Descobreix l\'autèntica experiència de sauna finlandesa a SAUWA. Sessió gratuïta d\'introducció per conèixer les nostres instal·lacions i la nostra filosofia.',
      ctaText: 'Reservar plaça',
    },
    details: {
      duration: '60 minuts',
      capacity: '6 persones',
      price: 'Gratuït',
    },
    about: {
      title: 'Sobre l\'esdeveniment',
      heading: 'La teva primera experiència SAUWA',
      description: [
        'Les Jornades de Portes Obertes són l\'oportunitat perfecta per descobrir SAUWA sense compromís. Durant 60 minuts, et guiarem a través d\'una sessió introductòria on experimentaràs l\'autenticitat de la sauna finlandesa.',
        'Els nostres Sauna Masters certificats t\'explicaran els beneficis de la calor, les tècniques de respiració i el ritual de l\'Aufguss. És una experiència dissenyada tant per a principiants com per a aquells que volen conèixer la nostra proposta abans de reservar una sessió completa.',
      ],
      highlights: [
        'Sessió guiada per Sauna Master certificat',
        'Introducció a la sauna finlandesa autèntica',
        'Demostració del ritual Aufguss amb aromes naturals',
        'Coneix les nostres instal·lacions premium',
        'Esdeveniment totalment gratuït',
      ],
    },
    booking: {
      sectionTitle: 'Reserva la teva plaça',
      sectionSubtitle: 'Les places són limitades. Selecciona data i horari.',
    },
    faq: {
      title: 'Preguntes freqüents',
      heading: 'Tot el que necessites saber',
      items: [
        {
          question: 'Què he de portar a la sessió?',
          answer: 'Et recomanem portar banyador, tovallola i xancletes. Nosaltres proporcionem tovalloles addicionals si les necessites.',
        },
        {
          question: 'És apta per a principiants?',
          answer: 'Absolutament. Aquesta sessió està dissenyada especialment per a qui mai ha experimentat una sauna finlandesa autèntica.',
        },
        {
          question: 'Quantes persones poden assistir?',
          answer: 'Cada sessió té un màxim de 6 persones per garantir una experiència personalitzada i còmoda.',
        },
        {
          question: 'Puc cancel·lar la meva reserva?',
          answer: 'Sí, pots cancel·lar la teva reserva fins a 24 hores abans de la sessió sense cap càrrec.',
        },
        {
          question: 'Hi ha restriccions de salut?',
          answer: 'La sauna no és recomanable per a persones amb problemes cardíacs greus, embarassades o amb febre. Consulta amb el teu metge si tens dubtes.',
        },
      ],
    },
  },
  en: {
    seoTitle: 'SAUWA Open Days | Free Sauna Event in Andorra',
    seoDescription: 'Discover the SAUWA experience at our open days. Free event to explore our Finnish sauna in Andorra. Book your spot now.',
    hero: {
      title: 'Exclusive Event',
      heading: 'Open Days',
      subtitle: 'Discover the authentic Finnish sauna experience at SAUWA. Free introductory session to explore our facilities and philosophy.',
      ctaText: 'Book your spot',
    },
    details: {
      duration: '60 minutes',
      capacity: '6 people',
      price: 'Free',
    },
    about: {
      title: 'About the event',
      heading: 'Your first SAUWA experience',
      description: [
        'The Open Days are the perfect opportunity to discover SAUWA with no commitment. During 60 minutes, we will guide you through an introductory session where you will experience the authenticity of Finnish sauna.',
        'Our certified Sauna Masters will explain the benefits of heat, breathing techniques, and the Aufguss ritual. It\'s an experience designed for beginners and those who want to learn about our offering before booking a full session.',
      ],
      highlights: [
        'Session guided by certified Sauna Master',
        'Introduction to authentic Finnish sauna',
        'Demonstration of Aufguss ritual with natural aromas',
        'Explore our premium facilities',
        'Completely free event',
      ],
    },
    booking: {
      sectionTitle: 'Book your spot',
      sectionSubtitle: 'Limited spots available. Select your date and time.',
    },
    faq: {
      title: 'FAQ',
      heading: 'Everything you need to know',
      items: [
        {
          question: 'What should I bring to the session?',
          answer: 'We recommend bringing a swimsuit, towel, and flip-flops. We provide additional towels if needed.',
        },
        {
          question: 'Is it suitable for beginners?',
          answer: 'Absolutely. This session is specially designed for those who have never experienced an authentic Finnish sauna.',
        },
        {
          question: 'How many people can attend?',
          answer: 'Each session has a maximum of 6 people to ensure a personalized and comfortable experience.',
        },
        {
          question: 'Can I cancel my reservation?',
          answer: 'Yes, you can cancel your reservation up to 24 hours before the session at no charge.',
        },
        {
          question: 'Are there health restrictions?',
          answer: 'Sauna is not recommended for people with serious heart conditions, pregnant women, or those with fever. Consult your doctor if you have concerns.',
        },
      ],
    },
  },
  fr: {
    seoTitle: 'Portes Ouvertes SAUWA | Événement Gratuit de Sauna en Andorre',
    seoDescription: 'Découvrez l\'expérience SAUWA lors de nos journées portes ouvertes. Événement gratuit pour découvrir notre sauna finlandais en Andorre. Réservez votre place.',
    hero: {
      title: 'Événement Exclusif',
      heading: 'Journées Portes Ouvertes',
      subtitle: 'Découvrez l\'authentique expérience du sauna finlandais chez SAUWA. Session gratuite d\'introduction pour découvrir nos installations et notre philosophie.',
      ctaText: 'Réserver ma place',
    },
    details: {
      duration: '60 minutes',
      capacity: '6 personnes',
      price: 'Gratuit',
    },
    about: {
      title: 'À propos de l\'événement',
      heading: 'Votre première expérience SAUWA',
      description: [
        'Les Journées Portes Ouvertes sont l\'occasion parfaite de découvrir SAUWA sans engagement. Pendant 60 minutes, nous vous guiderons à travers une session d\'introduction où vous expérimenterez l\'authenticité du sauna finlandais.',
        'Nos Sauna Masters certifiés vous expliqueront les bienfaits de la chaleur, les techniques de respiration et le rituel de l\'Aufguss. C\'est une expérience conçue aussi bien pour les débutants que pour ceux qui souhaitent découvrir notre offre avant de réserver une session complète.',
      ],
      highlights: [
        'Session guidée par un Sauna Master certifié',
        'Introduction au sauna finlandais authentique',
        'Démonstration du rituel Aufguss avec des arômes naturels',
        'Découvrez nos installations premium',
        'Événement entièrement gratuit',
      ],
    },
    booking: {
      sectionTitle: 'Réservez votre place',
      sectionSubtitle: 'Places limitées. Sélectionnez votre date et horaire.',
    },
    faq: {
      title: 'FAQ',
      heading: 'Tout ce que vous devez savoir',
      items: [
        {
          question: 'Que dois-je apporter à la session ?',
          answer: 'Nous vous recommandons d\'apporter un maillot de bain, une serviette et des tongs. Nous fournissons des serviettes supplémentaires si nécessaire.',
        },
        {
          question: 'Est-ce adapté aux débutants ?',
          answer: 'Absolument. Cette session est spécialement conçue pour ceux qui n\'ont jamais expérimenté un sauna finlandais authentique.',
        },
        {
          question: 'Combien de personnes peuvent participer ?',
          answer: 'Chaque session accueille un maximum de 6 personnes pour garantir une expérience personnalisée et confortable.',
        },
        {
          question: 'Puis-je annuler ma réservation ?',
          answer: 'Oui, vous pouvez annuler votre réservation jusqu\'à 24 heures avant la session sans frais.',
        },
        {
          question: 'Y a-t-il des restrictions de santé ?',
          answer: 'Le sauna n\'est pas recommandé pour les personnes souffrant de problèmes cardiaques graves, les femmes enceintes ou les personnes fiévreuses. Consultez votre médecin en cas de doute.',
        },
      ],
    },
  },
};

/**
 * Get booking page content by locale
 */
export function getBookingContent(
  locale: BookingLocale,
  event: 'puertasAbiertas' = 'puertasAbiertas'
): BookingPageContent {
  const contentMap = {
    puertasAbiertas: puertasAbiertasContent,
  };

  return contentMap[event][locale];
}

/**
 * Route slugs for booking pages by locale
 */
export const bookingRoutes: Record<BookingLocale, Record<string, string>> = {
  es: {
    puertasAbiertas: 'puertas-abiertas',
  },
  ca: {
    puertasAbiertas: 'portes-obertes',
  },
  en: {
    puertasAbiertas: 'open-days',
  },
  fr: {
    puertasAbiertas: 'portes-ouvertes',
  },
};

/**
 * Get route for booking page
 */
export function getBookingRoute(
  locale: BookingLocale,
  event: 'puertasAbiertas' = 'puertasAbiertas'
): string {
  return `/${locale}/${bookingRoutes[locale][event]}/`;
}
