# E2E Test Execution Guide

**SAUWA Booking System - Playwright E2E Tests**
**Version**: 1.0.0
**Created**: 2025-12-07

---

## Quick Start

```bash
# Install dependencies (first time only)
npm install
npx playwright install chromium firefox webkit

# Run all tests
npm test

# Run smoke tests (5 min - run first!)
npm run test:smoke

# Run booking tests only
npm run test:booking

# Run with UI (interactive)
npm run test:ui

# View last test report
npm run test:report
```

---

## Test Suites

### 1. Smoke Tests (CRITICAL - Run First)
**File**: `tests/e2e-smoke.spec.ts`
**Duration**: ~5 minutes
**Command**: `npm run test:smoke`

**What it tests**:
- Partner page loads
- Session detail pages (single, private, voucher)
- Calendar initializes
- GraphQL endpoint health

**When to run**: Every commit, before any deployment

**Pass criteria**: 100% pass rate (blocker if fails)

---

### 2. Single Session Booking Tests
**File**: `tests/e2e-booking-single.spec.ts`
**Duration**: ~10 minutes
**Command**: `npx playwright test tests/e2e-booking-single.spec.ts`

**What it tests**:
- TC-007: Day and slot selection
- TC-008: Attendee management
- TC-009: Attendee cleanup on navigation (WDA-911)
- TC-010: Optional email for additional attendees (WDA-910)
- TC-011: Form validation
- TC-012: Error message translations (WDA-912)

**When to run**: Every PR touching booking widget

---

### 3. Private Session Booking Tests
**File**: `tests/e2e-booking-private.spec.ts`
**Duration**: ~5 minutes
**Command**: `npx playwright test tests/e2e-booking-private.spec.ts`

**What it tests**:
- TC-013: Private session full capacity booking
- TC-013B: Private session pricing

**When to run**: When modifying private session logic

---

### 4. Voucher Purchase Tests
**File**: `tests/e2e-booking-voucher.spec.ts`
**Duration**: ~5 minutes
**Command**: `npx playwright test tests/e2e-booking-voucher.spec.ts`

**What it tests**:
- TC-014: Voucher purchase flow
- TC-014B: Voucher quantity limits
- TC-015: Voucher redemption (if implemented)

**When to run**: When modifying voucher functionality

---

### 5. Multi-Locale Tests
**File**: `tests/e2e-multi-locale.spec.ts`
**Duration**: ~15 minutes
**Command**: `npm run test:locale`

**What it tests**:
- TC-016: All locales (es, ca, en, fr)
- TC-002: GraphQL integration
- TC-WDA-963: Dynamic routes

**When to run**: When adding/modifying locales or translations

---

### 6. Error Handling Tests
**File**: `tests/e2e-error-handling.spec.ts`
**Duration**: ~8 minutes
**Command**: `npx playwright test tests/e2e-error-handling.spec.ts`

**What it tests**:
- TC-017: Slot fully booked error
- TC-018: Session timeout
- TC-019: Network error handling
- Edge cases (capacity limits, past dates, empty forms)

**When to run**: When modifying error handling logic

---

### 7. Cross-Browser & Mobile Tests
**File**: `tests/e2e-cross-browser.spec.ts`
**Duration**: ~10 minutes
**Command**: `npm run test:mobile`

**What it tests**:
- TC-021: Mobile responsiveness (iPhone, Android, iPad)
- TC-PERF-001: Page load performance
- TC-PERF-002: Calendar navigation performance

**When to run**: Before major releases, weekly regression

---

## Running Tests

### All Tests
```bash
npm test
```

Runs all test files across all browsers (Chrome, Firefox, Safari, Mobile)

---

### Specific Test File
```bash
npx playwright test tests/e2e-smoke.spec.ts
```

---

### Specific Test Case
```bash
npx playwright test tests/e2e-smoke.spec.ts -g "TC-001"
```

---

### With UI Mode (Interactive)
```bash
npm run test:ui
```

Best for debugging and exploring tests visually.

---

### With Headed Browser (See the browser)
```bash
npm run test:headed
```

---

### Debug Mode (Step through tests)
```bash
npm run test:debug
```

---

### Specific Browser
```bash
# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari only
npx playwright test --project=webkit

# Mobile Chrome
npx playwright test --project=mobile-chrome

# Mobile Safari (iPhone)
npx playwright test --project=mobile-safari
```

---

### Parallel Execution
```bash
# Run 4 workers in parallel
npx playwright test --workers=4
```

---

### Retry Failed Tests
```bash
# Retry failed tests 2 times
npx playwright test --retries=2
```

---

## Test Reports

### View HTML Report
```bash
npm run test:report
```

Opens interactive HTML report with:
- Test results
- Screenshots on failure
- Videos on failure
- Network logs
- Console logs

