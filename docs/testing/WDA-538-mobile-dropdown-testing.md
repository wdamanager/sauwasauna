# WDA-538: Mobile Dropdown Category Filter - Testing Plan

**Fecha**: 2025-11-09
**Componente**: `CategoryFilter.astro`
**Feature**: Dropdown móvil para categorías del blog
**Objetivo**: Validar funcionalidad dual (desktop carrusel + mobile dropdown)

---

## 1. Testing Overview

### Scope
- **Desktop (>= 768px)**: Mantener carrusel horizontal actual
- **Mobile (< 768px)**: Nuevo dropdown compacto
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Devices**: iPhone SE, iPhone 12, iPad, Desktop

### Success Criteria
- [ ] Carrusel visible en desktop, dropdown oculto
- [ ] Dropdown visible en mobile, carrusel oculto
- [ ] Sincronización estado entre desktop y mobile
- [ ] Touch targets mínimo 44px (WCAG 2.5.5)
- [ ] Keyboard navigation completa
- [ ] Close on outside click
- [ ] Smooth transitions
- [ ] No errores consola

---

## 2. Visual Testing

### Desktop (>= 768px)
**Verificar:**
- [ ] Carrusel horizontal visible
- [ ] Dropdown completamente oculto (display: none)
- [ ] Botones con hover effects
- [ ] Drag scroll funcional
- [ ] Active state en naranja (#DB4529)
- [ ] Touch targets > 44px

**Breakpoints a probar:**
- 768px (min-width threshold)
- 1024px (tablet landscape)
- 1440px (desktop)
- 1920px (wide screen)

### Mobile (< 768px)
**Verificar:**
- [ ] Dropdown visible
- [ ] Carrusel completamente oculto (display: none)
- [ ] Botón trigger con ancho completo
- [ ] Icono chevron rotación 180° al abrir
- [ ] Menu despliega hacia abajo
- [ ] Altura máxima 400px con scroll
- [ ] Espacio reducido al 50% vs desktop
- [ ] Touch targets > 44px

**Breakpoints a probar:**
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 414px (iPhone 12 Pro Max)
- 767px (max-width threshold)

---

## 3. Functional Testing

### Dropdown Interactions (Mobile)

#### A. Open/Close
**Test Case**: Click trigger abre/cierra dropdown
```
Steps:
1. Load blog page en mobile (< 768px)
2. Click botón "Todas las categorías"
3. Verificar dropdown abre
4. Click botón nuevamente
5. Verificar dropdown cierra

Expected:
- Dropdown slide down con opacity 0 → 1
- aria-expanded cambia a true/false
- Icono rota 180°
- Transición suave (300ms)
```

#### B. Select Category
**Test Case**: Seleccionar categoría filtra posts
```
Steps:
1. Abrir dropdown
2. Click en categoría "Bienestar"
3. Verificar dropdown cierra
4. Verificar texto trigger actualiza a "Bienestar"
5. Verificar posts filtrados

Expected:
- Dropdown cierra
- Texto trigger = "Bienestar" (sin contador)
- Opción activa con background naranja
- Evento 'blog:filter' dispatched
- BlogGrid filtra posts
```

#### C. Outside Click
**Test Case**: Click fuera cierra dropdown
```
Steps:
1. Abrir dropdown
2. Click en área fuera del dropdown
3. Verificar dropdown cierra

Expected:
- Dropdown cierra inmediatamente
- aria-expanded = false
- No se selecciona ninguna opción
```

#### D. Keyboard Navigation
**Test Case**: Navegar con teclado
```
Steps:
1. Tab al trigger button
2. Press Enter → dropdown abre
3. ArrowDown → focus primera opción
4. ArrowDown → focus segunda opción
5. ArrowUp → focus primera opción
6. Escape → dropdown cierra, focus trigger

Expected:
- Tab navigation fluida
- ArrowUp/Down navega opciones
- Home/End salta a primera/última
- Enter selecciona opción
- Escape cierra dropdown
- Focus visible con outline
```

---

## 4. Accessibility Testing

### WCAG 2.1 AA Compliance

#### A. Touch Targets
**Criterio 2.5.5**: Mínimo 44x44px
```
Verificar:
- [ ] Trigger button: min-height 44px
- [ ] Dropdown options: min-height 44px
- [ ] Espacio entre opciones adecuado
- [ ] No overlap en área touch

Test:
- Inspeccionar con DevTools
- Medir con ruler tool
- Probar con dedo en device real
```

#### B. Keyboard Navigation
**Criterio 2.1.1**: Keyboard accessible
```
Verificar:
- [ ] Tab accede a trigger
- [ ] Enter/Space abre dropdown
- [ ] ArrowDown/Up navega
- [ ] Escape cierra
- [ ] Enter selecciona
- [ ] No keyboard traps

Test:
- Navegar solo con teclado
- Sin mouse/touch
- Verificar focus visible
```

#### C. Screen Reader
**Criterio 4.1.2**: Name, Role, Value
```
Verificar:
- [ ] Trigger: role="button", aria-haspopup="listbox"
- [ ] Trigger: aria-expanded="true/false"
- [ ] Trigger: aria-label="Seleccionar categoría"
- [ ] Menu: role="listbox"
- [ ] Options: role="option", aria-selected
- [ ] Icon: aria-hidden="true"

Test:
- VoiceOver (Safari iOS)
- TalkBack (Android)
- NVDA (Windows)
- Anuncio de estados correctos
```

#### D. Color Contrast
**Criterio 1.4.3**: Mínimo 4.5:1
```
Verificar:
- [ ] Texto trigger: #1a1a1a sobre #ffffff
- [ ] Texto hover: #DB4529 sobre #ffffff
- [ ] Opción activa: #ffffff sobre #DB4529
- [ ] Border: #e5e5e5 suficientemente visible

Test:
- Chrome DevTools Color Picker
- WebAIM Contrast Checker
- Probar en modo alto contraste
```

---

## 5. Performance Testing

### Load Time
**Target**: < 50ms render time
```
Test:
1. Chrome DevTools Performance tab
2. Reload página
3. Measure component render
4. Verificar no layout shifts

Metrics:
- First Paint
- Layout Shift (CLS)
- JavaScript execution time
```

### Smooth Transitions
**Target**: 60fps durante animaciones
```
Test:
1. DevTools Performance > Record
2. Abrir/cerrar dropdown varias veces
3. Analizar frame rate
4. Verificar no janks

Expected:
- Transitions en 300ms
- No dropped frames
- GPU acceleration activa
```

---

## 6. Cross-Browser Testing

### Chrome (Desktop + Mobile)
```
Versions: Latest stable
Tests:
- [ ] Desktop carousel funcional
- [ ] Mobile dropdown funcional
- [ ] Drag scroll en desktop
- [ ] Touch events en mobile
- [ ] Transitions suaves
```

### Safari (iOS)
```
Devices: iPhone SE, iPhone 12, iPad
Tests:
- [ ] Dropdown abre/cierra
- [ ] Touch targets adecuados
- [ ] VoiceOver compatible
- [ ] No webkit quirks
- [ ] Smooth scrolling
```

### Firefox (Desktop + Android)
```
Versions: Latest stable
Tests:
- [ ] Desktop carousel
- [ ] Mobile dropdown
- [ ] Keyboard navigation
- [ ] CSS custom properties
- [ ] Transitions
```

### Edge (Desktop)
```
Version: Latest stable
Tests:
- [ ] Desktop carousel
- [ ] Drag functionality
- [ ] Accessibility tree
- [ ] Performance
```

---

## 7. Responsive Testing

### Breakpoint Transitions
**Critical**: 768px threshold
```
Test:
1. DevTools Responsive Mode
2. Start at 767px (mobile)
3. Verificar dropdown visible
4. Resize a 768px (desktop)
5. Verificar carrusel visible
6. Resize back a 767px
7. Verificar dropdown visible

Expected:
- Swap instantáneo entre layouts
- Estado activo preservado
- No errores consola
- No layout flash
```

### Viewport Sizes
```
Test cada viewport:

320px (iPhone SE):
- [ ] Dropdown full width
- [ ] Touch targets > 44px
- [ ] Texto no truncado
- [ ] Font-size readable

375px (iPhone 12):
- [ ] Layout óptimo
- [ ] Spacing apropiado
- [ ] Iconos correctos

414px (iPhone Pro Max):
- [ ] No espacio vacío
- [ ] Alineación correcta

767px (Max mobile):
- [ ] Dropdown visible
- [ ] Preparado para swap

768px (Min desktop):
- [ ] Carrusel visible
- [ ] Botones alineados
```

---

## 8. Integration Testing

### BlogGrid Sync
**Test**: Filtro sincroniza con BlogGrid
```
Steps:
1. Mobile: Seleccionar "Bienestar"
2. Verificar posts filtrados
3. Desktop: Verificar botón "Bienestar" activo
4. Desktop: Click "Salud"
5. Verificar posts filtrados
6. Mobile: Verificar dropdown muestra "Salud"

Expected:
- Estado sincronizado entre desktop/mobile
- Evento 'blog:filter' dispatched correctamente
- BlogGrid responde a evento
- URL params actualizados (si aplica)
```

### URL Parameters
**Test**: Category en URL se refleja en filtro
```
Steps:
1. Navigate to /blog?category=bienestar
2. Desktop: Verificar botón "Bienestar" activo
3. Mobile: Verificar dropdown muestra "Bienestar"

Expected:
- Init code detecta URL param
- Activa categoría correspondiente
- Dispatch evento inicial
- Posts filtrados en load
```

---

## 9. Edge Cases

### A. Empty Categories
**Test**: Categorías sin posts
```
Scenario: Category count = 0
Expected:
- Opción visible en dropdown
- Count (0) mostrado
- Seleccionable
- No crashes
```

### B. Long Category Names
**Test**: Nombres largos
```
Scenario: "Salud Mental y Bienestar Integral"
Expected:
- Texto no overflow
- Ellipsis si necesario
- Touch target mantiene 44px
- Readable en 320px
```

### C. Many Categories
**Test**: > 10 categorías
```
Expected:
- Dropdown max-height 400px
- Scroll vertical funcional
- Performance ok
- Todas accesibles
```

### D. Rapid Clicks
**Test**: Click rápido trigger
```
Steps:
1. Click trigger 5 veces rápido
Expected:
- No state corruption
- Open/close toggle correcto
- No memory leaks
- No console errors
```

---

## 10. Automated Tests (Playwright)

### Test Suite: Mobile Dropdown
```typescript
// tests/blog/category-filter-mobile.spec.ts

import { test, expect } from '@playwright/test';

test.describe('CategoryFilter Mobile Dropdown', () => {

  test('shows dropdown on mobile, hides on desktop', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');

    const dropdown = page.locator('.filter-dropdown');
    const carousel = page.locator('.filter-wrapper--desktop');

    await expect(dropdown).toBeVisible();
    await expect(carousel).toBeHidden();

    // Desktop viewport
    await page.setViewportSize({ width: 1024, height: 768 });

    await expect(dropdown).toBeHidden();
    await expect(carousel).toBeVisible();
  });

  test('opens dropdown on click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');

    const trigger = page.locator('.dropdown-trigger');
    const menu = page.locator('.dropdown-menu');

    await trigger.click();

    await expect(menu).toHaveClass(/open/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  test('selects category and filters posts', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');

    // Open dropdown
    await page.locator('.dropdown-trigger').click();

    // Select category
    await page.locator('.dropdown-option[data-category="bienestar"]').click();

    // Verify trigger text updated
    const triggerText = await page.locator('.dropdown-trigger__text').textContent();
    expect(triggerText).toContain('Bienestar');

    // Verify menu closed
    await expect(page.locator('.dropdown-menu')).not.toHaveClass(/open/);
  });

  test('closes on outside click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');

    // Open dropdown
    await page.locator('.dropdown-trigger').click();
    await expect(page.locator('.dropdown-menu')).toHaveClass(/open/);

    // Click outside
    await page.locator('body').click({ position: { x: 10, y: 10 } });

    // Verify closed
    await expect(page.locator('.dropdown-menu')).not.toHaveClass(/open/);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');

    const trigger = page.locator('.dropdown-trigger');

    // Focus trigger
    await trigger.focus();

    // Open with Enter
    await page.keyboard.press('Enter');
    await expect(page.locator('.dropdown-menu')).toHaveClass(/open/);

    // Navigate with ArrowDown
    await page.keyboard.press('ArrowDown');

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(page.locator('.dropdown-menu')).not.toHaveClass(/open/);
  });

  test('has proper touch targets', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog');

    // Check trigger height
    const triggerBox = await page.locator('.dropdown-trigger').boundingBox();
    expect(triggerBox?.height).toBeGreaterThanOrEqual(44);

    // Open dropdown
    await page.locator('.dropdown-trigger').click();

    // Check option heights
    const options = page.locator('.dropdown-option');
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const box = await options.nth(i).boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
});
```

---

## 11. Manual Testing Checklist

### Pre-Deployment Checklist
**Before merge to main:**

- [ ] Desktop carousel funcional (>= 768px)
- [ ] Mobile dropdown funcional (< 768px)
- [ ] Touch targets > 44px verified
- [ ] Keyboard navigation completa
- [ ] Screen reader compatible
- [ ] Close on outside click works
- [ ] Smooth transitions (300ms)
- [ ] No console errors
- [ ] Color contrast WCAG AA
- [ ] Cross-browser tested (Chrome, Safari, Firefox)
- [ ] Mobile devices tested (iPhone, Android)
- [ ] Playwright tests passing
- [ ] Performance < 50ms render
- [ ] Espacio reducido 50% en mobile
- [ ] Sincronización desktop/mobile state
- [ ] URL params respected

---

## 12. Known Issues & Limitations

### Current Limitations
1. **Max dropdown height**: 400px (scroll si más categorías)
2. **Mobile only**: < 768px (no tablet modes)
3. **Single selection**: Solo una categoría activa
4. **No search**: Dropdown sin filtro búsqueda

### Future Enhancements
- [ ] Multi-select categories
- [ ] Search filter en dropdown
- [ ] Tablet-specific layout (768-1024px)
- [ ] Animations más elaboradas
- [ ] Persistent state (localStorage)

---

## 13. Rollback Plan

### Si hay problemas en producción:

**Opción A: Revert commit**
```bash
git revert <commit-hash>
git push origin main
```

**Opción B: Feature flag**
```typescript
// Temporary: Show carousel on mobile
.filter-wrapper--desktop {
  display: flex !important;
}
.filter-dropdown {
  display: none !important;
}
```

**Opción C: Hotfix**
```typescript
// Fix specific issue without full revert
// Document in CHANGELOG.md
```

---

## Testing Sign-Off

**Tested by**: _________________
**Date**: _________________
**Browser/Device**: _________________
**Result**: Pass / Fail
**Notes**: _________________

---

**Document Version**: 1.0
**Last Updated**: 2025-11-09
**WDA Ticket**: WDA-538
