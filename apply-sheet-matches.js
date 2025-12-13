import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

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

async function applyMatches() {
  console.log('=== Aplicando Fichas Técnicas a Productos ===\n');

  // Leer matches del archivo
  if (!fs.existsSync('product-sheet-matches.json')) {
    console.log('❌ No se encontró product-sheet-matches.json');
    console.log('Primero ejecuta: node auto-assign-sheets.js');
    return;
  }

  const data = JSON.parse(fs.readFileSync('product-sheet-matches.json', 'utf-8'));
  const matches = data.matches;

  console.log(`Total de productos a actualizar: ${matches.length}\n`);

  let updated = 0;
  let errors = 0;

  for (const match of matches) {
    try {
      console.log(`Agregando ficha a: ${match.product.name}...`);
      console.log(`  PDF: ${match.pdf.title}`);

      await addDownloadToProduct(
        match.product.id,
        `Ficha Técnica - ${match.product.name}`,
        match.pdf.url
      );

      console.log(`  ✓ Completado (Score: ${match.score.toFixed(2)})\n`);
      updated++;

      // Pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 400));
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen ===');
  console.log(`✓ Productos actualizados: ${updated}`);
  console.log(`✗ Errores: ${errors}`);
  console.log(`📊 Total procesados: ${matches.length}`);

  if (updated > 0) {
    console.log('\n🎉 ¡Fichas técnicas asignadas exitosamente!');
    console.log('Ahora puedes ver las fichas en las páginas de productos.');
  }
}

applyMatches().catch(console.error);
