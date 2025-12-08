# Tests Directory

## Overview

Comprehensive testing suite for the SAUWA booking system integration.

**Stack**: Astro SSG + WordPress Headless + Playwright E2E

---

## Quick Start

```bash
# Install Playwright browsers (first time only)
npx playwright install chromium

# Start dev server (port 4321 or next available)
npm run dev

# Run smoke + cross-browser tests (recommended: 2 workers)
npx playwright test tests/e2e-smoke.spec.ts tests/e2e-cross-browser.spec.ts --project=chromium --workers=2

# Run against production
E2E_BASE_URL=https://sauwasauna.com npx playwright test tests/e2e-smoke.spec.ts --project=chromium

# Run with UI (interactive mode)
npx playwright test --ui
```

### Default Base URL
Tests use `http://localhost:4324` by default. Override with `E2E_BASE_URL` env var.

---

## Test Structure

```
tests/
├── README.md                           # This file
├── E2E-EXECUTION-GUIDE.md             # Complete execution guide
├── playwright.config.ts                # Playwright configuration
│
├── E2E Test Suites (Comprehensive)
├── e2e-smoke.spec.ts                  # Smoke tests (P0 - run first!)
├── e2e-booking-single.spec.ts         # Single session booking flow
├── e2e-booking-private.spec.ts        # Private session booking flow
├── e2e-booking-voucher.spec.ts        # Voucher purchase flow
├── e2e-multi-locale.spec.ts           # Multi-locale & GraphQL tests
├── e2e-error-handling.spec.ts         # Error handling & edge cases
├── e2e-cross-browser.spec.ts          # Cross-browser & mobile tests
│
├── Legacy Tests (Previous iterations)
├── booking-widget-fixes.spec.ts       # WDA-910, WDA-911, WDA-912, WDA-913
├── automated-inspection.spec.ts       # General automated tests
├── visual-inspection.spec.ts          # Visual regression tests
├── test-benefits-blog.spec.ts         # Blog component tests
├── sticky-test-isolated.spec.ts       # Sticky layout tests
├── test-mobile-blog.js                # Mobile blog script
└── verify-mobile-fixes.js             # Mobile fixes script

reports/
├── E2E-TEST-PLAN-SAUWA-BOOKING.md     # Master test plan
├── MOBILE_*.md                        # Mobile testing reports
├── VISUAL_*.md                        # Visual regression reports
└── WDA-*.md                           # Task-specific reports
```

---

## Test Suites

### Smoke Tests (CRITICAL)
**File**: `e2e-smoke.spec.ts`
**Duration**: ~30 seconds
**Command**: `npm run test:smoke` or `npx playwright test tests/e2e-smoke.spec.ts --project=chromium`

Tests critical path against real session URLs:

| Test ID | Name | What it Verifies |
|---------|------|------------------|
| TC-001 | Partner page loads | Partner displays name, contact info, sessions list |
| TC-003 | Single session page | Session page loads with title, booking widget |
| TC-004 | Session structure | Duration (60 min), capacity (6 personas), price (35,00€), partner |
| TC-005 | Booking widget | All 4 steps visible: Fecha → Horario → Datos → Confirmación |
| TC-006 | Calendar navigation | Next/prev month buttons work |
| GraphQL | Endpoint health | GraphQL API returns valid response |

**When to run**: Every commit, before deployment
**Pass criteria**: 100% pass rate (blocker if fails)

---

### Booking Tests
**Files**: `e2e-booking-*.spec.ts`
**Duration**: ~20 minutes
**Command**: `npm run test:booking`

Tests all session types:
- **Single**: TC-007 to TC-012 (calendar, attendees, validation)
- **Private**: TC-013 (full capacity booking)
- **Voucher**: TC-014, TC-015 (purchase, redemption)

**When to run**: Every PR touching booking widget

---

### Multi-Locale Tests
**File**: `e2e-multi-locale.spec.ts`
**Duration**: ~15 minutes
**Command**: `npm run test:locale`

Tests localization:
- TC-016: All locales (es, ca, en, fr)
- TC-002: GraphQL integration
- TC-WDA-963: Dynamic routes

**When to run**: When modifying translations or routes

---

### Error Handling Tests
**File**: `e2e-error-handling.spec.ts`
**Duration**: ~8 minutes

Tests error scenarios:
- TC-017: Slot fully booked
- TC-018: Session timeout
- TC-019: Network errors
- Edge cases (capacity, past dates, empty forms)

---

### Cross-Browser & Mobile Tests
**File**: `e2e-cross-browser.spec.ts`
**Duration**: ~20 seconds
**Command**: `npx playwright test tests/e2e-cross-browser.spec.ts --project=chromium`

Tests responsive design and performance:

| Test ID | Name | Viewport | What it Verifies |
|---------|------|----------|------------------|
| TC-021 | Mobile iPhone | 390x844 | Page loads, no horizontal scroll, widget visible |
| TC-021B | Mobile Android | 393x851 | Touch interactions, calendar navigation |
| TC-021C | Mobile landscape | 844x390 | Layout adapts, no horizontal scroll |
| TC-021D | Tablet | 1024x1366 | All booking steps visible |
| TC-PERF-001 | Page load | Desktop | Page loads < 45s (dev) / < 5s (prod) |
| TC-PERF-002 | Calendar nav | Desktop | Navigation < 1.5s |

---

## NPM Scripts

```bash
# Run all tests
npm test

# Smoke tests (critical path)
npm run test:smoke

# Booking tests only
npm run test:booking

# Locale tests
npm run test:locale

# Mobile tests
npm run test:mobile

# UI mode (interactive)
npm run test:ui

# Headed mode (see browser)
npm run test:headed

# Debug mode
npm run test:debug

# View HTML report
npm run test:report
```

