/**
 * WDA-315: Traducciones para página "Trabaja con nosotros"
 * WDA-325: Iconos Line Art SVG (reemplazando emojis)
 * Multiidioma: ES, CA, EN, FR
 */

export type CareersLocale = 'es' | 'ca' | 'en' | 'fr';

/**
 * WDA-325: Iconos Line Art SVG paths
 * Estilo consistente con BenefitsSection de home
 */
export const iconPaths = {
  // Requirements icons
  certification: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />',
  firstAid: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z M9 11h6 M12 8v6" />',
  aromatherapy: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
  fitness: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />',
  presentation: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />',
  languages: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z M9 14a1 1 0 011-1h4a1 1 0 110 2h-4a1 1 0 01-1-1z" />',
  // Benefits icons
  money: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
  education: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />',
  mountain: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />',
  clock: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />',
  target: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
  handshake: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />',
};

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
    seoDescription: 'Únete a SAUWA como Sauna Master certificado/a en Andorra. Formación completa, carrera profesional única en bienestar nórdico.',
    hero: {
      title: 'Trabaja con nosotros',
      heading: 'OPORTUNIDAD ÚNICA: SAUNA MASTER ACREDITADO SAUWA® EN ANDORRA',
      subtitle: 'Únete a nuestro equipo y conviértete en experto en bienestar nórdico',
      ctaText: 'Aplicar ahora',
    },
    profile: {
      title: 'Perfil del candidato/a',
      subtitle: '¿A quién buscamos?',
    },
    requirements: [
      {
        icon: 'certification',
        title: 'Certificación Aufguss Master',
        description: 'Formación oficial en ceremonias Aufguss y técnicas de aromaterapia y waving profesional',
      },
      {
        icon: 'fitness',
        title: 'Excelente condición física',
        description: 'Resistencia al calor extremo y capacidad para ceremonias de alta intensidad',
      },
      {
        icon: 'presentation',
        title: 'Habilidades sociales',
        description: 'Oratoria, animación y capacidad para conectar con grupos multiculturales',
      },
    ],
    benefits: {
      title: 'Beneficios',
      subtitle: '¿Qué te ofrecemos?',
      items: [
        {
          icon: 'money',
          title: 'Salario competitivo',
          description: 'Remuneración alineada con tu experiencia y certificaciones',
        },
        {
          icon: 'education',
          title: 'Formación continua',
          description: 'Acceso a formación internacional y actualización constante en Aufguss, seguridad térmica y protocolos SAUWA.',
        },
        {
          icon: 'mountain',
          title: 'Entorno único',
          description: 'Trabaja en ubicaciones privilegiadas de montaña con partners seleccionados, donde el entorno eleva la experiencia.',
        },
        {
          icon: 'clock',
          title: 'Horarios flexibles',
          description: 'Turnos organizados que permiten conciliar vida personal y trabajo.',
        },
        {
          icon: 'target',
          title: 'Carrera profesional',
          description: 'Crecimiento hacia roles como Senior Sauna Master, formador/a de nuevos talentos o coordinación de operaciones.',
        },
        {
          icon: 'handshake',
          title: 'Equipo multicultural',
          description: 'Únete a un grupo internacional apasionado por el bienestar, la autenticidad nórdica y la sostenibilidad.',
        },
      ],
    },
    responsibilities: {
      title: 'Responsabilidades',
      heading: '¿Qué es ser Sauna Master?',
      intro: 'Como Sauna Master en SAUWA, serás el/la embajador/a de la cultura finlandesa del bienestar. Tus responsabilidades incluyen:',
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
      subtitle: '¿Listo/a para transformar el bienestar?',
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
    seoDescription: 'Uneix-te a SAUWA com a Sauna Master certificat/da a Andorra. Formació completa, carrera professional única en benestar nòrdic.',
    hero: {
      title: 'Treballa amb nosaltres',
      heading: 'OPORTUNITAT ÚNICA: SAUNA MASTER ACREDITAT SAUWA® A ANDORRA',
      subtitle: 'Uneix-te al nostre equip i converteix-te en expert en benestar nòrdic',
      ctaText: 'Aplicar ara',
    },
    profile: {
      title: 'Perfil del candidat/a',
      subtitle: 'A qui busquem?',
    },
    requirements: [
      {
        icon: 'certification',
        title: 'Certificació Aufguss Master',
        description: 'Formació oficial en cerimònies Aufguss i tècniques d\'aromateràpia i waving professional',
      },
      {
        icon: 'fitness',
        title: 'Excel·lent condició física',
        description: 'Resistència a la calor extrema i capacitat per cerimònies d\'alta intensitat',
      },
      {
        icon: 'presentation',
        title: 'Habilitats socials',
        description: 'Oratòria, animació i capacitat per connectar amb grups multiculturals',
      },
    ],
    benefits: {
      title: 'Beneficis',
      subtitle: 'Què t\'oferim?',
      items: [
        {
          icon: 'money',
          title: 'Salari competitiu',
          description: 'Remuneració alineada amb la teva experiència i certificacions',
        },
        {
          icon: 'education',
          title: 'Formació contínua',
          description: 'Accés a formació internacional i actualització constant en Aufguss, seguretat tèrmica i protocols SAUWA.',
        },
        {
          icon: 'mountain',
          title: 'Entorn únic',
          description: 'Treballa en ubicacions privilegiades de muntanya amb partners seleccionats, on l\'entorn eleva l\'experiència.',
        },
        {
          icon: 'clock',
          title: 'Horaris flexibles',
          description: 'Torns organitzats que permeten conciliar vida personal i treball.',
        },
        {
          icon: 'target',
          title: 'Carrera professional',
          description: 'Creixement cap a rols com Senior Sauna Master, formador/a de nous talents o coordinació d\'operacions.',
        },
        {
          icon: 'handshake',
          title: 'Equip multicultural',
          description: 'Uneix-te a un grup internacional apassionat pel benestar, l\'autenticitat nòrdica i la sostenibilitat.',
        },
      ],
    },
    responsibilities: {
      title: 'Responsabilitats',
      heading: 'Què és ser Sauna Master?',
      intro: 'Com a Sauna Master a SAUWA, seràs l\'ambaixador/a de la cultura finlandesa del benestar. Les teves responsabilitats inclouen:',
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
      subtitle: 'Preparat/da per transformar el benestar?',
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
        icon: 'certification',
        title: 'Aufguss Master Certification',
        description: 'Official training in Aufguss ceremonies and aromatherapy and professional waving techniques',
      },
      {
        icon: 'fitness',
        title: 'Excellent physical condition',
        description: 'Extreme heat resistance and capacity for high-intensity ceremonies',
      },
      {
        icon: 'presentation',
        title: 'Social skills',
        description: 'Public speaking, entertainment and ability to connect with multicultural groups',
      },
    ],
    benefits: {
      title: 'Benefits',
      subtitle: 'What we offer you?',
      items: [
        {
          icon: 'money',
          title: 'Competitive salary',
          description: 'Compensation aligned with your experience and certifications',
        },
        {
          icon: 'education',
          title: 'Continuous training',
          description: 'Access to international training and constant updates in Aufguss, thermal safety and SAUWA protocols.',
        },
        {
          icon: 'mountain',
          title: 'Unique environment',
          description: 'Work in privileged mountain locations with selected partners, where the environment elevates the experience.',
        },
        {
          icon: 'clock',
          title: 'Flexible hours',
          description: 'Organized shifts that allow you to balance personal life and work.',
        },
        {
          icon: 'target',
          title: 'Professional career',
          description: 'Growth towards roles such as Senior Sauna Master, trainer for new talents or operations coordination.',
        },
        {
          icon: 'handshake',
          title: 'Multicultural team',
          description: 'Join an international group passionate about wellness, Nordic authenticity and sustainability.',
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
    seoDescription: 'Rejoignez SAUWA en tant que Sauna Master certifié/e en Andorre. Formation complète, carrière professionnelle unique en bien-être nordique.',
    hero: {
      title: 'Travailler avec nous',
      heading: 'OPPORTUNITÉ UNIQUE : SAUNA MASTER ACCRÉDITÉ SAUWA® EN ANDORRE',
      subtitle: 'Rejoignez notre équipe et devenez expert en bien-être nordique',
      ctaText: 'Postuler maintenant',
    },
    profile: {
      title: 'Profil du candidat/e',
      subtitle: 'Qui recherchons-nous ?',
    },
    requirements: [
      {
        icon: 'certification',
        title: 'Certification Aufguss Master',
        description: 'Formation officielle aux cérémonies Aufguss et techniques d\'aromathérapie et waving professionnel',
      },
      {
        icon: 'fitness',
        title: 'Excellente condition physique',
        description: 'Résistance à la chaleur extrême et capacité pour cérémonies à haute intensité',
      },
      {
        icon: 'presentation',
        title: 'Compétences sociales',
        description: 'Oratoire, animation et capacité à connecter avec des groupes multiculturels',
      },
    ],
    benefits: {
      title: 'Avantages',
      subtitle: 'Que vous offrons-nous ?',
      items: [
        {
          icon: 'money',
          title: 'Salaire compétitif',
          description: 'Rémunération alignée avec votre expérience et vos certifications',
        },
        {
          icon: 'education',
          title: 'Formation continue',
          description: 'Accès à la formation internationale et mise à jour constante en Aufguss, sécurité thermique et protocoles SAUWA.',
        },
        {
          icon: 'mountain',
          title: 'Environnement unique',
          description: 'Travaillez dans des emplacements privilégiés de montagne avec des partenaires sélectionnés, où l\'environnement élève l\'expérience.',
        },
        {
          icon: 'clock',
          title: 'Horaires flexibles',
          description: 'Équipes organisées qui permettent de concilier vie personnelle et travail.',
        },
        {
          icon: 'target',
          title: 'Carrière professionnelle',
          description: 'Évolution vers des rôles tels que Senior Sauna Master, formateur/trice de nouveaux talents ou coordination des opérations.',
        },
        {
          icon: 'handshake',
          title: 'Équipe multiculturelle',
          description: 'Rejoignez un groupe international passionné par le bien-être, l\'authenticité nordique et la durabilité.',
        },
      ],
    },
    responsibilities: {
      title: 'Responsabilités',
      heading: 'Qu\'est-ce qu\'être Sauna Master ?',
      intro: 'En tant que Sauna Master chez SAUWA, vous serez l\'ambassadeur/drice de la culture finlandaise du bien-être. Vos responsabilités incluent :',
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
      subtitle: 'Prêt/e à transformer le bien-être ?',
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
