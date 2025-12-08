/**
 * Dynamic Content Renderers
 * WDA-990: Functions for updating DOM with fresh content
 *
 * These renderers handle the client-side DOM updates when
 * dynamic content is loaded or changed. They work with the
 * DynamicContent.astro component's data attributes.
 */

import type {
  SessionData,
  PartnerData,
  PublicSessionData,
  Locale,
} from './dynamic-content-client';

import {
  getLocalizedSessionTitle,
  getLocalizedSessionSubtitle,
  getLocalizedSessionDescription,
} from './dynamic-content-client';

// ============================================================================
// CONSTANTS
// ============================================================================

const SELECTORS = {
  // Partner page selectors
  PARTNER_TITLE: '[data-dynamic="partner-title"]',
  PARTNER_ADDRESS: '[data-dynamic="partner-address"]',
  PARTNER_PHONE: '[data-dynamic="partner-phone"]',
  PARTNER_EMAIL: '[data-dynamic="partner-email"]',
  PARTNER_WEB: '[data-dynamic="partner-web"]',
  PARTNER_LOGO: '[data-dynamic="partner-logo"]',
  PARTNER_HERO: '[data-dynamic="partner-hero"]',

  // Session page selectors
  SESSION_TITLE: '[data-dynamic="session-title"]',
  SESSION_SUBTITLE: '[data-dynamic="session-subtitle"]',
  SESSION_DESCRIPTION: '[data-dynamic="session-description"]',
  SESSION_DURATION: '[data-dynamic="session-duration"]',
  SESSION_CAPACITY: '[data-dynamic="session-capacity"]',
  SESSION_PRICE: '[data-dynamic="session-price"]',
  SESSION_IMAGE: '[data-dynamic="session-image"]',

  // Session list selectors
  SESSIONS_CONTAINER: '[data-dynamic="sessions-list"]',
  SESSION_CARD: '[data-dynamic="session-card"]',

  // Loading states
  SKELETON: '[data-skeleton]',
  CONTENT: '[data-content]',
} as const;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely update text content of an element
 */
function updateText(
  container: Element,
  selector: string,
  value: string | undefined
): void {
  const element = container.querySelector(selector);
  if (element && value !== undefined) {
    element.textContent = value;
  }
}

/**
 * Safely update href attribute of a link
 */
function updateHref(
  container: Element,
  selector: string,
  value: string | undefined
): void {
  const element = container.querySelector(selector) as HTMLAnchorElement | null;
  if (element && value !== undefined) {
    element.href = value;
  }
}

/**
 * Safely update image src and alt
 */
function updateImage(
  container: Element,
  selector: string,
  src: string | undefined,
  alt: string = ''
): void {
  const element = container.querySelector(selector) as HTMLImageElement | null;
  if (element && src) {
    element.src = src;
    element.alt = alt;
  }
}

/**
 * Safely update HTML content (use with caution - only for trusted content)
 */
function updateHtml(
  container: Element,
  selector: string,
  html: string | undefined
): void {
  const element = container.querySelector(selector);
  if (element && html !== undefined) {
    element.innerHTML = html;
  }
}

/**
 * Show content and hide skeleton
 */
function showContent(container: Element): void {
  const skeleton = container.querySelector(SELECTORS.SKELETON);
  const content = container.querySelector(SELECTORS.CONTENT);

  if (skeleton) {
    skeleton.classList.add('hidden');
  }
  if (content) {
    content.classList.remove('hidden');
  }
}

/**
 * Show skeleton and hide content
 */
function showSkeleton(container: Element): void {
  const skeleton = container.querySelector(SELECTORS.SKELETON);
  const content = container.querySelector(SELECTORS.CONTENT);

  if (skeleton) {
    skeleton.classList.remove('hidden');
  }
  if (content) {
    content.classList.add('hidden');
  }
}

// ============================================================================
// PARTNER RENDERERS
// ============================================================================

/**
 * Render partner data into the DOM
 */
