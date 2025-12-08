# E2E Test Plan: SAUWA Booking Integration

**Version**: 1.0.0
**Created**: 2025-12-07
**Status**: Ready for Implementation
**Related Issues**: WDA-963, WDA-974, WDA-986

---

## Executive Summary

This document outlines the comprehensive End-to-End (E2E) testing strategy for the SAUWA booking system, covering all session types, dynamic routes, and critical user flows across multiple locales.

**System Architecture**:
- **Frontend**: Astro SSG at sauwasauna.com
- **Backend**: WordPress Headless at backend.sauwasauna.com
- **Plugin**: sauwa-sauna-booking
- **Test Framework**: Playwright

---

## Test Objectives

### Primary Goals
1. Validate all booking flows work end-to-end
2. Ensure dynamic routes render correctly for all locales
3. Verify GraphQL integration between Astro and WordPress
4. Confirm session type-specific behaviors (single, private, voucher)
5. Test critical user journeys without regressions

### Quality Metrics
- **Coverage**: All 3 session types, 4 locales, 5+ critical paths
- **Performance**: Page load < 3s, widget interaction < 500ms
- **Stability**: 100% pass rate on smoke tests, 95%+ on full suite
- **Cross-browser**: Chrome, Firefox, Safari, Mobile

---

## Test Scope

### In Scope

#### 1. Dynamic Routes (WDA-963, WDA-986)
- Partner pages: `/[locale]/[partnerSlug]/`
- Session detail pages: `/[locale]/[partnerSlug]/[sessionSlug]/`
- Locale variations: es, ca, en, fr
- GraphQL data loading and rendering

#### 2. Session Types (WDA-974)
| Type | ID | Behavior | Test Coverage |
|------|----|-----------|----|
| **single** | 224 | Standard booking with quantity selector | Full flow + edge cases |
| **private** | 226 | Private session, full capacity booking | Full flow + validation |
| **voucher** | 229 | Gift voucher, no calendar, code generation | Purchase + redemption |

#### 3. Booking Widget Features
- Calendar navigation (prev/next month)
- Slot selection and availability display
- Attendee management (add/remove)
- Form validation (required fields, email format)
- Payment integration (if applicable)
- Confirmation flow

#### 4. User Journeys
- First-time visitor booking flow
- Multi-attendee booking
- Voucher purchase and redemption
- Booking cancellation/modification (if available)
- Error handling and recovery

### Out of Scope
- WordPress admin panel testing (separate WP_UnitTestCase suite)
- Payment gateway integration (mocked in tests)
- Email delivery verification (separate integration tests)
- Performance/load testing (separate artillery.io suite)

---

## Test Environment

### Test Data

#### Live Test Sessions
| Session ID | Type | Name | Partner | Status |
|------------|------|------|---------|--------|
| 167 | single | Jornadas de puertas abiertas | hotel-coma-bella | Production |
| 224 | single | Sesion Compartida E2E Test | TBD | Test |
| 226 | private | Sesion Privada E2E Test | TBD | Test |
| 229 | voucher | Bono Regalo E2E Test - 5 Entradas | TBD | Test |

#### Test Partners
- **hotel-coma-bella** (Primary test partner)
- Multiple sessions with different configurations

#### Test Pages
- `/test/booking-single/` - Single session test page
- `/test/booking-private/` - Private session test page
- `/test/booking-voucher/` - Voucher session test page

### Infrastructure
- **Base URL**: https://sauwasauna.com
- **Backend API**: https://backend.sauwasauna.com/graphql
- **Test Framework**: Playwright 1.49.0+
- **Browsers**: Chromium, Firefox, WebKit, Mobile (Chrome, Safari)

---

## Test Strategy

### Test Levels

#### 1. Smoke Tests (Critical Path - Run First)
**Frequency**: Every commit
**Duration**: ~5 minutes
**Coverage**:
- Home page loads
- Partner page renders with sessions list
- Single session detail page loads
- Booking widget initializes
- GraphQL endpoint responds

#### 2. Functional Tests (Feature Validation)
**Frequency**: Every PR
**Duration**: ~15 minutes
**Coverage**:
- All session types (single, private, voucher)
- Calendar navigation and slot selection
- Attendee management
- Form validation
- Booking submission

