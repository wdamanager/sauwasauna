// Test de la query con límite 3 - usando fetch nativo de Node 18+

async function testLimitThree() {
  const query = `
    query GetLatestPosts($first: Int = 3) {
      posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          date
        }
      }
    }
  `;

  try {
    const response = await fetch('https://backend.sauwasauna.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables: { first: 3 }
      })
    });

    const result = await response.json();

    console.log('=== TEST LÍMITE 3 POSTS ===');
    console.log(`Total posts retornados: ${result.data.posts.nodes.length}`);
    console.log('\nPosts ordenados por fecha (más reciente primero):');

    result.data.posts.nodes.forEach((post, index) => {
      console.log(`\n${index + 1}. ${post.title}`);
      console.log(`   Fecha: ${post.date}`);
      console.log(`   Slug: ${post.slug}`);
    });

    // Validación
    if (result.data.posts.nodes.length === 3) {
      console.log('\n✅ ÉXITO: La query retorna exactamente 3 posts');
    } else {
      console.log('\n❌ ERROR: Se esperaban 3 posts pero se recibieron', result.data.posts.nodes.length);
    }

    // Verificar orden por fecha
    const dates = result.data.posts.nodes.map(p => new Date(p.date));
    const isDescending = dates.every((date, i) => i === 0 || date <= dates[i-1]);

    if (isDescending) {
      console.log('✅ ÉXITO: Los posts están ordenados por fecha descendente (más recientes primero)');
    } else {
      console.log('❌ ERROR: Los posts no están correctamente ordenados');
    }

  } catch (error) {
    console.error('Error en la prueba:', error);
  }
}

testLimitThree();