export function renderPartner(
  container: Element,
  partner: PartnerData,
  _locale: Locale
): void {
  // Update partner info
  updateText(container, SELECTORS.PARTNER_TITLE, partner.title);
  updateText(container, SELECTORS.PARTNER_ADDRESS, partner.address);
  updateText(container, SELECTORS.PARTNER_PHONE, partner.phone);
  updateText(container, SELECTORS.PARTNER_EMAIL, partner.email);

  // Update links
  if (partner.address) {
    const addressUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.address)}`;
    updateHref(container, `${SELECTORS.PARTNER_ADDRESS}`, addressUrl);
  }

  if (partner.phone) {
    updateHref(container, SELECTORS.PARTNER_PHONE, `tel:${partner.phone}`);
  }

  if (partner.email) {
    updateHref(container, SELECTORS.PARTNER_EMAIL, `mailto:${partner.email}`);
  }

  if (partner.web) {
    updateHref(container, SELECTORS.PARTNER_WEB, partner.web);
    // Extract hostname for display
    try {
      const hostname = new URL(partner.web).hostname.replace('www.', '');
      updateText(container, SELECTORS.PARTNER_WEB, hostname);
    } catch {
      updateText(container, SELECTORS.PARTNER_WEB, partner.web);
    }
  }

  // Update images
  if (partner.featuredImage) {
    updateImage(
      container,
      SELECTORS.PARTNER_LOGO,
      partner.featuredImage.sourceUrl,
      partner.featuredImage.altText || partner.title
    );
  }

  if (partner.heroImage) {
    updateImage(container, SELECTORS.PARTNER_HERO, partner.heroImage, partner.title);
  }

  // Show content
  showContent(container);
}

// ============================================================================
// SESSION RENDERERS
// ============================================================================

/**
 * Render session data into the DOM
 */
export function renderSession(
  container: Element,
  session: SessionData,
  locale: Locale
): void {
  // Get localized content
  const title = getLocalizedSessionTitle(session, locale);
  const subtitle = getLocalizedSessionSubtitle(session, locale);
  const description = getLocalizedSessionDescription(session, locale);

  // Update session info
  updateText(container, SELECTORS.SESSION_TITLE, title);
  updateText(container, SELECTORS.SESSION_SUBTITLE, subtitle);
  updateHtml(container, SELECTORS.SESSION_DESCRIPTION, description);
  updateText(container, SELECTORS.SESSION_DURATION, `${session.duration} min`);
  updateText(container, SELECTORS.SESSION_CAPACITY, String(session.capacity));
  updateText(container, SELECTORS.SESSION_PRICE, `${session.price}`);

  // Update image
  if (session.featuredImage) {
    updateImage(
      container,
      SELECTORS.SESSION_IMAGE,
      session.featuredImage.sourceUrl,
      session.featuredImage.altText || title
    );
  }

  // Show content
  showContent(container);
}

// ============================================================================
// SESSION LIST RENDERERS
// ============================================================================

/**
 * i18n labels for session cards
 */
const SESSION_CARD_LABELS: Record<Locale, { people: string; minutes: string }> = {
  es: { people: 'personas', minutes: 'min' },
  ca: { people: 'persones', minutes: 'min' },
  en: { people: 'people', minutes: 'min' },
  fr: { people: 'personnes', minutes: 'min' },
};

/**
 * Create session card HTML
 */
function createSessionCardHtml(
  session: SessionData | PublicSessionData,
  locale: Locale,
  partnerSlug: string
): string {
  const labels = SESSION_CARD_LABELS[locale];

  // Get localized title based on session type
  let title: string;
  let subtitle: string = '';
  let duration: number = 90;
  let capacity: number;
  let price: number;

  if ('localizedTitle' in session) {
    // SessionData type
    title = getLocalizedSessionTitle(session, locale);
    subtitle = getLocalizedSessionSubtitle(session, locale);
    duration = session.duration;
    capacity = session.capacity;
    price = session.price;
  } else {
    // PublicSessionData type
    title = session.title;
    capacity = session.capacity;
    price = session.price;
  }

  const sessionUrl = `/${locale}/${partnerSlug}/${session.slug}/`;
  const imageUrl = session.featuredImage?.sourceUrl || '';
  const imageAlt = session.featuredImage?.altText || title;

  return `
    <article class="session-card" data-dynamic="session-card" data-session-id="${session.databaseId}">
      <a href="${sessionUrl}" class="session-card__link">
        ${imageUrl ? `
          <div class="session-card__image">
            <img
              src="${imageUrl}"
              alt="${imageAlt}"
              loading="lazy"
              width="400"
              height="240"
            />
          </div>
        ` : ''}
        <div class="session-card__content">
          <h3 class="session-card__title">${title}</h3>
          ${subtitle ? `<p class="session-card__subtitle">${subtitle}</p>` : ''}

          <div class="session-card__meta">
            <span class="session-card__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              ${duration} ${labels.minutes}
            </span>
            <span class="session-card__meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              ${capacity} ${labels.people}
            </span>
            <span class="session-card__meta-item session-card__price">
              ${price}
            </span>
          </div>
        </div>
      </a>
    </article>
  `;
}

/**
 * Render list of sessions into a container
 */
export function renderSessionsList(
  container: Element,
  sessions: (SessionData | PublicSessionData)[],
  locale: Locale,
  partnerSlug: string
): void {
  const listContainer = container.querySelector(SELECTORS.SESSIONS_CONTAINER);
  if (!listContainer) {
    console.warn('[DynamicRenderer] Sessions container not found');
    return;
  }

  if (sessions.length === 0) {
    // Show no sessions message (already in DOM via SSG)
    showContent(container);
    return;
  }

  // Generate HTML for all session cards
  const cardsHtml = sessions
    .map(session => createSessionCardHtml(session, locale, partnerSlug))
    .join('');

  // Update container
  listContainer.innerHTML = cardsHtml;

  // Show content
  showContent(container);
}

/**
 * Update a single session card in the list (for partial updates)
 */
export function updateSessionCard(
  container: Element,
  session: SessionData | PublicSessionData,
  locale: Locale,
  partnerSlug: string
): void {
  const existingCard = container.querySelector(
    `${SELECTORS.SESSION_CARD}[data-session-id="${session.databaseId}"]`
  );

  if (existingCard) {
    // Replace existing card
    const newCardHtml = createSessionCardHtml(session, locale, partnerSlug);
    existingCard.outerHTML = newCardHtml;
  } else {
    // Add new card to list
    const listContainer = container.querySelector(SELECTORS.SESSIONS_CONTAINER);
    if (listContainer) {
      const newCardHtml = createSessionCardHtml(session, locale, partnerSlug);
      listContainer.insertAdjacentHTML('beforeend', newCardHtml);
    }
  }
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * i18n error messages
 */
const ERROR_MESSAGES: Record<Locale, { title: string; message: string; retry: string }> = {
  es: {
    title: 'Error al cargar',
    message: 'No se pudo cargar el contenido. Por favor, intenta de nuevo.',
    retry: 'Reintentar',
  },
  ca: {
    title: 'Error en carregar',
    message: 'No s\'ha pogut carregar el contingut. Si us plau, torna-ho a provar.',
    retry: 'Reintentar',
  },
  en: {
    title: 'Loading error',
    message: 'Could not load the content. Please try again.',
    retry: 'Retry',
  },
  fr: {
    title: 'Erreur de chargement',
    message: 'Impossible de charger le contenu. Veuillez reessayer.',
    retry: 'Reessayer',
  },
};

/**
 * Show error state in container
 */
export function showError(
  container: Element,
  locale: Locale,
  onRetry?: () => void
): void {
  const messages = ERROR_MESSAGES[locale];

  // Hide skeleton and content
  const skeleton = container.querySelector(SELECTORS.SKELETON);
  const content = container.querySelector(SELECTORS.CONTENT);

  if (skeleton) skeleton.classList.add('hidden');
  if (content) content.classList.add('hidden');

  // Create or update error element
  let errorEl = container.querySelector('[data-error]') as HTMLElement | null;

  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.setAttribute('data-error', '');
    errorEl.className = 'dynamic-error';
    container.appendChild(errorEl);
  }

  errorEl.innerHTML = `
    <div class="dynamic-error__content">
      <h3 class="dynamic-error__title">${messages.title}</h3>
      <p class="dynamic-error__message">${messages.message}</p>
      <button class="dynamic-error__retry" type="button">${messages.retry}</button>
    </div>
  `;

  errorEl.classList.remove('hidden');

  // Attach retry handler
  if (onRetry) {
    const retryBtn = errorEl.querySelector('.dynamic-error__retry');
    retryBtn?.addEventListener('click', () => {
      errorEl?.classList.add('hidden');
      showSkeleton(container);
      onRetry();
    });
  }
}

/**
 * Hide error state
 */
export function hideError(container: Element): void {
  const errorEl = container.querySelector('[data-error]');
  if (errorEl) {
    errorEl.classList.add('hidden');
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  showContent,
  showSkeleton,
  SELECTORS,
};
