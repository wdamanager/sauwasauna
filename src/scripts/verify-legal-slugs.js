/**
 * Script de verificación de slugs de páginas legales
 * Ejecutar con: node src/scripts/verify-legal-slugs.js
 */

import { LEGAL_SLUGS, getAllLegalUrls, getHreflangPaths } from '../lib/wordpress/legal-slugs.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verificando sistema de slugs legales...\n');

// 1. Verificar que todos los archivos existen
console.log('📁 Verificando existencia de archivos:');
console.log('=====================================');

const languages = ['es', 'ca', 'en', 'fr'];
const errors = [];

for (const pageType in LEGAL_SLUGS) {
  for (const lang of languages) {
    const slug = LEGAL_SLUGS[pageType][lang];
    const filePath = path.join(__dirname, '..', 'pages', lang, `${slug}.astro`);
    const exists = fs.existsSync(filePath);

    if (exists) {
      console.log(`✅ /${lang}/${slug}.astro`);
    } else {
      console.log(`❌ /${lang}/${slug}.astro - NO EXISTE!`);
      errors.push(`Missing file: /${lang}/${slug}.astro`);
    }
  }
  console.log('');
}

// 2. Verificar URLs generadas
console.log('🔗 URLs generadas por idioma:');
console.log('============================');

for (const lang of languages) {
  console.log(`\n${lang.toUpperCase()}:`);
  const urls = getAllLegalUrls(lang);
  console.log(`  Privacy: ${urls.privacy}`);
  console.log(`  Terms: ${urls.terms}`);
  console.log(`  Cookies: ${urls.cookies}`);
}

// 3. Verificar hreflang paths
console.log('\n🌐 Hreflang paths por página:');
console.log('============================');

for (const pageType in LEGAL_SLUGS) {
  console.log(`\n${pageType}:`);
  const paths = getHreflangPaths(pageType);
  for (const lang in paths) {
    console.log(`  ${lang}: ${paths[lang]}`);
  }
}

// 4. Resumen
console.log('\n📊 Resumen:');
console.log('==========');

if (errors.length === 0) {
  console.log('✅ Todas las verificaciones pasaron correctamente!');
  console.log('\n📝 Próximos pasos:');
  console.log('1. Verificar que los slugs en WordPress/Polylang coincidan');
  console.log('2. Probar el cambio de idioma en el navegador');
  console.log('3. Verificar que el contenido se carga correctamente desde WordPress');
} else {
  console.log(`❌ Se encontraron ${errors.length} errores:`);
  errors.forEach(error => console.log(`  - ${error}`));
  console.log('\n⚠️ Corrige estos errores antes de continuar.');
}

console.log('\n✨ Verificación completada.');