### Report Location
- **HTML**: `test-results/html/index.html`
- **JSON**: `test-results/results.json`
- **Artifacts**: `test-results/artifacts/`
- **Screenshots**: `test-results/*.png`

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
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps

      # Run smoke tests first
      - name: Smoke Tests
        run: npm run test:smoke

      # Run all tests if smoke passes
      - name: Full Test Suite
        run: npm test

      # Upload results
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

---

## Troubleshooting

### Tests Failing?

**1. Check if site is up**
```bash
curl -I https://sauwasauna.com
```

**2. Check GraphQL endpoint**
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'
```

**3. Run in headed mode to see what's happening**
```bash
npm run test:headed
```

**4. Check screenshots**
Failed tests generate screenshots in `test-results/artifacts/`

**5. Check videos**
Failed tests generate videos in `test-results/artifacts/`

---

### Common Issues

**Issue**: `Error: Browser not installed`
**Fix**: `npx playwright install chromium`

**Issue**: `Timeout waiting for .booking-widget`
**Fix**: Check if widget JavaScript is loading correctly

**Issue**: `ECONNREFUSED`
**Fix**: Check if site is accessible from test environment

**Issue**: `Element not found`
**Fix**: Selectors may have changed, update test selectors

**Issue**: `Tests flaky (sometimes pass, sometimes fail)`
**Fix**:
- Increase timeouts
- Add explicit waits
- Check for race conditions

---

## Test Data

### Test Sessions

| Session ID | Type | URL |
|------------|------|-----|
| 167 | single | `/es/hotel-coma-bella/jornadas-de-puertas-abiertas/` |
| 224 | single | `/test/booking-single/` |
| 226 | private | `/test/booking-private/` |
| 229 | voucher | `/test/booking-voucher/` |

### Test Locales
- `es` - Spanish (primary)
- `ca` - Catalan
- `en` - English
- `fr` - French

### Test Partner
- **Slug**: `hotel-coma-bella`
- **Name**: Hotel Coma Bella

---

## Best Practices

### 1. Run Smoke Tests First
Always run smoke tests before full suite to catch critical issues early.

### 2. Use UI Mode for Development
When writing new tests, use `npm run test:ui` for faster feedback.

### 3. Take Screenshots on Failure
Already configured in `playwright.config.ts`

### 4. Use Retries in CI
Set `retries: 2` in CI to handle flaky tests.

### 5. Keep Tests Independent
Each test should be able to run standalone.

### 6. Use Data Attributes
Prefer `[data-widget-type]` over class names for stability.

### 7. Wait for Network Idle
Use `waitUntil: 'networkidle'` for GraphQL-heavy pages.

---

## Test Coverage

### Session Types
- [x] Single session (standard booking)
- [x] Private session (full capacity)
- [x] Voucher session (gift vouchers)

### Locales
- [x] Spanish (es)
- [x] Catalan (ca)
- [x] English (en)
- [x] French (fr)

### Browsers
- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Mobile Chrome (Android)
- [x] Mobile Safari (iPhone)

### Critical Flows
- [x] Partner page load
- [x] Session detail page load
- [x] Calendar navigation
- [x] Slot selection
- [x] Attendee management
- [x] Form validation
- [x] Form submission
- [x] Error handling
- [x] Multi-locale support

---

## Success Metrics

### Smoke Tests
- **Target**: 100% pass rate
- **Duration**: < 5 minutes
- **Frequency**: Every commit

### Functional Tests
- **Target**: 95% pass rate
- **Duration**: < 20 minutes
- **Frequency**: Every PR

### Full Regression
- **Target**: 90% pass rate
- **Duration**: < 45 minutes
- **Frequency**: Weekly, before releases

---

## Maintenance

### When to Update Tests

**Add new test when**:
- New feature is added
- Bug is fixed (regression test)
- New locale is added
- New session type is added

**Update test when**:
- UI changes (selectors need updating)
- Behavior changes
- New error messages added
- GraphQL schema changes

**Remove test when**:
- Feature is deprecated
- Test is redundant
- Test is consistently flaky and unreliable

---

## Resources

### Documentation
- [Playwright Docs](https://playwright.dev)
- [Test Plan](tests/reports/E2E-TEST-PLAN-SAUWA-BOOKING.md)
- [SAUWA Documentation](../docs/)

### Related Issues
- WDA-910: Optional email for additional attendees
- WDA-911: Attendee cleanup on navigation
- WDA-912: Error message translations
- WDA-913: Attendee count structure
- WDA-963: Dynamic routes
- WDA-974: Session types
- WDA-986: GraphQL partner integration

---

## Support

### Need Help?
1. Check test report: `npm run test:report`
2. Run in debug mode: `npm run test:debug`
3. Check screenshots in `test-results/`
4. Review test plan: `tests/reports/E2E-TEST-PLAN-SAUWA-BOOKING.md`

### Reporting Issues
Include:
- Test file and test case name
- Error message
- Screenshots from `test-results/`
- Browser and OS
- Environment (local, CI)

---

**Last Updated**: 2025-12-07
**Version**: 1.0.0
