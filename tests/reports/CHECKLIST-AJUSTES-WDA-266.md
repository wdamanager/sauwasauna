# Checklist de Ajustes - WDA-266
## Sección Beneficios + Blog

---

## 🔴 CRÍTICOS (Bloquean Producción)

Ninguno ✅

---

## 🟡 IMPORTANTES (Hacer esta semana)

### 1. Color de Iconos Beneficios
- **Status**: ⚠️ PENDIENTE
- **Archivo**: `src/components/BenefitsList.astro`
- **Línea**: ~273
- **Problema**: Iconos aparecen blancos, deben ser #DB4529
- **Solución**:
  ```css
  .benefit-icon svg {
    width: 24px;
    height: 24px;
    color: #DB4529; /* ← Añadir esta línea */
  }
  ```
- **Tiempo**: 5 min
- **Impacto**: Medio

---

## 🟢 MEJORAS (Opcional - próxima sprint)

### 2. Ajustar Sticky Top (si hay header)
- **Status**: ⏸️ EVALUAR PRIMERO
- **Archivo**: `src/components/BenefitsBlogSection.astro`
- **Línea**: ~61
- **Pregunta**: ¿Hay header sticky en la landing?
- **Si SÍ**:
  ```css
  .sticky-content {
    position: sticky;
    top: 80px; /* Altura del header */
    height: calc(100vh - 80px);
  }
  ```
- **Si NO**: Marcar como innecesario
- **Tiempo**: 10 min
- **Impacto**: Bajo

### 3. Reducir Gap Mobile
- **Status**: 💡 OPCIONAL
- **Archivo**: `src/components/BlogScrollCards.astro`
- **Línea**: ~245
- **Cambio**:
  ```css
  @media (max-width: 768px) {
    .blog-scroll-container {
      gap: 1.5rem; /* Reducir de 2rem */
    }
  }
  ```
- **Tiempo**: 5 min
- **Impacto**: Bajo

---

## 💡 NICE TO HAVE (Backlog futuro)

### UX Enhancements
- [ ] Scroll progress indicator (30 min)
- [ ] "Leer más" buttons en cards (20 min)
- [ ] Related posts en páginas individuales (2h)

### Performance
- [ ] Image blur-up placeholders (45 min)
- [ ] Skeleton loaders (1h)
- [ ] GraphQL cache cliente (30 min)
- [ ] Virtual scrolling si >10 posts (3h)

### Accessibility
- [ ] Mejorar aria-labels (15 min)
- [ ] Skip links (20 min)
- [ ] Keyboard navigation (1h)
- [ ] Screen reader announcements (30 min)

---

## ✅ VERIFICADO (No requiere cambios)

- ✅ Sticky scroll funciona en desktop
- ✅ Layout responsivo (tablet/mobile)
- ✅ 6 blog cards cargan desde GraphQL
- ✅ 5 beneficios se muestran correctamente
- ✅ Animaciones Intersection Observer
- ✅ Colores #DB4529 (rojo) y #406E51 (verde)
- ✅ Hover effects en cards
- ✅ Lazy loading de imágenes
- ✅ Accessibility markup correcto
- ✅ Excerpts limpios (sin HTML)
- ✅ Fechas localizadas en español
- ✅ Links funcionan correctamente
- ✅ Prefers-reduced-motion respetado
- ✅ Print styles funcionan

---

## 📊 Resumen

| Prioridad | Tareas | Tiempo Total |
|-----------|--------|--------------|
| 🔴 Críticas | 0 | 0 min |
| 🟡 Importantes | 1 | 5 min |
| 🟢 Mejoras | 2 | 15 min |
| 💡 Nice to Have | 11 | ~9h |

**Recomendación**: Aprobar para producción tras corregir el ajuste importante (5 min).

---

**Última actualización**: 2025-10-20
