# Imágenes para Careers - WDA-315

## Imágenes necesarias

### 1. sauna-master-hero.jpg
**Ubicación**: Hero de la página
**Dimensiones recomendadas**: 1920x1080px (Full HD)
**Formato**: JPEG optimizado (< 300KB)
**Contenido**: Sauna Master profesional realizando ceremonia Aufguss con toallas, ambiente de vapor, entorno natural o de sauna premium.
**Mood**: Profesional, dinámico, experto en acción

### 2. sauna-master-profile.jpg
**Ubicación**: Sección "Perfil del candidato"
**Dimensiones recomendadas**: 800x1000px (vertical)
**Formato**: JPEG optimizado (< 200KB)
**Contenido**: Retrato de Sauna Master en uniforme profesional, con elementos del oficio (toallas, aceites esenciales), ambiente de bienestar.
**Mood**: Acogedor, profesional, confianza

## Optimización recomendada

```bash
# Usando ImageMagick o herramientas similares
convert original.jpg -quality 85 -resize 1920x1080^ -gravity center -extent 1920x1080 sauna-master-hero.jpg
convert original.jpg -quality 85 -resize 800x1000^ -gravity center -extent 800x1000 sauna-master-profile.jpg
```

## Consideraciones

- **Derechos de imagen**: Asegurarse de tener licencia para uso comercial
- **Alt text**: Ya implementado en el código
- **Lazy loading**: Ya implementado
- **Responsive**: Las imágenes se adaptan automáticamente a mobile/desktop
