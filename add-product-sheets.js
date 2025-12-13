import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

/**
 * Script para agregar fichas técnicas (archivos descargables) a productos
 *
 * INSTRUCCIONES:
 *
 * 1. Primero debes subir los archivos PDF de las fichas técnicas a WordPress:
 *    - Ve al panel de WordPress > Medios > Añadir nuevo
 *    - Sube todos los PDFs de las fichas técnicas
 *    - Copia las URLs de cada archivo
 *
 * 2. Luego, crea un mapeo de SKU/ID de producto a URL de ficha técnica:
 *    const productSheets = {
 *      'SKU-123': 'https://franciscal61.sg-host.com/demosle/wp-content/uploads/ficha-producto-1.pdf',
 *      'SKU-456': 'https://franciscal61.sg-host.com/demosle/wp-content/uploads/ficha-producto-2.pdf',
 *    };
 *
 * 3. Ejecuta este script: node add-product-sheets.js
 *
 * NOTA: También puedes hacerlo manualmente desde WooCommerce:
 * - Ve a Productos > Editar producto
 * - En la pestaña "General", marca "Descargable"
 * - Agrega los archivos en "Archivos descargables"
 * - Guarda los cambios
 */

// Ejemplo de mapeo (reemplaza con tus datos reales)
const productSheets = {
  // 'SKU-del-producto': 'URL-de-la-ficha-tecnica.pdf',
  // Ejemplo:
  // 'CAM-TOL-001': 'https://franciscal61.sg-host.com/demosle/wp-content/uploads/ficha-camion-tolva.pdf',
};

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

async function assignProductSheets() {
  if (Object.keys(productSheets).length === 0) {
    console.log('⚠️  No hay fichas técnicas configuradas.');
    console.log('\nPara usar este script:');
    console.log('1. Sube los PDFs a WordPress (Medios > Añadir nuevo)');
    console.log('2. Copia las URLs de los archivos');
    console.log('3. Edita el objeto productSheets en este archivo con el formato:');
    console.log('   const productSheets = {');
    console.log('     "SKU-001": "https://tu-sitio.com/wp-content/uploads/ficha.pdf",');
    console.log('   };');
    console.log('4. Ejecuta: node add-product-sheets.js');
    return;
  }

  console.log('=== Asignando fichas técnicas a productos ===\n');

  const products = await getProducts();
  console.log(`Encontrados ${products.length} productos\n`);

  let updated = 0;
  let errors = 0;
  let skipped = 0;

  for (const product of products) {
    const sheetUrl = productSheets[product.sku];

    if (!sheetUrl) {
      console.log(`⊘ Sin ficha configurada: ${product.name} (SKU: ${product.sku})`);
      skipped++;
      continue;
    }

    try {
      console.log(`Agregando ficha a: ${product.name}...`);
      await addDownloadToProduct(
        product.id,
        `Ficha Técnica - ${product.name}`,
        sheetUrl
      );
      console.log(`✓ Ficha agregada: ${product.name}\n`);
      updated++;
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error agregando ficha a: ${product.name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen ===');
  console.log(`Productos actualizados: ${updated}`);
  console.log(`Productos sin ficha: ${skipped}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${products.length}`);
}

assignProductSheets().catch(console.error);
