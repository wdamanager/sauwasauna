/**
 * WDA-320: Traducciones para página "Acceso Exclusivo SAUWA"
 * Multiidioma: ES, CA, EN, FR
 */

export type PartnersLocale = 'es' | 'ca' | 'en' | 'fr';

interface Country {
  code: string;
  name: string;
  flag: string;
}

interface SelectionRequirement {
  icon: string;
  title: string;
  description: string;
}

interface FormLabels {
  establishmentName: string;
  establishmentNamePlaceholder: string;
  propertyType: string;
  propertyTypeHotel: string;
  propertyTypeGlamping: string;
  address: string;
  addressPlaceholder: string;
  website: string;
  websitePlaceholder: string;
  websiteNote: string;
  contactName: string;
  contactNamePlaceholder: string;
  position: string;
  positionPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  motivation: string;
  motivationPlaceholder: string;
  characterCount: string;
  gdpr: string;
  gdprLink: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
}

interface ValidationMessages {
  required: string;
  emailInvalid: string;
  phoneInvalid: string;
  urlInvalid: string;
  addressMin: string;
  motivationMin: string;
  motivationMax: string;
  gdprRequired: string;
}

export interface PartnersContent {
  seoTitle: string;
  seoDescription: string;
  hero: {
    title: string;
    heading: string;
    subtitle: string;
    ctaText: string;
  };
  intro: {
    title: string;
    heading: string;
    text: string;
    imageSrc: string;
    imageAlt: string;
  };
  countries: {
    title: string;
    subtitle: string;
    intro: string;
    items: Country[];
  };
  selection: {
    title: string;
    subtitle: string;
    intro: string;
    requirements: SelectionRequirement[];
  };
  form: {
    title: string;
    subtitle: string;
    labels: FormLabels;
    validation: ValidationMessages;
  };
}

