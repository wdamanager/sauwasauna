# Scripts Directory

## Overview

Utility scripts for auditing, testing, and maintaining the SAUWA project.

## Structure

```
scripts/
├── audit/          # Performance and quality audits
│   ├── mobile-audit.mjs
│   ├── complete-audit.mjs
│   ├── check-structure.mjs
│   └── verify-images.js
└── test/           # Testing utilities
    ├── graphql.js
    └── limit-3.js
```

## Usage

### Audit Scripts

```bash
# Run mobile audit
node scripts/audit/mobile-audit.mjs

# Complete site audit
node scripts/audit/complete-audit.mjs

# Check project structure
node scripts/audit/check-structure.mjs

# Verify images
node scripts/audit/verify-images.js
```

### Test Scripts

```bash
# Test GraphQL endpoint
node scripts/test/graphql.js

# Test with limit parameter
node scripts/test/limit-3.js
```

## Requirements

- Node.js 18+
- pnpm
- Project dependencies installed

---

*Last Updated: 2025-10-24*
