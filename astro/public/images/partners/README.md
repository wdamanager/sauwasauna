# Imágenes para Partners - WDA-320

## Imágenes necesarias

### 1. exclusive-hero.jpg
**Ubicación**: Hero de la página B2B
**Dimensiones recomendadas**: 1920x1080px (Full HD)
**Formato**: JPEG optimizado (< 300KB)
**Contenido**: Instalación SAUWA premium en hotel o glamping de lujo, entorno natural espectacular (montaña, lago), ambiente invernal con piscina exterior y sauna.
**Mood**: Exclusivo, premium, elegante, aspiracional

### 2. sauwa-premium-installation.jpg
**Ubicación**: Sección "El Valor Distintivo de SAUWA"
**Dimensiones recomendadas**: 1200x800px (landscape)
**Formato**: JPEG optimizado (< 250KB)
**Contenido**: Vista completa de instalación SAUWA en operación, clientes disfrutando, ambiente de lujo y confort, integración arquitectónica premium.
**Mood**: Experiencia única, calidad, bienestar de alto nivel

## Optimización recomendada

```bash
# Usando ImageMagick o herramientas similares
convert original.jpg -quality 85 -resize 1920x1080^ -gravity center -extent 1920x1080 exclusive-hero.jpg
convert original.jpg -quality 85 -resize 1200x800^ -gravity center -extent 1200x800 sauwa-premium-installation.jpg
```

## Ejemplos de contenido visual ideal

- Sauna de leña SAUWA en entorno alpino premium
- Clientes en bañadores entre sauna y piscina helada exterior
- Vista aérea de instalación integrada en hotel/glamping
- Detalle de acabados premium y detalles de calidad
- Ambiente nocturno con iluminación ambiental
- Contraste termal: calor de sauna + frío de agua/nieve

## Consideraciones

- **Target audience**: Hoteles 4-5*, glampings premium, propietarios/directores
- **Derechos de imagen**: Licencia para uso comercial B2B
- **Alt text**: Ya implementado en el código
- **Lazy loading**: Ya implementado
- **Responsive**: Adaptación automática mobile/desktop
