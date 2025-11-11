# Mobile Audit - Run Instructions

## Prerequisites
1. Dev server MUST be running at http://localhost:4322/es/
2. Playwright must be installed

## Run the Audit

```bash
# Make sure dev server is running in another terminal
npm run dev

# In a new terminal, run the audit
node audit-mobile.mjs
```

## What the Audit Does

1. **Takes Screenshots** (saved to project root):
   - `baseline-mobile-initial.png` - First viewport
   - `baseline-mobile-blog-section.png` - Blog section scroll
   - `baseline-mobile-button-X.png` - "Ver más" buttons
   - `baseline-mobile-fullpage.png` - Full mobile page
   - `baseline-desktop-fullpage.png` - Desktop comparison

2. **Measures Everything**:
   - Body vs viewport width (horizontal overflow check)
   - All elements wider than 375px
   - "Ver más" button dimensions and position
   - Category tag widths
   - Desktop layout validation

3. **Identifies Issues**:
   - HIGH: Horizontal overflow
   - HIGH: Button exceeds viewport
   - MEDIUM: Button too wide (>93% viewport)
   - MEDIUM: Category tags too wide
   - MEDIUM: Desktop overflow

4. **Generates Report**:
   - `mobile-audit-results.json` - Full detailed data
   - Console output with summary

## After Running

Review:
1. Screenshots for visual confirmation
2. JSON file for exact measurements
3. Console output for issue list

Then create surgical fix plan based on EVIDENCE.
