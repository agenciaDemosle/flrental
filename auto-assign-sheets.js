import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

// Normalizar texto para comparación
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s-]/g, '') // Solo letras, números, espacios y guiones
    .replace(/\s+/g, ' ')
    .trim();
}

// Extraer palabras clave relevantes
function extractKeywords(text) {
  const normalized = normalize(text);
  const words = normalized.split(/[\s\/-]+/);

  // Filtrar palabras muy cortas o comunes
  const stopwords = ['de', 'del', 'la', 'el', 'los', 'las', 'y', 'ton', 'kg', 'mts', 'm3'];
  return words.filter(w => w.length > 2 && !stopwords.includes(w));
}

// Calcular similitud entre dos textos
function calculateSimilarity(text1, text2) {
  const keywords1 = extractKeywords(text1);
  const keywords2 = extractKeywords(text2);

  let matches = 0;
  keywords1.forEach(k1 => {
    keywords2.forEach(k2 => {
      if (k1.includes(k2) || k2.includes(k1)) {
        matches++;
      }
    });
  });

  const totalKeywords = Math.max(keywords1.length, keywords2.length);
  return totalKeywords > 0 ? matches / totalKeywords : 0;
}

// Buscar el mejor match para un producto
function findBestMatch(product, pdfs) {
  let bestMatch = null;
  let bestScore = 0;

  const productName = product.name;
  const productType = product.meta_data.find(m => m.key === 'tipo_equipo')?.value || '';
  const productModel = product.meta_data.find(m => m.key === 'modelo')?.value || '';
  const productBrand = product.brands?.[0]?.name || product.meta_data.find(m => m.key === 'marca')?.value || '';

  // Crear un texto compuesto para mejor matching
  const productText = `${productType} ${productBrand} ${productModel}`.trim();

  pdfs.forEach(pdf => {
    const pdfText = `${pdf.title} ${pdf.slug}`;
    const score = calculateSimilarity(productText, pdfText);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = pdf;
    }
  });

  // Solo retornar si el score es razonablemente alto
  if (bestScore > 0.3) {
    return { pdf: bestMatch, score: bestScore };
  }

  return null;
}

async function getProducts() {
  try {
    const response = await axios.get(
      `${WC_API_URL}/products`,
      {
        params: { per_page: 100 },
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error.response?.data || error.message);
    throw error;
  }
}

async function addDownloadToProduct(productId, downloadName, downloadUrl) {
  try {
    const response = await axios.put(
      `${WC_API_URL}/products/${productId}`,
      {
        downloadable: true,
        downloads: [
          {
            name: downloadName,
            file: downloadUrl
          }
        ]
      },
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error.response?.data || error.message);
    throw error;
  }
}

async function autoAssignSheets() {
  console.log('=== Auto-asignación de Fichas Técnicas ===\n');

  // Leer PDFs del archivo generado
  if (!fs.existsSync('pdf-library.json')) {
    console.log('❌ No se encontró pdf-library.json');
    console.log('Primero ejecuta: node list-media-library.js');
    return;
  }

  const pdfs = JSON.parse(fs.readFileSync('pdf-library.json', 'utf-8'));
  console.log(`PDFs disponibles: ${pdfs.length}\n`);

  // Obtener productos
  const products = await getProducts();
  console.log(`Productos encontrados: ${products.length}\n`);

  // Encontrar matches
  const matches = [];
  const noMatches = [];

  products.forEach(product => {
    const match = findBestMatch(product, pdfs);

    if (match) {
      matches.push({
        product,
        pdf: match.pdf,
        score: match.score
      });
    } else {
      noMatches.push(product);
    }
  });

  console.log(`\n=== Resultados del Matching ===`);
  console.log(`✓ Productos con match: ${matches.length}`);
  console.log(`⚠ Productos sin match: ${noMatches.length}\n`);

  // Mostrar matches propuestos (primeros 10)
  console.log('=== Primeros 10 matches propuestos ===\n');
  matches.slice(0, 10).forEach((m, i) => {
    console.log(`${i + 1}. ${m.product.name}`);
    console.log(`   → ${m.pdf.title} (Score: ${m.score.toFixed(2)})`);
    console.log(`   URL: ${m.pdf.url}`);
    console.log('');
  });

  // Guardar matches para revisión
  fs.writeFileSync(
    'product-sheet-matches.json',
    JSON.stringify({ matches, noMatches: noMatches.map(p => ({ id: p.id, name: p.name })) }, null, 2)
  );

  console.log('✓ Matches guardados en product-sheet-matches.json');
  console.log('\n📝 Revisa los matches y luego ejecuta: node apply-sheet-matches.js');
}

autoAssignSheets().catch(console.error);
