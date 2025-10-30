/**
 * WDA-315: Traducciones para página "Trabaja con nosotros"
 * Multiidioma: ES, CA, EN, FR
 */

export type CareersLocale = 'es' | 'ca' | 'en' | 'fr';

interface Requirement {
  icon: string;
  title: string;
  description: string;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface FormLabels {
  name: string;
  namePlaceholder: string;
  surname: string;
  surnamePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  age: string;
  agePlaceholder: string;
  cv: string;
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
  ageRange: string;
  cvRequired: string;
  cvInvalid: string;
  cvSize: string;
  motivationMin: string;
  motivationMax: string;
  gdprRequired: string;
}

export interface CareersContent {
  seoTitle: string;
  seoDescription: string;
  hero: {
    title: string;
    heading: string;
    subtitle: string;
    ctaText: string;
  };
  profile: {
    title: string;
    subtitle: string;
  };
  requirements: Requirement[];
  benefits: {
    title: string;
    subtitle: string;
    items: Benefit[];
  };
  responsibilities: {
    title: string;
    heading: string;
    intro: string;
    items: string[];
  };
  form: {
    title: string;
    subtitle: string;
    labels: FormLabels;
    validation: ValidationMessages;
  };
}

export const careersContent: Record<CareersLocale, CareersContent> = {
  es: {
    seoTitle: 'Trabaja con nosotros - Sauna Master | SAUWA',
    seoDescription: 'Únete a SAUWA como Sauna Master certificado en Andorra. Formación completa, carrera profesional única en bienestar nórdico.',
    hero: {
      title: 'Trabaja con nosotros',
      heading: 'OPORTUNIDAD ÚNICA: SAUNA MASTER ACREDITADO SAUWA® EN ANDORRA',
      subtitle: 'Únete a nuestro equipo y conviértete en experto en bienestar nórdico',
      ctaText: 'Aplicar ahora',
    },
    profile: {
      title: 'Perfil del candidato',
      subtitle: '¿A quién buscamos?',
    },
    requirements: [
      {
        icon: '🎓',
        title: 'Certificación Aufguss Master',
        description: 'Formación oficial en ceremonias Aufguss y técnicas de waving profesional (OBLIGATORIO)',
      },
      {
        icon: '🏥',
        title: 'Primeros Auxilios y RCP',
        description: 'Certificación vigente en primeros auxilios y reanimación cardiopulmonar',
      },
      {
        icon: '🌿',
        title: 'Aromaterapia',
        description: 'Formación en aromaterapia y conocimientos de aceites esenciales terapéuticos',
      },
      {
        icon: '💪',
        title: 'Excelente condición física',
        description: 'Resistencia al calor extremo y capacidad para ceremonias de alta intensidad',
      },
      {
        icon: '🎭',
        title: 'Habilidades de showmanship',
        description: 'Oratoria, animación y capacidad para conectar con grupos multiculturales',
      },
      {
        icon: '🌍',
        title: 'Idiomas',
        description: 'Español obligatorio. Se valora inglés, alemán, catalán o francés',
      },
    ],
    benefits: {
      title: 'Beneficios',
      subtitle: '¿Qué te ofrecemos?',
      items: [
        {
          icon: '💰',
          title: 'Salario competitivo',
          description: 'Remuneración acorde a certificaciones y experiencia, con bonos por rendimiento',
        },
        {
          icon: '📚',
          title: 'Formación continua',
          description: 'Acceso a certificaciones internacionales y actualización de técnicas Aufguss',
        },
        {
          icon: '🏔️',
          title: 'Entorno único',
          description: 'Trabaja en ubicaciones premium en Andorra con vistas espectaculares',
        },
        {
          icon: '⏰',
          title: 'Horarios flexibles',
          description: 'Turnos rotativos con descansos adecuados entre sesiones de alta intensidad',
        },
        {
          icon: '🎯',
          title: 'Carrera profesional',
          description: 'Oportunidades de crecimiento como Senior Master o formador de nuevos talentos',
        },
        {
          icon: '🤝',
          title: 'Equipo internacional',
          description: 'Forma parte de un equipo multicultural apasionado por el bienestar',
        },
      ],
    },
    responsibilities: {
      title: 'Responsabilidades',
      heading: '¿Qué es ser Sauna Master?',
      intro: 'Como Sauna Master en SAUWA, serás el embajador de la cultura finlandesa del bienestar. Tus responsabilidades incluyen:',
      items: [
        'Dirigir ceremonias Aufguss de alto nivel con técnicas de waving profesional',
        'Crear experiencias multisensoriales únicas combinando calor, aroma, sonido y storytelling',
        'Garantizar la seguridad y comodidad de todos los participantes en cada sesión',
        'Adaptar la intensidad de las sesiones según el perfil y condición de los asistentes',
        'Mantener impecables estándares de higiene y preparación del espacio',
        'Interactuar con clientes internacionales en múltiples idiomas',
        'Participar en la formación continua y mejora de técnicas',
        'Representar los valores de excelencia y autenticidad de SAUWA',
      ],
    },
    form: {
      title: 'Solicitud de empleo',
      subtitle: '¿Listo para transformar el bienestar?',
      labels: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        surname: 'Apellidos',
        surnamePlaceholder: 'Tus apellidos',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        phone: 'Teléfono',
        phonePlaceholder: '+376 123 456',
        age: 'Edad',
        agePlaceholder: '25-45',
        cv: 'Currículum Vitae (PDF, máx. 5MB)',
        motivation: 'Cuéntanos por qué quieres ser Sauna Master en SAUWA',
        motivationPlaceholder: 'Describe tu pasión por el bienestar nórdico, experiencia previa y qué te hace único...',
        characterCount: 'caracteres',
        gdpr: 'He leído y acepto la',
        gdprLink: 'Política de Privacidad',
        submit: 'ENVIAR SOLICITUD',
        submitting: 'ENVIANDO...',
        successTitle: '¡Solicitud enviada!',
        successMessage: 'Hemos recibido tu solicitud. Nuestro equipo de RRHH la revisará y te contactaremos pronto.',
        errorTitle: 'Error al enviar',
        errorMessage: 'Ha ocurrido un error. Por favor, inténtalo de nuevo o contáctanos directamente.',
      },
      validation: {
        required: 'Este campo es obligatorio',
        emailInvalid: 'Email no válido',
        phoneInvalid: 'Teléfono no válido',
        ageRange: 'La edad debe estar entre 18 y 65 años',
        cvRequired: 'Por favor, adjunta tu CV',
        cvInvalid: 'Solo se permiten archivos PDF',
        cvSize: 'El archivo no debe superar 5MB',
        motivationMin: 'Mínimo 100 caracteres',
        motivationMax: 'Máximo 500 caracteres',
        gdprRequired: 'Debes aceptar la política de privacidad',
      },
    },
  },

