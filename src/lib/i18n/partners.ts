/**
 * WDA-528: Traducciones para página "Partners Hoteleros SAUWA"
 * Anteriormente "Acceso Exclusivo"
 * Multiidioma: ES, CA, EN, FR
 */

export type PartnersLocale = 'es' | 'ca' | 'en' | 'fr';

interface Country {
  code: string;
  name: string;
  benefit: string;
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
    seoTitle: 'Partners Hoteleros SAUWA - Alianzas B2B | SAUWA',
    seoDescription: 'Experiencia premium llave en mano para hoteles y glampings de lujo. Atrae turismo nórdico de alto valor con SAUWA.',
    hero: {
      title: 'Partners Hoteleros',
      heading: 'CONVIERTE TU PISCINA EN EL MUST-HAVE DEL INVIERNO',
      subtitle: 'Sauna finlandesa de leña + ritual Aufguss guiado + contraste frío: una experiencia wellness llave en mano que eleva tu propuesta, atrae huéspedes de alto valor y diferencia tu hotel en temporada invernal.',
      ctaText: 'Solicitar Evaluación',
    },
    intro: {
      title: 'El valor distintivo de SAUWA',
      heading: 'Más que una sauna, una experiencia de bienestar premium',
      text: 'SAUWA no es solo una sauna móvil, es una experiencia de bienestar premium llave en mano, diseñada para maximizar el atractivo de ubicaciones únicas y sus entornos acuáticos de exterior durante la temporada invernal. Te ofrecemos la oportunidad de incorporar un servicio de alto valor percibido que diferencia tu propiedad y atrae a un segmento de clientes que busca experiencias inolvidables en invierno. Nos ocupamos de toda la operación, desde la logística y la instalación en entornos acuáticos idílicos, hasta la gestión de la experiencia del usuario, garantizando la máxima excelencia y seguridad.',
      imageSrc: '/images/partners-sauwa-sauna-instalaciones.webp',
      imageAlt: 'Instalación premium SAUWA en entorno natural',
    },
    countries: {
      title: 'Turismo de alto valor',
      subtitle: 'Atrayendo al turista de bienestar nórdico y centroeuropeo',
      intro: 'Los mercados de mayor gasto medio en entornos alpinos —Reino Unido, Rusia, Suiza, Austria, Alemania, Suecia, Noruega y Finlandia— integran la sauna en su rutina de bienestar y post-ejercicio invernal. Este cliente no se conforma con experimentar simplemente calor: exige autenticidad, protocolos precisos y un ritual guiado que culmine en contraste frío.\n\nSAUWA sauna lleva a tu hotel la experiencia finlandesa original (inscrita por la UNESCO como Patrimonio Cultural Inmaterial) con sauna de leña, Aufguss dirigido por sauna master certificado y baño frío guiado (cold plunge). El resultado no es "pasar calor": es un ritual cultural ancestral de alto nivel que eleva el valor percibido de la estancia, genera contenido orgánico memorable y alinea tu marca con las expectativas del huésped nórdico más exigente.\n\nAdemás, nuestro formato es móvil, temporal y llave en mano: instalación sin obras, operativa completa y know-how a cargo de SAUWA y un setup sostenible que respeta la estética del hotel.\n\nDe "servicio de spa genérico" a icono de temporada invernal: con SAUWA tu propiedad ofrece una experiencia exclusiva, auténtica y perfectamente coherente con el estándar que los viajeros esperan encontrar en un destino de alta montaña.',
      items: [
        { code: 'CH', name: 'Suiza', benefit: 'Alto gasto medio' },
        { code: 'AT', name: 'Austria', benefit: 'Cultura sauna tradicional' },
        { code: 'DE', name: 'Alemania', benefit: 'Mercado premium' },
        { code: 'SE', name: 'Suecia', benefit: 'Alto valor de gasto' },
        { code: 'NO', name: 'Noruega', benefit: 'Turismo de lujo' },
        { code: 'FI', name: 'Finlandia', benefit: 'Origen de la sauna' },
        { code: 'GB', name: 'Reino Unido', benefit: 'Mercado wellness' },
        { code: 'RU', name: 'Rusia', benefit: 'Turismo exclusivo' },
      ],
    },
    selection: {
      title: 'Proceso de selección',
      subtitle: 'Criterios de excelencia SAUWA',
      intro: 'No todos los hoteles reúnen nuestros estándares. Evaluamos cuidadosamente cada solicitud para garantizar que la sinergia beneficie a ambas partes.',
      requirements: [
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Excelencia en entorno y estética',
          description: 'Buscamos hoteles que cuiden el diseño y la atmósfera: espacios armónicos, entornos naturales privilegiados y atención al detalle para fusionarse con nuestro ritual nórdico.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z" stroke="currentColor" stroke-width="2"/><path d="M12 6V3M12 18V21M8 6L12 3L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Viabilidad logística',
          description: 'La viabilidad del sitio depende crucialmente de un acceso con capacidad para maniobrar e introducir la sauna. Cada ubicación se evalúa individualmente para garantizar que cumpla con todos los requisitos logísticos y operativos.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Compromiso con la experiencia',
          description: 'Buscamos partners que integren SAUWA como palanca estratégica. Excelencia operativa y co-marketing alineado para un resultado win-win.',
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
        submit: 'SOLICITAR EVALUACIÓN',
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
    seoTitle: 'Socis Hotelers SAUWA - Aliances B2B | SAUWA',
    seoDescription: 'Experiència premium claus en mà per hotels i glampings de luxe. Atrau turisme nòrdic d\'alt valor amb SAUWA.',
    hero: {
      title: 'Socis Hotelers',
      heading: 'CONVERTEIX LA TEVA PISCINA EN EL MUST-HAVE DE L\'HIVERN',
      subtitle: 'Sauna finlandesa de llenya + ritual Aufguss guiat + contrast fred: una experiència wellness claus en mà que eleva la teva proposta, atrau hostes d\'alt valor i diferencia el teu hotel a temporada hivernal.',
      ctaText: 'Sol·licitar Avaluació',
    },
    intro: {
      title: 'El valor distintiu de SAUWA',
      heading: 'Més que una sauna, una experiència de benestar premium',
      text: 'SAUWA no és només una sauna mòbil, és una experiència de benestar premium claus en mà, dissenyada per maximitzar l\'atractiu d\'ubicacions úniques i els seus entorns aquàtics d\'exterior durant la temporada hivernal. T\'oferim l\'oportunitat d\'incorporar un servei d\'alt valor percebut que diferencia la teva propietat i atrau un segment de clients que cerca experiències inoblidables a l\'hivern. Ens ocupem de tota l\'operació, des de la logística i la instal·lació en entorns aquàtics idíl·lics, fins a la gestió de l\'experiència de l\'usuari, garantint la màxima excel·lència i seguretat.',
      imageSrc: '/images/partners-sauwa-sauna-instalaciones.webp',
      imageAlt: 'Instal·lació premium SAUWA en entorn natural',
    },
    countries: {
      title: 'Turisme d\'alt valor',
      subtitle: 'Atraient el turista de benestar nòrdic i centreeuropeu',
      intro: 'Els mercats de major despesa mitjana en entorns alpins —Regne Unit, Rússia, Suïssa, Àustria, Alemanya, Suècia, Noruega i Finlàndia— integren la sauna a la seva rutina de benestar i post-exercici hivernal. Aquest client no es conforma amb experimentar simplement calor: exigeix autenticitat, protocols precisos i un ritual guiat que culmini en contrast fred.\n\nSAUWA sauna porta al teu hotel l\'experiència finlandesa original (inscrita per la UNESCO com a Patrimoni Cultural Immaterial) amb sauna de llenya, Aufguss dirigit per sauna master certificat i bany fred guiat (cold plunge). El resultat no és "passar calor": és un ritual cultural ancestral d\'alt nivell que eleva el valor percebut de l\'estada, genera contingut orgànic memorable i alinea la teva marca amb les expectatives de l\'hoste nòrdic més exigent.\n\nA més, el nostre format és mòbil, temporal i claus en mà: instal·lació sense obres, operativa completa i know-how a càrrec de SAUWA i un setup sostenible que respecta l\'estètica de l\'hotel.\n\nDe "servei d\'spa genèric" a icona de temporada hivernal: amb SAUWA la teva propietat ofereix una experiència exclusiva, autèntica i perfectament coherent amb l\'estàndard que els viatgers esperen trobar en una destinació d\'alta muntanya.',
      items: [
        { code: 'CH', name: 'Suïssa', benefit: 'Alta despesa mitjana' },
        { code: 'AT', name: 'Àustria', benefit: 'Cultura sauna tradicional' },
        { code: 'DE', name: 'Alemanya', benefit: 'Mercat premium' },
        { code: 'SE', name: 'Suècia', benefit: 'Alt valor de despesa' },
        { code: 'NO', name: 'Noruega', benefit: 'Turisme de luxe' },
        { code: 'FI', name: 'Finlàndia', benefit: 'Origen de la sauna' },
        { code: 'GB', name: 'Regne Unit', benefit: 'Mercat wellness' },
        { code: 'RU', name: 'Rússia', benefit: 'Turisme exclusiu' },
      ],
    },
    selection: {
      title: 'Procés de selecció',
      subtitle: 'Criteris d\'excel·lència SAUWA',
      intro: 'No tots els hotels reuneixen els nostres estàndards. Avaluem acuradament cada sol·licitud per garantir que la sinergia beneficiï ambdues parts.',
      requirements: [
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Excel·lència en entorn i estètica',
          description: 'Busquem hotels que cuidin el disseny i l\'atmosfera: espais harmònics, entorns naturals privilegiats i atenció al detall per fusionar-se amb el nostre ritual nòrdic.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z" stroke="currentColor" stroke-width="2"/><path d="M12 6V3M12 18V21M8 6L12 3L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Viabilitat logística',
          description: 'La viabilitat del lloc depèn críticament d\'un accés amb capacitat per maniobrar i introduir la sauna. Cada ubicació s\'avalua individualment per garantir que compleixi amb tots els requisits logístics i operatius.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Compromís amb l\'experiència',
          description: 'Busquem partners que integrin SAUWA com a palanca estratègica. Excel·lència operativa i co-màrqueting alineat per a un resultat win-win.',
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
        submit: 'SOL·LICITAR AVALUACIÓ',
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
    seoTitle: 'Hotel Partners SAUWA - B2B Alliances | SAUWA',
    seoDescription: 'Premium turnkey experience for luxury hotels and glampings. Attract high-value Nordic tourism with SAUWA.',
    hero: {
      title: 'Hotel Partners',
      heading: 'TURN YOUR POOL INTO THE WINTER MUST-HAVE',
      subtitle: 'Finnish wood-fired sauna + guided Aufguss ritual + cold contrast: a turnkey wellness experience that elevates your offering, attracts high-value guests, and differentiates your hotel in winter season.',
      ctaText: 'Request Evaluation',
    },
    intro: {
      title: 'SAUWA\'s distinctive value',
      heading: 'More than a sauna, a premium wellness experience',
      text: 'SAUWA is not just a mobile sauna, it is a premium turnkey wellness experience, designed to maximize the appeal of unique locations and their outdoor aquatic environments during the winter season. We offer you the opportunity to incorporate a high perceived value service that differentiates your property and attracts a segment of clients seeking unforgettable winter experiences. We handle the entire operation, from logistics and installation in idyllic aquatic environments, to user experience management, ensuring maximum excellence and safety.',
      imageSrc: '/images/partners-sauwa-sauna-instalaciones.webp',
      imageAlt: 'SAUWA premium installation in natural environment',
    },
    countries: {
      title: 'High-value tourism',
      subtitle: 'Attracting Nordic and Central European wellness tourists',
      intro: 'The markets with the highest average spending in alpine environments —United Kingdom, Russia, Switzerland, Austria, Germany, Sweden, Norway, and Finland— integrate sauna into their wellness and post-winter exercise routine. These clients don\'t settle for simply experiencing heat: they demand authenticity, precise protocols, and a guided ritual culminating in cold contrast.\n\nSAUWA sauna brings the original Finnish experience (inscribed by UNESCO as Intangible Cultural Heritage) to your hotel with wood-fired sauna, Aufguss led by a certified sauna master, and guided cold plunge. The result is not "enduring heat": it\'s a high-level ancestral cultural ritual that elevates the perceived value of the stay, generates memorable organic content, and aligns your brand with the expectations of the most demanding Nordic guest.\n\nFurthermore, our format is mobile, temporary, and turnkey: installation without construction, complete operation and know-how managed by SAUWA, and a sustainable setup that respects the hotel\'s aesthetics.\n\nFrom "generic spa service" to winter season icon: with SAUWA your property offers an exclusive, authentic experience perfectly aligned with the standards travelers expect to find in a high-mountain destination.',
      items: [
        { code: 'CH', name: 'Switzerland', benefit: 'High average spending' },
        { code: 'AT', name: 'Austria', benefit: 'Traditional sauna culture' },
        { code: 'DE', name: 'Germany', benefit: 'Premium market' },
        { code: 'SE', name: 'Sweden', benefit: 'High spending value' },
        { code: 'NO', name: 'Norway', benefit: 'Luxury tourism' },
        { code: 'FI', name: 'Finland', benefit: 'Origin of sauna' },
        { code: 'GB', name: 'United Kingdom', benefit: 'Wellness market' },
        { code: 'RU', name: 'Russia', benefit: 'Exclusive tourism' },
      ],
    },
    selection: {
      title: 'Selection process',
      subtitle: 'SAUWA excellence criteria',
      intro: 'Not all hotels meet our standards. We carefully evaluate each application to ensure the synergy benefits both parties.',
      requirements: [
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Excellence in environment and aesthetics',
          description: 'We seek hotels that care for design and atmosphere: harmonious spaces, privileged natural environments, and attention to detail to blend with our Nordic ritual.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z" stroke="currentColor" stroke-width="2"/><path d="M12 6V3M12 18V21M8 6L12 3L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Logistical viability',
          description: 'Site viability critically depends on access with capacity to maneuver and introduce the sauna. Each location is evaluated individually to ensure it meets all logistical and operational requirements.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Commitment to experience',
          description: 'We seek partners who integrate SAUWA as a strategic lever. Operational excellence and aligned co-marketing for a win-win result.',
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
        submit: 'REQUEST EVALUATION',
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
    seoTitle: 'Partenaires Hôteliers SAUWA - Alliances B2B | SAUWA',
    seoDescription: 'Expérience premium clés en main pour hôtels et glampings de luxe. Attirez le tourisme nordique à haute valeur avec SAUWA.',
    hero: {
      title: 'Partenaires Hôteliers',
      heading: 'TRANSFORMEZ VOTRE PISCINE EN LE MUST-HAVE DE L\'HIVER',
      subtitle: 'Sauna finlandais au feu de bois + rituel Aufguss guidé + contraste froid : une expérience wellness clés en main qui élève votre offre, attire une clientèle à haute valeur et différencie votre hôtel en saison hivernale.',
      ctaText: 'Demander Évaluation',
    },
    intro: {
      title: 'La valeur distinctive de SAUWA',
      heading: 'Plus qu\'un sauna, une expérience de bien-être premium',
      text: 'SAUWA n\'est pas seulement un sauna mobile, c\'est une expérience de bien-être premium clés en main, conçue pour maximiser l\'attrait de lieux uniques et leurs environnements aquatiques extérieurs pendant la saison hivernale. Nous vous offrons l\'opportunité d\'intégrer un service à haute valeur perçue qui différencie votre propriété et attire un segment de clients recherchant des expériences inoubliables en hiver. Nous nous occupons de toute l\'opération, de la logistique et de l\'installation dans des environnements aquatiques idylliques, à la gestion de l\'expérience utilisateur, garantissant excellence et sécurité maximales.',
      imageSrc: '/images/partners-sauwa-sauna-instalaciones.webp',
      imageAlt: 'Installation premium SAUWA en environnement naturel',
    },
    countries: {
      title: 'Tourisme à haute valeur',
      subtitle: 'Attirer le touriste du bien-être nordique et centre-européen',
      intro: 'Les marchés de dépense moyenne la plus élevée dans les environnements alpins —Royaume-Uni, Russie, Suisse, Autriche, Allemagne, Suède, Norvège et Finlande— intègrent le sauna dans leur routine de bien-être et post-exercice hivernal. Ce client ne se contente pas d\'expérimenter simplement la chaleur : il exige authenticité, protocoles précis et un rituel guidé qui culmine en contraste froid.\n\nSAUWA sauna apporte à votre hôtel l\'expérience finlandaise originale (inscrite par l\'UNESCO comme Patrimoine Culturel Immatériel) avec sauna au feu de bois, Aufguss dirigé par un sauna master certifié et bain froid guidé (cold plunge). Le résultat n\'est pas "supporter la chaleur" : c\'est un rituel culturel ancestral de haut niveau qui élève la valeur perçue du séjour, génère un contenu organique mémorable et aligne votre marque avec les attentes de l\'hôte nordique le plus exigeant.\n\nDe plus, notre format est mobile, temporaire et clés en main : installation sans travaux, opération complète et savoir-faire à la charge de SAUWA et un setup durable qui respecte l\'esthétique de l\'hôtel.\n\nDe "service spa générique" à icône de saison hivernale : avec SAUWA votre propriété offre une expérience exclusive, authentique et parfaitement cohérente avec le standard que les voyageurs s\'attendent à trouver dans une destination de haute montagne.',
      items: [
        { code: 'CH', name: 'Suisse', benefit: 'Dépense moyenne élevée' },
        { code: 'AT', name: 'Autriche', benefit: 'Culture sauna traditionnelle' },
        { code: 'DE', name: 'Allemagne', benefit: 'Marché premium' },
        { code: 'SE', name: 'Suède', benefit: 'Valeur de dépense élevée' },
        { code: 'NO', name: 'Norvège', benefit: 'Tourisme de luxe' },
        { code: 'FI', name: 'Finlande', benefit: 'Origine du sauna' },
        { code: 'GB', name: 'Royaume-Uni', benefit: 'Marché wellness' },
        { code: 'RU', name: 'Russie', benefit: 'Tourisme exclusif' },
      ],
    },
    selection: {
      title: 'Processus de sélection',
      subtitle: 'Critères d\'excellence SAUWA',
      intro: 'Tous les hôtels ne répondent pas à nos normes. Nous évaluons soigneusement chaque demande pour garantir que la synergie profite aux deux parties.',
      requirements: [
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Excellence en environnement et esthétique',
          description: 'Nous recherchons des hôtels qui soignent le design et l\'atmosphère : espaces harmonieux, environnements naturels privilégiés et attention aux détails pour fusionner avec notre rituel nordique.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16Z" stroke="currentColor" stroke-width="2"/><path d="M12 6V3M12 18V21M8 6L12 3L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Viabilité logistique',
          description: 'La viabilité du site dépend de manière critique d\'un accès avec capacité pour manœuvrer et introduire le sauna. Chaque emplacement est évalué individuellement pour garantir qu\'il répond à toutes les exigences logistiques et opérationnelles.',
        },
        {
          icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" stroke-width="2"/><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          title: 'Engagement envers l\'expérience',
          description: 'Nous recherchons des partenaires qui intègrent SAUWA comme levier stratégique. Excellence opérationnelle et co-marketing aligné pour un résultat gagnant-gagnant.',
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
        submit: 'DEMANDER ÉVALUATION',
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
