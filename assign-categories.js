import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

// Mapeo de tipos de equipo a IDs de categoría
const categoryMap = {
  'CAMIÓN TOLVA': 16,
  'CAMIÓN ALJIBE': 17,
  'CAMIÓN LUBRICADOR': 18,
  'CAMIÓN LUBRICADOR MIXTO': 18, // También es lubricador
  'CAMIÓN PLUMA': 19,
  'TRACTO PLUMA': 20,
  'CAMIÓN PLANO 3/4': 21,
  'CAMIÓN TRACTO': 22,
  'MINIBUS': 23
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

async function updateProduct(productId, categoryId) {
  try {
    const response = await axios.put(
      `${WC_API_URL}/products/${productId}`,
      {
        categories: [{ id: categoryId }]
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

async function assignCategories() {
  console.log('Obteniendo productos de WooCommerce...\n');

  const products = await getProducts();
  console.log(`Encontrados ${products.length} productos\n`);

  let updated = 0;
  let errors = 0;

  for (const product of products) {
    // Buscar el tipo de equipo en los metadatos
    const tipoEquipoMeta = product.meta_data.find(m => m.key === 'tipo_equipo');

    if (!tipoEquipoMeta) {
      console.log(`⚠ Producto sin tipo_equipo: ${product.name}`);
      continue;
    }

    const tipoEquipo = tipoEquipoMeta.value;
    const categoryId = categoryMap[tipoEquipo];

    if (!categoryId) {
      console.log(`⚠ No se encontró categoría para: ${tipoEquipo} (${product.name})`);
      continue;
    }

    try {
      console.log(`Actualizando: ${product.name} -> Categoría ID: ${categoryId}...`);
      await updateProduct(product.id, categoryId);
      console.log(`✓ Producto actualizado: ${product.name}\n`);
      updated++;

      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error actualizando: ${product.name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Asignación de Categorías ===');
  console.log(`Productos actualizados: ${updated}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${products.length}`);
}

assignCategories().catch(console.error);