#### 3. Integration Tests (End-to-End Flows)
**Frequency**: Nightly
**Duration**: ~30 minutes
**Coverage**:
- Complete booking journeys
- Multi-step workflows
- Cross-page navigation
- Error handling and recovery
- Multi-locale support

#### 4. Regression Tests (Prevent Breakage)
**Frequency**: Weekly
**Duration**: ~45 minutes
**Coverage**:
- Previously fixed bugs (WDA-910, WDA-911, WDA-912, WDA-913)
- Known edge cases
- Browser compatibility
- Mobile responsiveness

### Test Prioritization

**P0 (Blocker)**: Must pass for release
- Booking widget renders
- Calendar displays available slots
- Form submission works
- GraphQL data loads

**P1 (Critical)**: Should pass for release
- All session types functional
- Multi-locale support
- Attendee management
- Error messages display correctly

**P2 (Important)**: Nice to have
- Performance benchmarks
- Accessibility checks
- Visual regression
- Mobile UX

**P3 (Low)**: Best effort
- Edge browser support
- Older mobile devices
- Slow network simulation

---

## Test Cases

### 1. Partner Pages (WDA-986)

#### TC-001: Partner Page Load
**Priority**: P0
**Locale**: es, ca, en, fr
**Steps**:
1. Navigate to `/[locale]/hotel-coma-bella/`
2. Verify page loads without errors
3. Verify partner name displays
4. Verify sessions list renders
5. Verify session cards have correct data

**Expected Result**:
- Page loads in < 3s
- Partner info from GraphQL displays correctly
- All sessions for partner are listed
- Each session shows: title, type, price, image

**Test Data**: Partner "hotel-coma-bella" with sessions 167, 224, 226, 229

---

#### TC-002: Session List GraphQL Integration
**Priority**: P0
**Steps**:
1. Navigate to partner page
2. Inspect network tab for GraphQL request
3. Verify query returns sessions array
4. Verify each session has required fields

**Expected Result**:
- GraphQL query executes successfully
- Response contains sessions with: id, title, slug, sessionType, price
- Data matches WordPress backend

---

### 2. Session Detail Pages (WDA-963, WDA-974)

#### TC-003: Single Session Detail Page
**Priority**: P0
**Session**: ID 224 (single)
**Steps**:
1. Navigate to `/es/[partner]/sesion-compartida-e2e-test/`
2. Verify session title displays
3. Verify session description renders
4. Verify booking widget loads
5. Verify session type badge shows "single"

**Expected Result**:
- Page renders in < 2s
- All session metadata displays
- Booking widget initializes with calendar
- Session type is correctly identified

---

#### TC-004: Private Session Detail Page
**Priority**: P0
**Session**: ID 226 (private)
**Steps**:
1. Navigate to private session detail page
2. Verify "Private Session" indicator displays
3. Verify booking widget shows full capacity option
4. Verify quantity selector is disabled (full capacity only)

**Expected Result**:
- Private session UI differs from single session
- Attendee count is fixed to session capacity
- "Book entire session" messaging displays

---

#### TC-005: Voucher Session Detail Page
**Priority**: P0
**Session**: ID 229 (voucher)
**Steps**:
1. Navigate to voucher session detail page
2. Verify calendar is NOT displayed
3. Verify quantity selector for voucher count
4. Verify "Gift Voucher" badge displays
5. Verify purchase button (not "Book")

**Expected Result**:
- No calendar component renders
- Quantity selector shows number of vouchers
- Different CTA: "Purchase Voucher" vs "Book Now"
- No date/time selection required

---

### 3. Booking Widget - Single Session (WDA-974)

#### TC-006: Calendar Navigation
**Priority**: P0
**Steps**:
1. Load single session page
2. Click "Next Month" arrow
3. Verify calendar updates to next month
4. Click "Previous Month" arrow
5. Verify calendar returns to previous month
6. Verify month/year label updates correctly

**Expected Result**:
- Calendar updates without page reload
- Available/unavailable days render correctly
- No flickering or layout shift
- Month navigation is smooth (< 300ms)