  ca: {
    seoTitle: 'Treballa amb nosaltres - Sauna Master | SAUWA',
    seoDescription: 'Uneix-te a SAUWA com a Sauna Master certificat a Andorra. Formació completa, carrera professional única en benestar nòrdic.',
    hero: {
      title: 'Treballa amb nosaltres',
      heading: 'OPORTUNITAT ÚNICA: SAUNA MASTER ACREDITAT SAUWA® A ANDORRA',
      subtitle: 'Uneix-te al nostre equip i converteix-te en expert en benestar nòrdic',
      ctaText: 'Aplicar ara',
    },
    profile: {
      title: 'Perfil del candidat',
      subtitle: 'A qui busquem?',
    },
    requirements: [
      {
        icon: '🎓',
        title: 'Certificació Aufguss Master',
        description: 'Formació oficial en cerimònies Aufguss i tècniques de waving professional (OBLIGATORI)',
      },
      {
        icon: '🏥',
        title: 'Primers Auxilis i RCP',
        description: 'Certificació vigent en primers auxilis i reanimació cardiopulmonar',
      },
      {
        icon: '🌿',
        title: 'Aromateràpia',
        description: 'Formació en aromateràpia i coneixements d\'olis essencials terapèutics',
      },
      {
        icon: '💪',
        title: 'Excel·lent condició física',
        description: 'Resistència a la calor extrema i capacitat per cerimònies d\'alta intensitat',
      },
      {
        icon: '🎭',
        title: 'Habilitats de showmanship',
        description: 'Oratòria, animació i capacitat per connectar amb grups multiculturals',
      },
      {
        icon: '🌍',
        title: 'Idiomes',
        description: 'Català o espanyol obligatori. Es valora anglès, alemany o francès',
      },
    ],
    benefits: {
      title: 'Beneficis',
      subtitle: 'Què t\'oferim?',
      items: [
        {
          icon: '💰',
          title: 'Salari competitiu',
          description: 'Remuneració d\'acord amb certificacions i experiència, amb bonificacions per rendiment',
        },
        {
          icon: '📚',
          title: 'Formació contínua',
          description: 'Accés a certificacions internacionals i actualització de tècniques Aufguss',
        },
        {
          icon: '🏔️',
          title: 'Entorn únic',
          description: 'Treballa en ubicacions premium a Andorra amb vistes espectaculars',
        },
        {
          icon: '⏰',
          title: 'Horaris flexibles',
          description: 'Torns rotatius amb descansos adequats entre sessions d\'alta intensitat',
        },
        {
          icon: '🎯',
          title: 'Carrera professional',
          description: 'Oportunitats de creixement com a Senior Master o formador de nous talents',
        },
        {
          icon: '🤝',
          title: 'Equip internacional',
          description: 'Forma part d\'un equip multicultural apassionat pel benestar',
        },
      ],
    },
    responsibilities: {
      title: 'Responsabilitats',
      heading: 'Què és ser Sauna Master?',
      intro: 'Com a Sauna Master a SAUWA, seràs l\'ambaixador de la cultura finlandesa del benestar. Les teves responsabilitats inclouen:',
      items: [
        'Dirigir cerimònies Aufguss d\'alt nivell amb tècniques de waving professional',
        'Crear experiències multisensorials úniques combinant calor, aroma, so i storytelling',
        'Garantir la seguretat i comoditat de tots els participants en cada sessió',
        'Adaptar la intensitat de les sessions segons el perfil i condició dels assistents',
        'Mantenir impecables estàndards d\'higiene i preparació de l\'espai',
        'Interactuar amb clients internacionals en múltiples idiomes',
        'Participar en la formació contínua i millora de tècniques',
        'Representar els valors d\'excel·lència i autenticitat de SAUWA',
      ],
    },
    form: {
      title: 'Sol·licitud de feina',
      subtitle: 'Preparat per transformar el benestar?',
      labels: {
        name: 'Nom',
        namePlaceholder: 'El teu nom',
        surname: 'Cognoms',
        surnamePlaceholder: 'Els teus cognoms',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        phone: 'Telèfon',
        phonePlaceholder: '+376 123 456',
        age: 'Edat',
        agePlaceholder: '25-45',
        cv: 'Currículum Vitae (PDF, màx. 5MB)',
        motivation: 'Explica\'ns per què vols ser Sauna Master a SAUWA',
        motivationPlaceholder: 'Descriu la teva passió pel benestar nòrdic, experiència prèvia i què et fa únic...',
        characterCount: 'caràcters',
        gdpr: 'He llegit i accepto la',
        gdprLink: 'Política de Privacitat',
        submit: 'ENVIAR SOL·LICITUD',
        submitting: 'ENVIANT...',
        successTitle: 'Sol·licitud enviada!',
        successMessage: 'Hem rebut la teva sol·licitud. El nostre equip de RRHH la revisarà i et contactarem aviat.',
        errorTitle: 'Error en enviar',
        errorMessage: 'Ha ocorregut un error. Si us plau, torna-ho a intentar o contacta\'ns directament.',
      },
      validation: {
        required: 'Aquest camp és obligatori',
        emailInvalid: 'Email no vàlid',
        phoneInvalid: 'Telèfon no vàlid',
        ageRange: 'L\'edat ha d\'estar entre 18 i 65 anys',
        cvRequired: 'Si us plau, adjunta el teu CV',
        cvInvalid: 'Només es permeten arxius PDF',
        cvSize: 'L\'arxiu no ha de superar 5MB',
        motivationMin: 'Mínim 100 caràcters',
        motivationMax: 'Màxim 500 caràcters',
        gdprRequired: 'Has d\'acceptar la política de privacitat',
      },
    },
  },

