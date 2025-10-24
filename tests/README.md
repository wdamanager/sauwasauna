# Tests Directory

## Overview

Testing suite for the SAUWA Astro frontend.

## Structure

```
tests/
├── README.md                        # This file
├── reports/                         # Test reports and analysis
│   ├── MOBILE_*.md                 # Mobile testing reports
│   ├── VISUAL_*.md                 # Visual regression reports
│   ├── WDA-*.md                    # Task-specific test reports
│   └── BENEFITS_*.md               # Component-specific analysis
├── automated-inspection.spec.ts    # Playwright automated tests
├── visual-inspection.spec.ts       # Visual regression tests
├── test-benefits-blog.spec.ts      # Blog benefits component tests
├── test-mobile-blog.js             # Mobile blog testing script
└── verify-mobile-fixes.js          # Mobile fixes verification
```

## Running Tests

### Playwright Tests

```bash
# Run all Playwright tests
npx playwright test

# Run specific test file
npx playwright test tests/automated-inspection.spec.ts

# Run with UI mode
npx playwright test --ui

# Run with headed browser
npx playwright test --headed
```

### Manual Test Scripts

```bash
# Test mobile blog layout
node tests/test-mobile-blog.js

# Verify mobile fixes
node tests/verify-mobile-fixes.js
```

## Test Reports

All test reports and analysis documents are stored in `tests/reports/` for historical reference.

## Requirements

- Node.js 18+
- Playwright (install with `npx playwright install`)
- Project dependencies (`pnpm install`)

---

*Last Updated: 2025-10-24*