---

#### TC-007: Day and Slot Selection
**Priority**: P0
**Steps**:
1. Load calendar view
2. Click on an available day (green)
3. Verify time slots panel displays
4. Click on an available time slot
5. Verify booking form displays
6. Verify selected date/time persists in form

**Expected Result**:
- Time slots load for selected day
- Disabled slots are clearly marked
- Selected slot is highlighted
- Form pre-fills with date/time
- Capacity information is accurate

---

#### TC-008: Attendee Management (WDA-911, WDA-913)
**Priority**: P1
**Steps**:
1. Select date and time slot
2. Verify initial attendee count is 1
3. Click "Add Attendee" button
4. Verify attendee count increments
5. Add 2 more attendees (total: 4)
6. Verify counter shows "4/[max]"
7. Click "Remove" on one attendee
8. Verify count decrements to 3
9. Verify form fields adjust accordingly

**Expected Result**:
- Attendee counter is always accurate
- Add button disables at capacity limit
- Remove button removes correct attendee
- Form validation updates with attendee count

---

#### TC-009: Attendee Cleanup on Navigation (WDA-911)
**Priority**: P1
**Regression Test**: Yes
**Steps**:
1. Select a time slot
2. Add 3 attendees (total: 4)
3. Verify counter shows 4
4. Click "Back to slots" button
5. Select a different time slot
6. Verify attendee count resets to 1
7. Verify only 1 attendee row displays

**Expected Result**:
- Attendee state clears on navigation back
- Counter resets to 1/[max]
- No ghost attendee fields remain
- Form is clean for new selection

**Bug Reference**: WDA-911 (previously failing)

---

#### TC-010: Optional Email for Additional Attendees (WDA-910)
**Priority**: P1
**Regression Test**: Yes
**Steps**:
1. Select slot and add 2 attendees (total: 3)
2. Fill main contact email (attendee 0)
3. Inspect email field for attendee 1
4. Verify `required` attribute is absent
5. Inspect email field for attendee 2
6. Verify `required` attribute is absent
7. Submit form with only main contact email

**Expected Result**:
- Main contact email is required
- Additional attendee emails are optional
- Form submits successfully with partial emails
- No validation errors for missing optional emails

**Bug Reference**: WDA-910 (previously failing)

---

#### TC-011: Form Validation
**Priority**: P1
**Steps**:
1. Select date and time slot
2. Leave all fields empty
3. Click "Book Now" button
4. Verify validation errors display
5. Fill only name field
6. Verify email validation error persists
7. Fill invalid email format
8. Verify email format error displays
9. Fill all required fields correctly
10. Verify form submits successfully

**Expected Result**:
- Required field errors show on submit
- Email format is validated
- Error messages are in correct locale
- Errors clear when fields are corrected
- Submit button disables during submission

---

#### TC-012: Error Message Translations (WDA-912)
**Priority**: P1
**Regression Test**: Yes
**Locales**: es, ca, en, fr
**Steps**:
1. Load booking widget
2. Extract `data-translations` attribute
3. Verify all error keys exist:
   - errorSpotsLimit
   - errorSlotFull
   - errorSlotClosed
   - errorInvalidDate
   - errorSessionExpired
   - errorGeneric
4. Verify messages are in correct locale
5. Trigger each error scenario
6. Verify translated message displays

**Expected Result**:
- All error keys are present in translations object
- Messages match selected locale
- Errors display correctly in UI
- No "undefined" or missing translation keys

**Bug Reference**: WDA-912 (previously failing)

---

### 4. Booking Widget - Private Session

#### TC-013: Private Session Booking
**Priority**: P0
**Session**: ID 226 (private)
**Steps**:
1. Navigate to private session page
2. Select available date and time
3. Verify attendee count equals session capacity
4. Verify quantity selector is disabled
5. Fill contact information
6. Submit booking
7. Verify confirmation displays full capacity booking

**Expected Result**:
- Attendee count is fixed to capacity
- Cannot adjust quantity
- Price reflects full capacity
- Booking confirmation shows all spots reserved

---

### 5. Voucher Purchase Flow