---

## Running Tests

### All Tests
```bash
npm test
```

### Specific Test File
```bash
npx playwright test tests/e2e-smoke.spec.ts
```

### Specific Test Case
```bash
npx playwright test -g "TC-001"
```

### Specific Browser
```bash
# Chrome only
npx playwright test --project=chromium

# Mobile Safari
npx playwright test --project=mobile-safari
```

### With Retries
```bash
npx playwright test --retries=2
```

### Generate Report
```bash
npm run test:report
```

---

## Test Coverage

### Session Types
- [x] Single session (standard booking with quantity)
- [x] Private session (full capacity booking)
- [x] Voucher session (gift vouchers, no calendar)

### Locales
- [x] Spanish (es)
- [x] Catalan (ca)
- [x] English (en)
- [x] French (fr)

### Browsers
- [x] Chrome (Desktop)
- [x] Firefox (Desktop)
- [x] Safari (Desktop)
- [x] Mobile Chrome (Android)
- [x] Mobile Safari (iPhone)

### Critical Flows
- [x] Partner page load (GraphQL)
- [x] Session detail pages
- [x] Calendar navigation
- [x] Slot selection
- [x] Attendee management (add/remove)
- [x] Form validation
- [x] Error handling
- [x] Multi-locale support
- [x] Mobile responsiveness

---

## Test Plan

**Master Document**: `tests/reports/E2E-TEST-PLAN-SAUWA-BOOKING.md`

Comprehensive test plan covering:
- 21 test cases (TC-001 to TC-021)
- 4 test levels (Smoke, Functional, Integration, Regression)
- Test data matrix
- Success criteria
- Risk assessment

---

## Regression Tests

These tests prevent previously fixed bugs from reappearing:

- **WDA-910**: Optional email for additional attendees
- **WDA-911**: Attendee cleanup on navigation back
- **WDA-912**: Error message translations
- **WDA-913**: Attendee count structure

All regression tests are included in `e2e-booking-single.spec.ts`

---

## Test Reports

### Locations
- **HTML Report**: `test-results/html/index.html`
- **JSON Report**: `test-results/results.json`
- **Screenshots**: `test-results/artifacts/`
- **Videos**: `test-results/artifacts/` (on failure)

### Viewing Reports
```bash
npm run test:report
```

Opens interactive HTML report with:
- Test results
- Screenshots on failure
- Videos on failure
- Network logs
- Console logs

---

## Test Data

### Test URLs (Updated 2025-12-07)

Tests now use **real session URLs** instead of `/test/*` routes:

```typescript
const ROUTES = {
  partner: '/es/hotel-coma-bella/',
  singleSession: '/es/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/',
};
```

### Test Partner
- **Slug**: `hotel-coma-bella`
- **Name**: Hotel Coma Bella
- **Address**: Carretera de la Rabassa, KM6, AD 600
- **Contact**: +376742030, info@hotelcomabella.com

### Session Under Test
- **Title**: Jornadas de puertas abiertas
- **Duration**: 60 minutos
- **Capacity**: 6 personas
- **Price**: 35,00€ por persona

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:smoke
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

---

## Troubleshooting

### Common Issues

**Tests timing out?**
- Increase timeout in `playwright.config.ts`
- Check if site is accessible
- Run with `--headed` to see what's happening

**Element not found?**
- Selectors may have changed
- Check screenshots in `test-results/`
- Run with `--debug` to step through

**Flaky tests?**
- Add retries: `npx playwright test --retries=2`
- Add explicit waits
- Check for race conditions

**Browser not installed?**
```bash
npx playwright install chromium
```

---

## Best Practices

1. **Run smoke tests first** - Catch critical issues early
2. **Use UI mode for development** - Faster feedback when writing tests
3. **Take screenshots on failure** - Already configured
4. **Keep tests independent** - Each test should run standalone
5. **Use data attributes** - Prefer `[data-*]` over class names
6. **Wait for network idle** - Use `waitUntil: 'networkidle'` for GraphQL

---

## Success Metrics

### Smoke Tests
- **Target**: 100% pass rate
- **Duration**: < 5 minutes
- **Blocker**: Any P0 test failure blocks deployment

### Functional Tests
- **Target**: 95% pass rate
- **Duration**: < 20 minutes
- **Threshold**: No more than 1 P1 test failure

### Performance
- **Page Load**: < 3 seconds
- **Widget Interaction**: < 500ms
- **Form Submission**: < 2 seconds

---

## Documentation

- **Test Plan**: [E2E-TEST-PLAN-SAUWA-BOOKING.md](reports/E2E-TEST-PLAN-SAUWA-BOOKING.md)
- **Execution Guide**: [E2E-EXECUTION-GUIDE.md](E2E-EXECUTION-GUIDE.md)
- **Playwright Docs**: https://playwright.dev
- **SAUWA Docs**: ../docs/

---

## Related Issues

- **WDA-910**: Optional email for additional attendees
- **WDA-911**: Attendee cleanup on navigation
- **WDA-912**: Error message translations
- **WDA-913**: Attendee count structure
- **WDA-963**: Dynamic routes implementation
- **WDA-974**: Session types (single, private, voucher)
- **WDA-986**: GraphQL partner integration

---

## Requirements

- Node.js 18+
- Playwright 1.49.0+
- npm or pnpm
- Access to https://sauwasauna.com
- Access to https://backend.sauwasauna.com/graphql

---

**Last Updated**: 2025-12-07
**Version**: 2.0.0 (Comprehensive E2E Suite)