export const partnersContent: Record<PartnersLocale, PartnersContent> = {
  es: {
    seoTitle: 'Acceso Exclusivo SAUWA - Partners B2B | SAUWA',
    seoDescription: 'Experiencia premium llave en mano para hoteles y glampings de lujo. Atrae turismo nórdico de alto valor con SAUWA.',
    hero: {
      title: 'Acceso Exclusivo SAUWA',
      heading: 'EL VALOR AÑADIDO QUE TUS INSTALACIONES DE INVIERNO MERECEN',
      subtitle: 'Experiencia premium llave en mano para establecimientos exclusivos',
      ctaText: 'Solicitar Evaluación',
    },
    intro: {
      title: 'El Valor Distintivo de SAUWA',
      heading: 'Más que una sauna, una experiencia de bienestar premium',
      text: 'SAUWA no es solo una sauna móvil, es una experiencia de bienestar premium llave en mano, diseñada para maximizar el atractivo de ubicaciones únicas y sus entornos acuáticos de exterior durante la temporada invernal. Te ofrecemos la oportunidad de incorporar un servicio de alto valor percibido que diferencia tu propiedad y atrae a un segmento de clientes que busca experiencias inolvidables en invierno. Nos ocupamos de toda la operación, desde la logística y la instalación en entornos acuáticos idílicos, hasta la gestión de la experiencia del usuario, garantizando la máxima excelencia y seguridad.',
      imageSrc: '/images/partners/sauwa-premium-installation.jpg',
      imageAlt: 'Instalación premium SAUWA en entorno natural',
    },
    countries: {
      title: 'Turismo de alto valor',
      subtitle: 'Atrayendo al Turista de Bienestar Nórdico y Centroeuropeo',
      intro: 'Los mercados que representan el mayor gasto medio en entornos alpinos (suizo, austriaco, alemán, sueco, noruego y finlandés) tienen el uso de la sauna como una parte fundamental de su rutina de bienestar. Este segmento de cliente no se conforma con una cabina de calor genérica. Exigen la auténtica experiencia finlandesa (reconocida por la UNESCO) asistida por personal especializado y acreditado, lo que garantiza que la sesión no sea simplemente "pasar calor". Al incluir SAUWA, su propiedad dejará de ofrecer un "servicio de spa genérico" para ofrecer una experiencia cultural de bienestar de altísimo nivel, perfectamente alineada con las expectativas del cliente más exigente.',
      items: [
        { code: 'CH', name: 'Suiza', flag: '🇨🇭' },
        { code: 'AT', name: 'Austria', flag: '🇦🇹' },
        { code: 'DE', name: 'Alemania', flag: '🇩🇪' },
        { code: 'SE', name: 'Suecia', flag: '🇸🇪' },
        { code: 'NO', name: 'Noruega', flag: '🇳🇴' },
        { code: 'FI', name: 'Finlandia', flag: '🇫🇮' },
      ],
    },
    selection: {
      title: 'Proceso de selección',
      subtitle: 'Criterios de Excelencia SAUWA',
      intro: 'No todos los establecimientos cumplen nuestros estándares de excelencia. Evaluamos cuidadosamente cada solicitud para garantizar que la alianza beneficie a ambas partes.',
      requirements: [
        {
          icon: '✨',
          title: 'Excelencia en el Entorno y Limpieza',
          description: 'Buscamos propiedades que compartan nuestra obsesión por la excelencia. Instalaciones impecables, entornos naturales privilegiados y estándares de limpieza inmaculados son requisitos indispensables.',
        },
        {
          icon: '🚁',
          title: 'Accesibilidad y Viabilidad Logística',
          description: 'La instalación requiere acceso adecuado para transporte especializado y conexiones de servicios básicos (agua, electricidad). Evaluamos cada ubicación individualmente para garantizar viabilidad operativa.',
        },
        {
          icon: '🤝',
          title: 'Compromiso con el Servicio',
          description: 'Buscamos partners que entiendan que SAUWA es más que una amenidad: es un diferenciador estratégico. El compromiso con la excelencia en el servicio y la promoción conjunta son esenciales para el éxito mutuo.',
        },
      ],
    },
    form: {
      title: 'Solicitud de evaluación',
      subtitle: '¿Tu establecimiento cumple nuestros estándares?',
      labels: {
        establishmentName: 'Nombre del Establecimiento',
        establishmentNamePlaceholder: 'Hotel o Glamping Premium',
        propertyType: 'Tipo de Propiedad',
        propertyTypeHotel: 'Hotel',
        propertyTypeGlamping: 'Glamping Premium',
        address: 'Dirección Completa',
        addressPlaceholder: 'Calle, Número, Código Postal, Ciudad, País',
        website: 'Sitio Web',
        websitePlaceholder: 'https://tuestablecimiento.com',
        websiteNote: 'IMPRESCINDIBLE',
        contactName: 'Nombre y Apellidos del Solicitante',
        contactNamePlaceholder: 'Tu nombre completo',
        position: 'Cargo en la Empresa',
        positionPlaceholder: 'Director, Propietario, Manager...',
        phone: 'Teléfono',
        phonePlaceholder: '+34 123 456 789',
        email: 'Email',
        emailPlaceholder: 'contacto@tuestablecimiento.com',
        motivation: '¿Por qué SAUWA es el partner ideal para tu establecimiento?',
        motivationPlaceholder: 'Describe tu visión, ubicación, perfil de clientes, y por qué SAUWA añadiría valor a tu propuesta...',
        characterCount: 'caracteres',
        gdpr: 'He leído y acepto la',
        gdprLink: 'Política de Privacidad',
        submit: 'ENVIAR SOLICITUD PARA SER EVALUADO',
        submitting: 'ENVIANDO...',
        successTitle: '¡Solicitud recibida!',
        successMessage: 'Gracias por tu interés en SAUWA. Nuestro equipo evaluará tu establecimiento y te contactaremos en un plazo de 5-7 días hábiles.',
        errorTitle: 'Error al enviar',
        errorMessage: 'Ha ocurrido un error. Por favor, inténtalo de nuevo o contáctanos directamente en partners@sauwa.com',
      },
      validation: {
        required: 'Este campo es obligatorio',
        emailInvalid: 'Email no válido',
        phoneInvalid: 'Teléfono no válido',
        urlInvalid: 'URL no válida (debe comenzar con http:// o https://)',
        addressMin: 'La dirección debe tener al menos 10 caracteres',
        motivationMin: 'Mínimo 100 caracteres',
        motivationMax: 'Máximo 500 caracteres',
        gdprRequired: 'Debes aceptar la política de privacidad',
      },
    },
  },

  ca: {
    seoTitle: 'Accés Exclusiu SAUWA - Partners B2B | SAUWA',
    seoDescription: 'Experiència premium claus en mà per hotels i glampings de luxe. Atrau turisme nòrdic d\'alt valor amb SAUWA.',
    hero: {
      title: 'Accés Exclusiu SAUWA',
      heading: 'EL VALOR AFEGIT QUE LES TEVES INSTAL·LACIONS D\'HIVERN MEREIXEN',
      subtitle: 'Experiència premium claus en mà per establiments exclusius',
      ctaText: 'Sol·licitar Avaluació',
    },
    intro: {
      title: 'El Valor Distintiu de SAUWA',
      heading: 'Més que una sauna, una experiència de benestar premium',
      text: 'SAUWA no és només una sauna mòbil, és una experiència de benestar premium claus en mà, dissenyada per maximitzar l\'atractiu d\'ubicacions úniques i els seus entorns aquàtics d\'exterior durant la temporada hivernal. T\'oferim l\'oportunitat d\'incorporar un servei d\'alt valor percebut que diferencia la teva propietat i atrau un segment de clients que cerca experiències inoblidables a l\'hivern. Ens ocupem de tota l\'operació, des de la logística i la instal·lació en entorns aquàtics idíl·lics, fins a la gestió de l\'experiència de l\'usuari, garantint la màxima excel·lència i seguretat.',
      imageSrc: '/images/partners/sauwa-premium-installation.jpg',
      imageAlt: 'Instal·lació premium SAUWA en entorn natural',
    },
    countries: {
      title: 'Turisme d\'alt valor',
      subtitle: 'Atraient el Turista de Benestar Nòrdic i Centreeuropeu',
      intro: 'Els mercats que representen la major despesa mitjana en entorns alpins (suís, austríac, alemany, suec, noruec i finlandès) tenen l\'ús de la sauna com una part fonamental de la seva rutina de benestar. Aquest segment de client no es conforma amb una cabina de calor genèrica. Exigeixen l\'autèntica experiència finlandesa (reconeguda per la UNESCO) assistida per personal especialitzat i acreditat, el que garanteix que la sessió no sigui simplement "passar calor". En incloure SAUWA, la teva propietat deixarà d\'oferir un "servei d\'spa genèric" per oferir una experiència cultural de benestar d\'altíssim nivell, perfectament alineada amb les expectatives del client més exigent.',
      items: [
        { code: 'CH', name: 'Suïssa', flag: '🇨🇭' },
        { code: 'AT', name: 'Àustria', flag: '🇦🇹' },
        { code: 'DE', name: 'Alemanya', flag: '🇩🇪' },
        { code: 'SE', name: 'Suècia', flag: '🇸🇪' },
        { code: 'NO', name: 'Noruega', flag: '🇳🇴' },
        { code: 'FI', name: 'Finlàndia', flag: '🇫🇮' },
      ],
    },
    selection: {
      title: 'Procés de selecció',
      subtitle: 'Criteris d\'Excel·lència SAUWA',
      intro: 'No tots els establiments compleixen els nostres estàndards d\'excel·lència. Avaluem acuradament cada sol·licitud per garantir que l\'aliança beneficiï ambdues parts.',
      requirements: [
        {
          icon: '✨',
          title: 'Excel·lència en l\'Entorn i Neteja',
          description: 'Busquem propietats que comparteixin la nostra obsessió per l\'excel·lència. Instal·lacions impecables, entorns naturals privilegiats i estàndards de neteja immaculats són requisits indispensables.',
        },
        {
          icon: '🚁',
          title: 'Accessibilitat i Viabilitat Logística',
          description: 'La instal·lació requereix accés adequat per transport especialitzat i connexions de serveis bàsics (aigua, electricitat). Avaluem cada ubicació individualment per garantir viabilitat operativa.',
        },
        {
          icon: '🤝',
          title: 'Compromís amb el Servei',
          description: 'Busquem partners que entenguin que SAUWA és més que una amenitat: és un diferenciador estratègic. El compromís amb l\'excel·lència en el servei i la promoció conjunta són essencials per a l\'èxit mutu.',
        },
      ],
    },
    form: {
      title: 'Sol·licitud d\'avaluació',
      subtitle: 'El teu establiment compleix els nostres estàndards?',
      labels: {
        establishmentName: 'Nom de l\'Establiment',
        establishmentNamePlaceholder: 'Hotel o Glamping Premium',
        propertyType: 'Tipus de Propietat',
        propertyTypeHotel: 'Hotel',
        propertyTypeGlamping: 'Glamping Premium',
        address: 'Adreça Completa',
        addressPlaceholder: 'Carrer, Número, Codi Postal, Ciutat, País',
        website: 'Lloc Web',
        websitePlaceholder: 'https://elteuestablimet.com',
        websiteNote: 'IMPRESCINDIBLE',
        contactName: 'Nom i Cognoms del Sol·licitant',
        contactNamePlaceholder: 'El teu nom complet',
        position: 'Càrrec a l\'Empresa',
        positionPlaceholder: 'Director, Propietari, Manager...',
        phone: 'Telèfon',
        phonePlaceholder: '+34 123 456 789',
        email: 'Email',
        emailPlaceholder: 'contacte@elteuestablimet.com',
        motivation: 'Per què SAUWA és el partner ideal per al teu establiment?',
        motivationPlaceholder: 'Descriu la teva visió, ubicació, perfil de clients, i per què SAUWA afegiria valor a la teva proposta...',
        characterCount: 'caràcters',
        gdpr: 'He llegit i accepto la',
        gdprLink: 'Política de Privacitat',
        submit: 'ENVIAR SOL·LICITUD PER SER AVALUAT',
        submitting: 'ENVIANT...',
        successTitle: 'Sol·licitud rebuda!',
        successMessage: 'Gràcies pel teu interès en SAUWA. El nostre equip avaluarà el teu establiment i et contactarem en un termini de 5-7 dies hàbils.',
        errorTitle: 'Error en enviar',
        errorMessage: 'Ha ocorregut un error. Si us plau, torna-ho a intentar o contacta\'ns directament a partners@sauwa.com',
      },
      validation: {
        required: 'Aquest camp és obligatori',
        emailInvalid: 'Email no vàlid',
        phoneInvalid: 'Telèfon no vàlid',
        urlInvalid: 'URL no vàlida (ha de començar amb http:// o https://)',
        addressMin: 'L\'adreça ha de tenir almenys 10 caràcters',
        motivationMin: 'Mínim 100 caràcters',
        motivationMax: 'Màxim 500 caràcters',
        gdprRequired: 'Has d\'acceptar la política de privacitat',
      },
    },
  },

  en: {
    seoTitle: 'Exclusive Access SAUWA - B2B Partners | SAUWA',
    seoDescription: 'Premium turnkey experience for luxury hotels and glampings. Attract high-value Nordic tourism with SAUWA.',
    hero: {
      title: 'Exclusive Access SAUWA',
      heading: 'THE ADDED VALUE YOUR WINTER FACILITIES DESERVE',
      subtitle: 'Premium turnkey experience for exclusive establishments',
      ctaText: 'Request Evaluation',
    },
    intro: {
      title: 'SAUWA\'s Distinctive Value',
      heading: 'More than a sauna, a premium wellness experience',
      text: 'SAUWA is not just a mobile sauna, it is a premium turnkey wellness experience, designed to maximize the appeal of unique locations and their outdoor aquatic environments during the winter season. We offer you the opportunity to incorporate a high perceived value service that differentiates your property and attracts a segment of clients seeking unforgettable winter experiences. We handle the entire operation, from logistics and installation in idyllic aquatic environments, to user experience management, ensuring maximum excellence and safety.',
      imageSrc: '/images/partners/sauwa-premium-installation.jpg',
      imageAlt: 'SAUWA premium installation in natural environment',
    },
    countries: {
      title: 'High-value tourism',
      subtitle: 'Attracting Nordic and Central European Wellness Tourists',
      intro: 'The markets representing the highest average spending in alpine environments (Swiss, Austrian, German, Swedish, Norwegian, and Finnish) have sauna use as a fundamental part of their wellness routine. This client segment does not settle for a generic heat cabin. They demand the authentic Finnish experience (recognized by UNESCO) assisted by specialized and accredited staff, ensuring the session is not simply "enduring heat". By including SAUWA, your property will stop offering a "generic spa service" to offer a very high-level cultural wellness experience, perfectly aligned with the most demanding client\'s expectations.',
      items: [
        { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
        { code: 'AT', name: 'Austria', flag: '🇦🇹' },
        { code: 'DE', name: 'Germany', flag: '🇩🇪' },
        { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
        { code: 'NO', name: 'Norway', flag: '🇳🇴' },
        { code: 'FI', name: 'Finland', flag: '🇫🇮' },
      ],
    },
    selection: {
      title: 'Selection process',
      subtitle: 'SAUWA Excellence Criteria',
      intro: 'Not all establishments meet our excellence standards. We carefully evaluate each application to ensure the alliance benefits both parties.',
      requirements: [
        {
          icon: '✨',
          title: 'Excellence in Environment and Cleanliness',
          description: 'We seek properties that share our obsession with excellence. Impeccable facilities, privileged natural environments and immaculate cleanliness standards are indispensable requirements.',
        },
        {
          icon: '🚁',
          title: 'Accessibility and Logistical Viability',
          description: 'Installation requires adequate access for specialized transport and basic service connections (water, electricity). We evaluate each location individually to guarantee operational viability.',
        },
        {
          icon: '🤝',
          title: 'Commitment to Service',
          description: 'We seek partners who understand that SAUWA is more than an amenity: it is a strategic differentiator. Commitment to service excellence and joint promotion are essential for mutual success.',
        },
      ],
    },
    form: {
      title: 'Evaluation request',
      subtitle: 'Does your establishment meet our standards?',
      labels: {
        establishmentName: 'Establishment Name',
        establishmentNamePlaceholder: 'Hotel or Premium Glamping',
        propertyType: 'Property Type',
        propertyTypeHotel: 'Hotel',
        propertyTypeGlamping: 'Premium Glamping',
        address: 'Complete Address',
        addressPlaceholder: 'Street, Number, Postal Code, City, Country',
        website: 'Website',
        websitePlaceholder: 'https://yourestablishment.com',
        websiteNote: 'REQUIRED',
        contactName: 'Applicant\'s Full Name',
        contactNamePlaceholder: 'Your full name',
        position: 'Position in Company',
        positionPlaceholder: 'Director, Owner, Manager...',
        phone: 'Phone',
        phonePlaceholder: '+34 123 456 789',
        email: 'Email',
        emailPlaceholder: 'contact@yourestablishment.com',
        motivation: 'Why is SAUWA the ideal partner for your establishment?',
        motivationPlaceholder: 'Describe your vision, location, client profile, and why SAUWA would add value to your offering...',
        characterCount: 'characters',
        gdpr: 'I have read and accept the',
        gdprLink: 'Privacy Policy',
        submit: 'SUBMIT APPLICATION FOR EVALUATION',
        submitting: 'SUBMITTING...',
        successTitle: 'Application received!',
        successMessage: 'Thank you for your interest in SAUWA. Our team will evaluate your establishment and contact you within 5-7 business days.',
        errorTitle: 'Sending error',
        errorMessage: 'An error occurred. Please try again or contact us directly at partners@sauwa.com',
      },
      validation: {
        required: 'This field is required',
        emailInvalid: 'Invalid email',
        phoneInvalid: 'Invalid phone number',
        urlInvalid: 'Invalid URL (must start with http:// or https://)',
        addressMin: 'Address must have at least 10 characters',
        motivationMin: 'Minimum 100 characters',
        motivationMax: 'Maximum 500 characters',
        gdprRequired: 'You must accept the privacy policy',
      },
    },
  },

  fr: {
    seoTitle: 'Accès Exclusif SAUWA - Partenaires B2B | SAUWA',
    seoDescription: 'Expérience premium clés en main pour hôtels et glampings de luxe. Attirez le tourisme nordique à haute valeur avec SAUWA.',
    hero: {
      title: 'Accès Exclusif SAUWA',
      heading: 'LA VALEUR AJOUTÉE QUE VOS INSTALLATIONS D\'HIVER MÉRITENT',
      subtitle: 'Expérience premium clés en main pour établissements exclusifs',
      ctaText: 'Demander Évaluation',
    },
    intro: {
      title: 'La Valeur Distinctive de SAUWA',
      heading: 'Plus qu\'un sauna, une expérience de bien-être premium',
      text: 'SAUWA n\'est pas seulement un sauna mobile, c\'est une expérience de bien-être premium clés en main, conçue pour maximiser l\'attrait de lieux uniques et leurs environnements aquatiques extérieurs pendant la saison hivernale. Nous vous offrons l\'opportunité d\'intégrer un service à haute valeur perçue qui différencie votre propriété et attire un segment de clients recherchant des expériences inoubliables en hiver. Nous nous occupons de toute l\'opération, de la logistique et de l\'installation dans des environnements aquatiques idylliques, à la gestion de l\'expérience utilisateur, garantissant excellence et sécurité maximales.',
      imageSrc: '/images/partners/sauwa-premium-installation.jpg',
      imageAlt: 'Installation premium SAUWA en environnement naturel',
    },
    countries: {
      title: 'Tourisme à haute valeur',
      subtitle: 'Attirer le Touriste du Bien-être Nordique et Centre-européen',
      intro: 'Les marchés représentant les dépenses moyennes les plus élevées dans les environnements alpins (suisse, autrichien, allemand, suédois, norvégien et finlandais) ont l\'utilisation du sauna comme partie fondamentale de leur routine de bien-être. Ce segment de clientèle ne se contente pas d\'une cabine de chaleur générique. Ils exigent l\'expérience finlandaise authentique (reconnue par l\'UNESCO) assistée par du personnel spécialisé et accrédité, ce qui garantit que la session n\'est pas simplement "supporter la chaleur". En incluant SAUWA, votre propriété cessera d\'offrir un "service spa générique" pour offrir une expérience culturelle de bien-être de très haut niveau, parfaitement alignée avec les attentes du client le plus exigeant.',
      items: [
        { code: 'CH', name: 'Suisse', flag: '🇨🇭' },
        { code: 'AT', name: 'Autriche', flag: '🇦🇹' },
        { code: 'DE', name: 'Allemagne', flag: '🇩🇪' },
        { code: 'SE', name: 'Suède', flag: '🇸🇪' },
        { code: 'NO', name: 'Norvège', flag: '🇳🇴' },
        { code: 'FI', name: 'Finlande', flag: '🇫🇮' },
      ],
    },
    selection: {
      title: 'Processus de sélection',
      subtitle: 'Critères d\'Excellence SAUWA',
      intro: 'Tous les établissements ne répondent pas à nos normes d\'excellence. Nous évaluons soigneusement chaque demande pour garantir que l\'alliance profite aux deux parties.',
      requirements: [
        {
          icon: '✨',
          title: 'Excellence en Environnement et Propreté',
          description: 'Nous recherchons des propriétés qui partagent notre obsession pour l\'excellence. Installations impeccables, environnements naturels privilégiés et normes de propreté immaculées sont des exigences indispensables.',
        },
        {
          icon: '🚁',
          title: 'Accessibilité et Viabilité Logistique',
          description: 'L\'installation nécessite un accès adéquat pour transport spécialisé et connexions de services de base (eau, électricité). Nous évaluons chaque emplacement individuellement pour garantir la viabilité opérationnelle.',
        },
        {
          icon: '🤝',
          title: 'Engagement envers le Service',
          description: 'Nous recherchons des partenaires qui comprennent que SAUWA est plus qu\'une commodité : c\'est un différenciateur stratégique. L\'engagement envers l\'excellence du service et la promotion conjointe sont essentiels pour le succès mutuel.',
        },
      ],
    },
    form: {
      title: 'Demande d\'évaluation',
      subtitle: 'Votre établissement répond-il à nos normes ?',
      labels: {
        establishmentName: 'Nom de l\'Établissement',
        establishmentNamePlaceholder: 'Hôtel ou Glamping Premium',
        propertyType: 'Type de Propriété',
        propertyTypeHotel: 'Hôtel',
        propertyTypeGlamping: 'Glamping Premium',
        address: 'Adresse Complète',
        addressPlaceholder: 'Rue, Numéro, Code Postal, Ville, Pays',
        website: 'Site Web',
        websitePlaceholder: 'https://votreétablissement.com',
        websiteNote: 'REQUIS',
        contactName: 'Nom et Prénom du Demandeur',
        contactNamePlaceholder: 'Votre nom complet',
        position: 'Poste dans l\'Entreprise',
        positionPlaceholder: 'Directeur, Propriétaire, Manager...',
        phone: 'Téléphone',
        phonePlaceholder: '+34 123 456 789',
        email: 'Email',
        emailPlaceholder: 'contact@votreétablissement.com',
        motivation: 'Pourquoi SAUWA est-il le partenaire idéal pour votre établissement ?',
        motivationPlaceholder: 'Décrivez votre vision, emplacement, profil clients, et pourquoi SAUWA ajouterait de la valeur à votre offre...',
        characterCount: 'caractères',
        gdpr: 'J\'ai lu et j\'accepte la',
        gdprLink: 'Politique de Confidentialité',
        submit: 'ENVOYER DEMANDE POUR ÊTRE ÉVALUÉ',
        submitting: 'ENVOI EN COURS...',
        successTitle: 'Demande reçue !',
        successMessage: 'Merci pour votre intérêt dans SAUWA. Notre équipe évaluera votre établissement et vous contactera dans un délai de 5-7 jours ouvrables.',
        errorTitle: 'Erreur d\'envoi',
        errorMessage: 'Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement à partners@sauwa.com',
      },
      validation: {
        required: 'Ce champ est obligatoire',
        emailInvalid: 'Email invalide',
        phoneInvalid: 'Téléphone invalide',
        urlInvalid: 'URL invalide (doit commencer par http:// ou https://)',
        addressMin: 'L\'adresse doit avoir au moins 10 caractères',
        motivationMin: 'Minimum 100 caractères',
        motivationMax: 'Maximum 500 caractères',
        gdprRequired: 'Vous devez accepter la politique de confidentialité',
      },
    },
  },
};

export function getPartnersContent(locale: PartnersLocale): PartnersContent {
  return partnersContent[locale];
}