  en: {
    seoTitle: 'Work with us - Sauna Master | SAUWA',
    seoDescription: 'Join SAUWA as a certified Sauna Master in Andorra. Complete training, unique professional career in Nordic wellness.',
    hero: {
      title: 'Work with us',
      heading: 'UNIQUE OPPORTUNITY: CERTIFIED SAUWA® SAUNA MASTER IN ANDORRA',
      subtitle: 'Join our team and become an expert in Nordic wellness',
      ctaText: 'Apply now',
    },
    profile: {
      title: 'Candidate profile',
      subtitle: 'Who are we looking for?',
    },
    requirements: [
      {
        icon: '🎓',
        title: 'Aufguss Master Certification',
        description: 'Official training in Aufguss ceremonies and professional waving techniques (MANDATORY)',
      },
      {
        icon: '🏥',
        title: 'First Aid and CPR',
        description: 'Current certification in first aid and cardiopulmonary resuscitation',
      },
      {
        icon: '🌿',
        title: 'Aromatherapy',
        description: 'Training in aromatherapy and knowledge of therapeutic essential oils',
      },
      {
        icon: '💪',
        title: 'Excellent physical condition',
        description: 'Extreme heat resistance and capacity for high-intensity ceremonies',
      },
      {
        icon: '🎭',
        title: 'Showmanship skills',
        description: 'Public speaking, entertainment and ability to connect with multicultural groups',
      },
      {
        icon: '🌍',
        title: 'Languages',
        description: 'English mandatory. Spanish, German, Catalan or French valued',
      },
    ],
    benefits: {
      title: 'Benefits',
      subtitle: 'What we offer you?',
      items: [
        {
          icon: '💰',
          title: 'Competitive salary',
          description: 'Compensation according to certifications and experience, with performance bonuses',
        },
        {
          icon: '📚',
          title: 'Continuous training',
          description: 'Access to international certifications and updated Aufguss techniques',
        },
        {
          icon: '🏔️',
          title: 'Unique environment',
          description: 'Work at premium locations in Andorra with spectacular views',
        },
        {
          icon: '⏰',
          title: 'Flexible hours',
          description: 'Rotating shifts with adequate rest between high-intensity sessions',
        },
        {
          icon: '🎯',
          title: 'Professional career',
          description: 'Growth opportunities as Senior Master or trainer for new talents',
        },
        {
          icon: '🤝',
          title: 'International team',
          description: 'Be part of a multicultural team passionate about wellness',
        },
      ],
    },
    responsibilities: {
      title: 'Responsibilities',
      heading: 'What is being a Sauna Master?',
      intro: 'As a Sauna Master at SAUWA, you will be the ambassador of Finnish wellness culture. Your responsibilities include:',
      items: [
        'Lead high-level Aufguss ceremonies with professional waving techniques',
        'Create unique multisensory experiences combining heat, aroma, sound and storytelling',
        'Ensure the safety and comfort of all participants in each session',
        'Adapt session intensity according to attendees\' profile and condition',
        'Maintain impeccable hygiene standards and space preparation',
        'Interact with international clients in multiple languages',
        'Participate in continuous training and technique improvement',
        'Represent SAUWA\'s values of excellence and authenticity',
      ],
    },
    form: {
      title: 'Job application',
      subtitle: 'Ready to transform wellness?',
      labels: {
        name: 'First name',
        namePlaceholder: 'Your first name',
        surname: 'Last name',
        surnamePlaceholder: 'Your last name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        phone: 'Phone',
        phonePlaceholder: '+376 123 456',
        age: 'Age',
        agePlaceholder: '25-45',
        cv: 'Curriculum Vitae (PDF, max. 5MB)',
        motivation: 'Tell us why you want to be a Sauna Master at SAUWA',
        motivationPlaceholder: 'Describe your passion for Nordic wellness, previous experience and what makes you unique...',
        characterCount: 'characters',
        gdpr: 'I have read and accept the',
        gdprLink: 'Privacy Policy',
        submit: 'SUBMIT APPLICATION',
        submitting: 'SUBMITTING...',
        successTitle: 'Application sent!',
        successMessage: 'We have received your application. Our HR team will review it and contact you soon.',
        errorTitle: 'Sending error',
        errorMessage: 'An error occurred. Please try again or contact us directly.',
      },
      validation: {
        required: 'This field is required',
        emailInvalid: 'Invalid email',
        phoneInvalid: 'Invalid phone number',
        ageRange: 'Age must be between 18 and 65',
        cvRequired: 'Please attach your CV',
        cvInvalid: 'Only PDF files are allowed',
        cvSize: 'File must not exceed 5MB',
        motivationMin: 'Minimum 100 characters',
        motivationMax: 'Maximum 500 characters',
        gdprRequired: 'You must accept the privacy policy',
      },
    },
  },

