# E2E Tests - Quick Reference Card

**SAUWA Booking System** | Playwright Test Suite

---

## Install (First Time)

```bash
npm install
npx playwright install chromium firefox webkit
```

---

## Run Tests

```bash
# Smoke tests (5 min - run first!)
npm run test:smoke

# All tests
npm test

# Booking tests only
npm run test:booking

# UI mode (interactive)
npm run test:ui

# View report
npm run test:report
```

---

## Test Files

| File | Coverage | Duration |
|------|----------|----------|
| `e2e-smoke.spec.ts` | Critical path (P0) | ~5 min |
| `e2e-booking-single.spec.ts` | Single session flow | ~10 min |
| `e2e-booking-private.spec.ts` | Private session flow | ~5 min |
| `e2e-booking-voucher.spec.ts` | Voucher purchase | ~5 min |
| `e2e-multi-locale.spec.ts` | Locales + GraphQL | ~15 min |
| `e2e-error-handling.spec.ts` | Errors + edge cases | ~8 min |
| `e2e-cross-browser.spec.ts` | Mobile + performance | ~10 min |

**Total**: ~58 minutes (all tests, all browsers)

---

## Test Cases

### Smoke Tests (P0)
- TC-001: Partner page loads
- TC-003: Single session page
- TC-004: Private session page
- TC-005: Voucher session page
- TC-006: Calendar initializes

### Booking Flow
- TC-007: Day/slot selection
- TC-008: Attendee management
- TC-009: Attendee cleanup (WDA-911)
- TC-010: Optional emails (WDA-910)
- TC-011: Form validation
- TC-012: Translations (WDA-912)

### Session Types
- TC-013: Private session
- TC-014: Voucher purchase
- TC-015: Voucher redemption

### Multi-Locale
- TC-016: All locales (es, ca, en, fr)
- TC-002: GraphQL integration
- TC-WDA-963: Dynamic routes

### Error Handling
- TC-017: Slot fully booked
- TC-018: Session timeout
- TC-019: Network errors

### Mobile
- TC-021: Mobile responsiveness
- TC-PERF: Performance benchmarks

---

## Quick Commands

```bash
# Run specific test
npx playwright test -g "TC-001"

# Chrome only
npx playwright test --project=chromium

# Mobile only
npm run test:mobile

# Debug mode
npm run test:debug

# With retries
npx playwright test --retries=2

# Headed (see browser)
npm run test:headed
```

---

## Test Data

### URLs
- **Base**: https://sauwasauna.com
- **GraphQL**: https://backend.sauwasauna.com/graphql

### Sessions
- **Single**: `/test/booking-single/` (ID 224)
- **Private**: `/test/booking-private/` (ID 226)
- **Voucher**: `/test/booking-voucher/` (ID 229)
- **Production**: `/es/hotel-coma-bella/jornadas-de-puertas-abiertas/` (ID 167)

### Locales
- `es` - Spanish
- `ca` - Catalan
- `en` - English
- `fr` - French

---

## Success Criteria

| Test Level | Pass Rate | Duration |
|------------|-----------|----------|
| Smoke | 100% | < 5 min |
| Functional | 95% | < 20 min |
| Regression | 90% | < 45 min |

---

## Troubleshooting

**Timeout?**
```bash
npm run test:headed
```

**Element not found?**
- Check `test-results/` screenshots
- Run `npm run test:debug`

**Browser missing?**
```bash
npx playwright install chromium
```

---

## Reports

- **HTML**: `test-results/html/index.html`
- **Screenshots**: `test-results/artifacts/`
- **Videos**: `test-results/artifacts/` (on failure)

```bash
npm run test:report
```

---

## Documentation

- [Test Plan](reports/E2E-TEST-PLAN-SAUWA-BOOKING.md) - Master test plan
- [Execution Guide](E2E-EXECUTION-GUIDE.md) - Complete guide
- [README](README.md) - Full documentation

---

## Related Issues

- WDA-910, WDA-911, WDA-912, WDA-913 (Regression tests)
- WDA-963 (Dynamic routes)
- WDA-974 (Session types)
- WDA-986 (GraphQL)

---

**Version**: 1.0.0 | **Updated**: 2025-12-07
