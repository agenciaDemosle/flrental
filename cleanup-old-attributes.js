import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

async function getProducts(page = 1) {
  try {
    const response = await axios.get(
      `${WC_API_URL}/products`,
      {
        params: { per_page: 100, page },
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

async function removeAttributesFromProduct(productId) {
  try {
    const response = await axios.put(
      `${WC_API_URL}/products/${productId}`,
      {
        attributes: []
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

async function cleanupAttributes() {
  console.log('=== Limpiando atributo pa_marca de productos ===\n');
  console.log('Obteniendo productos de WooCommerce...\n');

  const products = await getProducts();
  console.log(`Encontrados ${products.length} productos\n`);

  let cleaned = 0;
  let errors = 0;
  let skipped = 0;

  for (const product of products) {
    // Verificar si el producto tiene atributos
    if (!product.attributes || product.attributes.length === 0) {
      console.log(`⊘ Sin atributos: ${product.name}`);
      skipped++;
      continue;
    }

    try {
      console.log(`Limpiando atributos: ${product.name}...`);
      await removeAttributesFromProduct(product.id);
      console.log(`✓ Atributos removidos: ${product.name}\n`);
      cleaned++;
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error limpiando: ${product.name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Limpieza ===');
  console.log(`Productos limpiados: ${cleaned}`);
  console.log(`Productos sin atributos: ${skipped}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${products.length}`);
}

cleanupAttributes().catch(console.error);
