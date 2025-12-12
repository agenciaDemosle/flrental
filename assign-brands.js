import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

// Mapeo de marcas a sus IDs de término
const brandTermIds = {
  'Mercedes Benz': 35,
  'Mitsubishi': 36,
  'VOLVO': 37,
  'HINO': 38,
  'Caterpillar': 39,
  'Komatsu': 40,
  'John Deere': 41,
  'Hyundai': 42,
  'Konecranes': 43,
  'JCB': 44,
  'Dieci': 45,
  'Manitou': 46,
  'Hamm': 47,
  'Sany': 48,
  'Tremac': 49,
  'Mitsubishi / Mercedes Benz': 50,
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

async function updateProductBrand(productId, brandTermId, brandName) {
  try {
    const response = await axios.put(
      `${WC_API_URL}/products/${productId}`,
      {
        attributes: [
          {
            id: 1, // ID del atributo Marca
            name: 'Marca',
            position: 0,
            visible: true,
            variation: false,
            options: [brandName]
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

async function assignBrands() {
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
      await updateProductBrand(product.id, brandTermId, marca);
      console.log(`✓ Producto actualizado: ${product.name}\n`);
      updated++;
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error actualizando: ${product.name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Asignación de Marcas ===');
  console.log(`Productos actualizados: ${updated}`);
  console.log(`Productos sin marca asignada: ${skipped}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${products.length}`);
}

assignBrands().catch(console.error);