#### TC-014: Voucher Purchase
**Priority**: P0
**Session**: ID 229 (voucher)
**Steps**:
1. Navigate to voucher session page
2. Verify no calendar displays
3. Select voucher quantity (e.g., 3 vouchers)
4. Verify total price updates (quantity × unit price)
5. Fill purchaser information
6. Submit voucher purchase
7. Verify confirmation page shows voucher codes

**Expected Result**:
- No date/time selection required
- Quantity selector works (min: 1, max: configurable)
- Price calculation is correct
- Voucher codes are generated on confirmation
- Codes are unique and valid

---

#### TC-015: Voucher Redemption (if implemented)
**Priority**: P2
**Steps**:
1. Obtain valid voucher code from TC-014
2. Navigate to single session booking
3. Enter voucher code in redemption field
4. Verify discount/free booking is applied
5. Complete booking with voucher
6. Verify voucher is marked as used

**Expected Result**:
- Voucher code is validated
- Invalid codes show error message
- Valid codes apply correct discount
- Used vouchers cannot be redeemed again

---

### 6. Multi-Locale Support

#### TC-016: Locale Switching
**Priority**: P1
**Locales**: es, ca, en, fr
**Steps**:
For each locale:
1. Navigate to `/[locale]/hotel-coma-bella/`
2. Verify page content is in correct language
3. Verify booking widget UI is translated
4. Verify error messages are in locale
5. Switch to different locale
6. Verify content updates

**Expected Result**:
- All UI elements are translated
- Date/time formats match locale
- Error messages use correct locale
- No mixed language content
- Locale persists across navigation

---

### 7. Error Handling

#### TC-017: Slot Fully Booked Error
**Priority**: P1
**Steps**:
1. Identify a slot nearing capacity
2. Open slot in two browser windows
3. In window 1, book remaining spots
4. In window 2, attempt to book same slot
5. Verify "Slot Full" error displays
6. Verify error message is translated

**Expected Result**:
- Error message: "Este horario está completo" (es)
- Booking is prevented
- User is redirected to slot selection
- Available capacity is refreshed

---

#### TC-018: Session Expired Error
**Priority**: P2
**Steps**:
1. Select a slot and navigate to form
2. Wait for session timeout (if configurable, else mock)
3. Submit booking after timeout
4. Verify "Session Expired" error displays
5. Verify user is redirected to calendar

**Expected Result**:
- Session timeout is enforced
- Error message is clear
- User can restart booking flow
- No partial bookings are created

---

#### TC-019: Network Error Handling
**Priority**: P2
**Steps**:
1. Start booking flow
2. Disable network (DevTools offline mode)
3. Attempt to submit booking
4. Verify graceful error message
5. Re-enable network
6. Verify retry functionality works

**Expected Result**:
- User-friendly network error message
- No form data is lost
- Retry mechanism exists
- Error state is clearable

---

### 8. Cross-Browser Compatibility

#### TC-020: Browser Compatibility
**Priority**: P2
**Browsers**: Chrome, Firefox, Safari, Edge
**Steps**:
For each browser:
1. Run smoke tests (TC-001 to TC-005)
2. Run single session booking flow (TC-006 to TC-011)
3. Verify UI renders correctly
4. Verify JavaScript functionality works
5. Verify form submission succeeds

**Expected Result**:
- All browsers display identical UI
- No browser-specific bugs
- Form submissions work in all browsers
- Date pickers are functional

---

### 9. Mobile Responsiveness

#### TC-021: Mobile Booking Flow
**Priority**: P1
**Devices**: iPhone 12, Pixel 5
**Steps**:
1. Open session page on mobile
2. Verify booking widget is responsive
3. Verify calendar is usable (tap targets ≥ 44px)
4. Select date and time slot
5. Fill form on mobile keyboard
6. Submit booking
7. Verify confirmation displays correctly

**Expected Result**:
- Widget adapts to mobile viewport
- No horizontal scrolling required
- Touch interactions are smooth
- Form inputs are mobile-friendly
- Keyboard doesn't break layout

---

## Test Execution

### Test Runs

