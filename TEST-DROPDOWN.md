# Quick Test Guide - Category Dropdown Fix

## Quick Manual Test (30 seconds)

1. **Open browser DevTools** (F12)
2. **Set mobile viewport**: 375x812 (iPhone X)
3. **Navigate to**: `http://localhost:4325/es/guia-sauwa-sauna/`
4. **Click dropdown button** (should say "Todas las categorías")
5. **Verify**: Dropdown list appears ABOVE all blog cards
6. **Select a category** and verify it filters posts

---

## Automated Test

```bash
# From project root
node test-dropdown-fix.js
```

**What it does:**
- Opens browser in mobile viewport
- Takes screenshots (before, during, after)
- Verifies z-index values
- Tests dropdown clickability
- Screenshots saved to `screenshots/` folder

---

## Expected Results

### BEFORE (Broken)
- Dropdown menu appears behind blog cards
- Can't click dropdown items
- Items are visually obscured

### AFTER (Fixed)
- Dropdown menu appears above all cards
- Dropdown items are fully clickable
- Clear visual separation from content below

---

## Keyboard Testing

1. **Tab** to dropdown button
2. **Enter** or **Space** to open
3. **Arrow Down/Up** to navigate items
4. **Enter** or **Space** to select
5. **Escape** to close

All should work smoothly!

---

## Mobile Testing Checklist

- [ ] Dropdown button visible and tappable (44x44px min)
- [ ] Dropdown opens on tap
- [ ] List appears ABOVE blog cards (no overlap)
- [ ] Can scroll through categories if many
- [ ] Selected category highlighted
- [ ] Tapping outside closes dropdown
- [ ] Filter works correctly
- [ ] URL updates with category parameter
- [ ] Back button restores previous category

---

## Troubleshooting

**Problem:** Dropdown still behind cards
**Solution:** Hard refresh browser (Ctrl+Shift+R)

**Problem:** JavaScript not working
**Solution:** Check browser console for errors

**Problem:** Dropdown not appearing
**Solution:** Verify WordPress has categories with posts

---

## Files to Review

- `astro/src/components/blog/CategoryDropdown.astro` - Main component
- `astro/src/components/blog/CategoryFilterExample.astro` - Container
- `test-dropdown-fix.js` - Test script
- `DROPDOWN-FIX-REPORT.md` - Full technical report