  fr: {
    seoTitle: 'Travailler avec nous - Sauna Master | SAUWA',
    seoDescription: 'Rejoignez SAUWA en tant que Sauna Master certifié en Andorre. Formation complète, carrière professionnelle unique en bien-être nordique.',
    hero: {
      title: 'Travailler avec nous',
      heading: 'OPPORTUNITÉ UNIQUE : SAUNA MASTER ACCRÉDITÉ SAUWA® EN ANDORRE',
      subtitle: 'Rejoignez notre équipe et devenez expert en bien-être nordique',
      ctaText: 'Postuler maintenant',
    },
    profile: {
      title: 'Profil du candidat',
      subtitle: 'Qui recherchons-nous ?',
    },
    requirements: [
      {
        icon: '🎓',
        title: 'Certification Aufguss Master',
        description: 'Formation officielle aux cérémonies Aufguss et techniques de waving professionnel (OBLIGATOIRE)',
      },
      {
        icon: '🏥',
        title: 'Premiers Secours et RCP',
        description: 'Certification en cours de validité en premiers secours et réanimation cardiopulmonaire',
      },
      {
        icon: '🌿',
        title: 'Aromathérapie',
        description: 'Formation en aromathérapie et connaissances des huiles essentielles thérapeutiques',
      },
      {
        icon: '💪',
        title: 'Excellente condition physique',
        description: 'Résistance à la chaleur extrême et capacité pour cérémonies à haute intensité',
      },
      {
        icon: '🎭',
        title: 'Compétences de showmanship',
        description: 'Oratoire, animation et capacité à connecter avec des groupes multiculturels',
      },
      {
        icon: '🌍',
        title: 'Langues',
        description: 'Français obligatoire. Anglais, allemand, espagnol ou catalan valorisés',
      },
    ],
    benefits: {
      title: 'Avantages',
      subtitle: 'Que vous offrons-nous ?',
      items: [
        {
          icon: '💰',
          title: 'Salaire compétitif',
          description: 'Rémunération selon certifications et expérience, avec bonus de performance',
        },
        {
          icon: '📚',
          title: 'Formation continue',
          description: 'Accès aux certifications internationales et mise à jour des techniques Aufguss',
        },
        {
          icon: '🏔️',
          title: 'Environnement unique',
          description: 'Travaillez dans des lieux premium en Andorre avec des vues spectaculaires',
        },
        {
          icon: '⏰',
          title: 'Horaires flexibles',
          description: 'Rotations avec repos adéquats entre sessions à haute intensité',
        },
        {
          icon: '🎯',
          title: 'Carrière professionnelle',
          description: 'Opportunités d\'évolution comme Senior Master ou formateur de nouveaux talents',
        },
        {
          icon: '🤝',
          title: 'Équipe internationale',
          description: 'Faites partie d\'une équipe multiculturelle passionnée par le bien-être',
        },
      ],
    },
    responsibilities: {
      title: 'Responsabilités',
      heading: 'Qu\'est-ce qu\'être Sauna Master ?',
      intro: 'En tant que Sauna Master chez SAUWA, vous serez l\'ambassadeur de la culture finlandaise du bien-être. Vos responsabilités incluent :',
      items: [
        'Diriger des cérémonies Aufguss de haut niveau avec techniques de waving professionnel',
        'Créer des expériences multisensorielles uniques combinant chaleur, arôme, son et storytelling',
        'Garantir la sécurité et le confort de tous les participants à chaque session',
        'Adapter l\'intensité des sessions selon le profil et la condition des participants',
        'Maintenir des standards d\'hygiène impeccables et préparation de l\'espace',
        'Interagir avec clients internationaux en plusieurs langues',
        'Participer à la formation continue et amélioration des techniques',
        'Représenter les valeurs d\'excellence et d\'authenticité de SAUWA',
      ],
    },
    form: {
      title: 'Candidature',
      subtitle: 'Prêt à transformer le bien-être ?',
      labels: {
        name: 'Prénom',
        namePlaceholder: 'Votre prénom',
        surname: 'Nom',
        surnamePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'vous@email.com',
        phone: 'Téléphone',
        phonePlaceholder: '+376 123 456',
        age: 'Âge',
        agePlaceholder: '25-45',
        cv: 'Curriculum Vitae (PDF, max. 5MB)',
        motivation: 'Dites-nous pourquoi vous voulez être Sauna Master chez SAUWA',
        motivationPlaceholder: 'Décrivez votre passion pour le bien-être nordique, expérience antérieure et ce qui vous rend unique...',
        characterCount: 'caractères',
        gdpr: 'J\'ai lu et j\'accepte la',
        gdprLink: 'Politique de Confidentialité',
        submit: 'ENVOYER CANDIDATURE',
        submitting: 'ENVOI EN COURS...',
        successTitle: 'Candidature envoyée !',
        successMessage: 'Nous avons reçu votre candidature. Notre équipe RH la examinera et vous contactera bientôt.',
        errorTitle: 'Erreur d\'envoi',
        errorMessage: 'Une erreur s\'est produite. Veuillez réessayer ou nous contacter directement.',
      },
      validation: {
        required: 'Ce champ est obligatoire',
        emailInvalid: 'Email invalide',
        phoneInvalid: 'Téléphone invalide',
        ageRange: 'L\'âge doit être entre 18 et 65 ans',
        cvRequired: 'Veuillez joindre votre CV',
        cvInvalid: 'Seuls les fichiers PDF sont autorisés',
        cvSize: 'Le fichier ne doit pas dépasser 5MB',
        motivationMin: 'Minimum 100 caractères',
        motivationMax: 'Maximum 500 caractères',
        gdprRequired: 'Vous devez accepter la politique de confidentialité',
      },
    },
  },
};

export function getCareersContent(locale: CareersLocale): CareersContent {
  return careersContent[locale];
}