#### Smoke Test Run
**Trigger**: Every commit
**Duration**: ~5 minutes
**Command**:
```bash
npx playwright test tests/e2e-smoke.spec.ts
```

**Tests**: TC-001, TC-003, TC-004, TC-005, TC-006

---

#### Functional Test Run
**Trigger**: Every PR
**Duration**: ~15 minutes
**Command**:
```bash
npx playwright test tests/e2e-booking-*.spec.ts
```

**Tests**: TC-001 to TC-015

---

#### Full Regression Run
**Trigger**: Weekly, before release
**Duration**: ~45 minutes
**Command**:
```bash
npx playwright test
```

**Tests**: All test cases (TC-001 to TC-021)

---

### Test Reports

#### Report Location
- **HTML Report**: `test-results/html/index.html`
- **JSON Report**: `test-results/results.json`
- **Screenshots**: `test-results/artifacts/`
- **Videos**: `test-results/artifacts/` (on failure)

#### CI/CD Integration
```yaml
# .github/workflows/e2e-tests.yml
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
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

---

## Success Criteria

### Smoke Tests
- **Target**: 100% pass rate
- **Blocker**: Any P0 test failure blocks deployment

### Functional Tests
- **Target**: 95% pass rate
- **Threshold**: No more than 1 P1 test failure

### Regression Tests
- **Target**: 90% pass rate
- **Threshold**: No previously fixed bugs regress

### Performance
- **Page Load**: < 3 seconds
- **Widget Interaction**: < 500ms
- **Form Submission**: < 2 seconds

### Coverage
- **Session Types**: 100% (single, private, voucher)
- **Locales**: 100% (es, ca, en, fr)
- **Critical Paths**: 100%

---

## Risk Assessment

### High Risk
- **GraphQL API Availability**: Backend down = all tests fail
  - **Mitigation**: Mock GraphQL responses for critical tests

- **Test Data Instability**: Sessions deleted/modified in production
  - **Mitigation**: Use dedicated test sessions (224, 226, 229)

### Medium Risk
- **Browser Compatibility**: Safari WebKit quirks
  - **Mitigation**: Dedicated Safari test runs

- **Flaky Tests**: Network timeouts, race conditions
  - **Mitigation**: Retry mechanism (2 retries in CI)

### Low Risk
- **Locale Translation Missing**: New locales added
  - **Mitigation**: Locale validation test

---

## Maintenance

### Test Updates Required When:
1. New session type is added → Add TC-0XX for new type
2. Booking flow changes → Update affected test cases
3. New locale is added → Update TC-016 with new locale
4. Bug is fixed → Add regression test to prevent recurrence

### Test Review Schedule
- **Weekly**: Review flaky tests, update test data
- **Monthly**: Review coverage, add missing scenarios
- **Quarterly**: Full test suite optimization

---

## Appendix

### Test Data Matrix

| Session ID | Type | Partner | URL Pattern | Test Cases |
|------------|------|---------|-------------|-----------|
| 167 | single | hotel-coma-bella | `/es/hotel-coma-bella/jornadas-de-puertas-abiertas/` | TC-001, TC-002, TC-003 |
| 224 | single | TBD | `/es/[partner]/sesion-compartida-e2e-test/` | TC-003, TC-006-TC-012 |
| 226 | private | TBD | `/es/[partner]/sesion-privada-e2e-test/` | TC-004, TC-013 |
| 229 | voucher | TBD | `/es/[partner]/bono-regalo-e2e-test/` | TC-005, TC-014, TC-015 |

### GraphQL Queries Used

```graphql
# Partner Sessions Query (WDA-986)
query GetPartnerSessions($partnerSlug: String!) {
  partner(slug: $partnerSlug) {
    id
    name
    slug
    sessions {
      id
      title
      slug
      sessionType
      price
      capacity
      featuredImage {
        sourceUrl
      }
    }
  }
}
```

### Test Environment URLs
- **Production**: https://sauwasauna.com
- **Staging**: https://staging.sauwasauna.com (if available)
- **Backend GraphQL**: https://backend.sauwasauna.com/graphql

---

**Document Version**: 1.0.0
**Last Updated**: 2025-12-07
**Next Review**: 2026-01-07
