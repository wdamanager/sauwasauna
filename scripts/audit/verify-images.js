// Verify all featured images are accessible
const imageUrls = [
  'https://backend.sauwasauna.com/wp-content/uploads/2025/10/recuperacion-tras-esquiar-andorra-modalidad-30-60-90-sauwa-1920x1080px.jpg',
  'https://backend.sauwasauna.com/wp-content/uploads/2025/10/que-hacer-andorra-invierno-sauna-finlandesa-sauwa-1920x1080px.jpg',
  'https://backend.sauwasauna.com/wp-content/uploads/2025/10/banos-agua-fria-andorra-sauwa-sauna-1920x1080px.jpg',
  'https://backend.sauwasauna.com/wp-content/uploads/2025/10/sauna-privada-andorra-lena-loyly-experiencia-sauna-1920x1080px.jpg',
  'https://backend.sauwasauna.com/wp-content/uploads/2025/10/sauwa-sauna-1920x1080px.jpg',
  'https://backend.sauwasauna.com/wp-content/uploads/2025/10/sauna-finlandesa-sauwa-1920x1080px.jpg'
];

async function checkImages() {
  console.log('Verificando accesibilidad de imágenes...\n');

  for (const url of imageUrls) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const fileName = url.split('/').pop();

      if (response.ok) {
        console.log(`✅ ${fileName}`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Content-Type: ${response.headers.get('content-type')}`);
        console.log(`   Size: ${(parseInt(response.headers.get('content-length')) / 1024).toFixed(2)} KB`);
      } else {
        console.log(`❌ ${fileName} - Status: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ Error verificando ${url.split('/').pop()}: ${error.message}`);
    }
    console.log('');
  }
}

checkImages();