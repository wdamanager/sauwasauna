# SauwaSauna - Dynamic Routes Audit Report

**Date**: 2025-12-07
**Author**: Claude Code
**Purpose**: Complete audit of dynamic content system before implementing changes

---

## 1. Executive Summary

### Current Architecture
SauwaSauna uses **Astro SSG (Static Site Generation)** with WordPress Headless as CMS. All dynamic routes are generated at **build time** using `getStaticPaths()`.

### Critical Finding
**There is a GraphQL 500 error** when querying the `partner` field inside `SessionDetails`. This blocks new builds but existing production pages work because they were generated before the plugin update on Dec 6, 2025.

### Key Points
- Production site at `sauwasauna.com` **works** (pre-built pages)
- Development/new builds **fail** due to GraphQL error
- Content is **NOT truly dynamic** - requires Astro rebuild to update

---

## 2. WordPress Backend (Production)

### Custom Post Types
| CPT | GraphQL Name | DB Count |
|-----|--------------|----------|
| `sauna_session` | `session` / `sessions` | 1 (ID: 167) |
| `sauwa_partner` | `partner` / `partners` | 1 (ID: 164) |

### ACF Field Groups
| Group | Target CPT | GraphQL Field Name |
|-------|------------|-------------------|
| Session Details | `sauna_session` | `sessionDetails` |
| Session Partner | `sauna_session` | `sessionPartner` |
| Partner Details | `sauwa_partner` | `partnerInformation` |

### GraphQL Schema (Production)

#### SessionDetails Fields
```graphql
type SessionDetails {
  sessionDuration: Float
  sessionCapacity: Float
  sessionPrice: Float
  sessionType: [String]              # NEW (WDA-974)
  usesSharedCapacity: Boolean        # NEW (WDA-974)
  includedPersons: Float             # NEW (WDA-974)
  requiresFullCapacity: Boolean      # NEW (WDA-974)
  voucherValidityMonths: Float       # NEW (WDA-974)
  baseSessionId: AcfContentNodeConnection  # NEW (WDA-974)
  subtitulo: String
  subtituloCa: String
  subtituloFr: String
  sessionSubtitleEn: String
  tituloCa: String
  tituloEn: String
  tituloFr: String
  sessionDescription: String
  sessionDescriptionCa: String
  sessionDescriptionEn: String
  sessionDescriptionFr: String
  partner: AcfContentNodeConnectionEdge    # BROKEN - causes 500
  saleEnabled: Boolean
}
```

#### Partner Fields
```graphql
type Partner {
  databaseId: Int!
  title: String
  slug: String
  partnerInformation: PartnerInformation
  featuredImage: MediaItem
}

type PartnerInformation {
  partnerAddress: String
  partnerPhone: String
  partnerEmail: String
  partnerWeb: String
  partnerActive: Boolean
  partnerHeroImage: MediaItem
}
```

---

## 3. GraphQL Queries Status

### Working Queries

```graphql
# Sessions list (basic)
{ sessions(first: 10) { nodes { databaseId slug title sessionDetails { sessionDuration sessionCapacity sessionPrice sessionType } } } }

# Partner direct query
{ partner(id: "164", idType: DATABASE_ID) { databaseId title slug partnerInformation { partnerAddress partnerPhone partnerEmail partnerWeb partnerHeroImage { node { sourceUrl } } } } }

# Partners list
{ partners(first: 10) { nodes { databaseId title slug } } }
```

### BROKEN Query (500 Error)

```graphql
# This causes "Internal server error: Value of type null is not callable"
{ sessions(first: 1) { nodes { sessionDetails { partner { node { ... on Partner { databaseId } } } } } } }
```

**Root Cause**: The `partner` field inside `sessionDetails` ACF group uses `post_object` type with broken GraphQL resolver.

---

## 4. Astro Frontend Routes

### Dynamic Route Files
```
src/pages/
├── [locale]/
│   ├── [partnerSlug]/
│   │   ├── index.astro              # Partner page
│   │   └── [sessionSlug]/
│   │       └── index.astro          # Session page
```

### Route Generation Flow

```
getStaticPaths()
    ↓
getAllSessions() [lib/sessions-queries.ts]
    ↓
GraphQL POST to backend.sauwasauna.com/graphql
    ↓
Transform data → Generate paths for 4 locales × N partners/sessions
```

### Generated URLs in Production
```
/es/hotel-coma-bella/                           # Partner page
/ca/hotel-coma-bella/
/en/hotel-coma-bella/
/fr/hotel-coma-bella/
/es/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/   # Session page
/ca/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/
/en/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/
/fr/hotel-coma-bella/jornadas-de-puertas-abiertas-sauwa/
```

---

## 5. Current Query in sessions-queries.ts

The current query in `src/lib/sessions-queries.ts` (lines 59-123) includes the broken `partner` field:

