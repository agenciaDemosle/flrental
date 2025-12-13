import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

// Mapeo de marcas a sus IDs de término en la taxonomía
const brandTermIds = {
  'Mercedes Benz': 51,
  'Mitsubishi': 52,
  'VOLVO': 53,
  'HINO': 54,
  'Caterpillar': 55,
  'Komatsu': 56,
  'John Deere': 57,
  'Hyundai': 58,
  'Konecranes': 59,
  'JCB': 60,
  'Dieci': 61,
  'Manitou': 62,
  'Hamm': 63,
  'Sany': 64,
  'Tremac': 65,
  'Mitsubishi / Mercedes Benz': 66,
};

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

async function updateProductBrand(productId, brandTermId) {
  try {
    const response = await axios.put(
      `${WC_API_URL}/products/${productId}`,
      {
        brands: [{ id: brandTermId }]
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

async function assignBrands() {
  console.log('=== Asignando marcas a productos (taxonomía) ===\n');
  console.log('Obteniendo productos de WooCommerce...\n');

  const products = await getProducts();
  console.log(`Encontrados ${products.length} productos\n`);

  let updated = 0;
  let errors = 0;
  let skipped = 0;

  for (const product of products) {
    const marcaMeta = product.meta_data.find(m => m.key === 'marca');

    if (!marcaMeta) {
      console.log(`⚠ Producto sin marca: ${product.name}`);
      skipped++;
      continue;
    }

    const marca = marcaMeta.value;
    const brandTermId = brandTermIds[marca];

    if (!brandTermId) {
      console.log(`⚠ No se encontró término para marca: ${marca} (${product.name})`);
      skipped++;
      continue;
    }

    try {
      console.log(`Actualizando: ${product.name} -> Marca: ${marca}...`);
      await updateProductBrand(product.id, brandTermId);
      console.log(`✓ Producto actualizado: ${product.name}\n`);
      updated++;
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error actualizando: ${product.name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Asignación de Marcas (Taxonomía) ===');
  console.log(`Productos actualizados: ${updated}`);
  console.log(`Productos sin marca asignada: ${skipped}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${products.length}`);
}

assignBrands().catch(console.error);