```typescript
export const GET_ALL_SESSIONS_QUERY = `
  query GetAllSessions {
    sessions(first: 1000, where: { status: PUBLISH }) {
      nodes {
        id
        databaseId
        slug
        title
        sessionDetails {
          sessionDuration
          sessionCapacity
          sessionPrice
          subtitulo
          // ... localized fields
          partner {                    // <-- BROKEN
            node {
              ... on Partner {
                id
                databaseId
                slug
                title
                partnerInformation {
                  partnerAddress
                  partnerPhone
                  // ...
                }
              }
            }
          }
        }
      }
    }
  }
`;
```

---

## 6. Data Flow Diagram

```
┌─────────────────┐     GraphQL      ┌─────────────────┐
│   WordPress     │ ←─────────────── │   Astro Build   │
│   Backend       │                  │   (SSG)         │
│                 │                  │                 │
│ - Sessions CPT  │     Query        │ getStaticPaths()│
│ - Partners CPT  │ ─────────────→   │        ↓        │
│ - ACF Fields    │                  │ Generate HTML   │
│ - WPGraphQL     │                  │        ↓        │
└─────────────────┘                  │ dist/ folder    │
                                     └─────────────────┘
                                             ↓
                                     ┌─────────────────┐
                                     │   Production    │
                                     │   (Static HTML) │
                                     │                 │
                                     │ sauwasauna.com  │
                                     └─────────────────┘
```

---

## 7. Workaround Strategy

### Option A: Fix WordPress Plugin (Recommended)
1. Modify ACF field configuration to fix GraphQL resolver
2. Or add custom GraphQL resolver for partner relationship

### Option B: Two-Query Pattern (Temporary)
1. Query sessions WITHOUT partner field
2. Use `session_partner` meta to get partner ID
3. Query partner separately by ID

```typescript
// Step 1: Get sessions
const sessions = await graphqlQuery(`{ sessions { nodes { databaseId slug } } }`);

// Step 2: Get partner IDs from postmeta
const partnerIds = await getPartnerIdsFromMeta(sessionIds);

// Step 3: Query partners directly
const partners = await graphqlQuery(`{ partners(where: {in: [${partnerIds}]}) { nodes { ... } } }`);

// Step 4: Join data
const enrichedSessions = joinSessionsWithPartners(sessions, partners);
```

---

## 8. New Fields Available (WDA-974)

The following fields are NOW available in production GraphQL but NOT yet used in frontend:

| Field | Type | Purpose |
|-------|------|---------|
| `sessionType` | `[String]` | `single`, `pack`, `voucher`, `private` |
| `usesSharedCapacity` | `Boolean` | Shares capacity with other sessions |
| `includedPersons` | `Float` | Number of persons/entries included |
| `requiresFullCapacity` | `Boolean` | For private sessions |
| `voucherValidityMonths` | `Float` | Voucher expiration |
| `baseSessionId` | `Connection` | Redemption target session |

---

## 9. Recommendations

### Immediate Actions
1. **Fix GraphQL partner field** - Either in WPGraphQL for ACF config or custom resolver
2. **Update sessions-queries.ts** - Add new session type fields
3. **Test build locally** - Ensure `npm run build` works

### Future Improvements
1. **Consider ISR** - Incremental Static Regeneration for faster updates
2. **Add API routes** - For truly dynamic content (availability, prices)
3. **Implement webhooks** - WordPress → Astro rebuild trigger

---

## 10. Test Sessions in Production

| Session ID | Type | Name |
|------------|------|------|
| 167 | `single` | Jornadas de puertas abiertas |
| 224 | `single` | Sesion Compartida E2E Test |
| 226 | `private` | Sesion Privada E2E Test |
| 229 | `voucher` | Bono Regalo E2E Test - 5 Entradas |

---

## Appendix: Verified GraphQL Queries

### Query 1: Sessions with new fields (WORKS)
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ sessions(first: 5) { nodes { databaseId slug title sessionDetails { sessionDuration sessionCapacity sessionPrice sessionType usesSharedCapacity includedPersons } } } }"}'
```

### Query 2: Partner direct (WORKS)
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ partner(id: \"164\", idType: DATABASE_ID) { databaseId title slug partnerInformation { partnerAddress partnerPhone partnerEmail partnerWeb partnerHeroImage { node { sourceUrl } } } featuredImage { node { sourceUrl } } } }"}'
```

### Query 3: Sessions with nested partner (BROKEN - 500)
```bash
curl -X POST https://backend.sauwasauna.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ sessions(first: 1) { nodes { sessionDetails { partner { node { databaseId } } } } } }"}'
# Returns: {"errors":[{"message":"Internal server error","extensions":{"debugMessage":"Value of type null is not callable"}}]}
```

---

**End of Audit Report**
