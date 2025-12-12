import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

const brands = [
  // Camiones
  'Mercedes Benz',
  'Mitsubishi',
  'VOLVO',
  'HINO',

  // Maquinaria
  'Caterpillar',
  'Komatsu',
  'John Deere',
  'Hyundai',
  'Konecranes',
  'JCB',
  'Dieci',
  'Manitou',
  'Hamm',
  'Sany',

  // Semi-Remolques
  'Tremac',

  // Combinadas
  'Mitsubishi / Mercedes Benz',
];

async function createOrGetAttribute() {
  try {
    // Intentar crear el atributo
    const response = await axios.post(
      `${WC_API_URL}/products/attributes`,
      {
        name: 'Marca',
        slug: 'pa_marca',
        type: 'select',
        order_by: 'menu_order',
        has_archives: true
      },
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );
    console.log(`✓ Atributo 'Marca' creado (ID: ${response.data.id})\n`);
    return response.data.id;
  } catch (error) {
    if (error.response?.data?.code === 'woocommerce_rest_cannot_create') {
      // El atributo ya existe, obtenerlo
      console.log('ℹ Atributo \'Marca\' ya existe, obteniendo ID...');
      const response = await axios.get(
        `${WC_API_URL}/products/attributes`,
        {
          auth: {
            username: CONSUMER_KEY,
            password: CONSUMER_SECRET
          }
        }
      );
      const marcaAttr = response.data.find(attr => attr.slug === 'pa_marca');
      if (marcaAttr) {
        console.log(`✓ Atributo 'Marca' encontrado (ID: ${marcaAttr.id})\n`);
        return marcaAttr.id;
      }
    }
    throw error;
  }
}

async function createBrandTerm(attributeId, brandName) {
  try {
    const response = await axios.post(
      `${WC_API_URL}/products/attributes/${attributeId}/terms`,
      {
        name: brandName,
        slug: brandName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')
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
    if (error.response?.data?.code === 'term_exists') {
      console.log(`⚠ Marca ya existe: ${brandName}`);
      return null;
    }
    console.error('Error al crear marca:', error.response?.data || error.message);
    throw error;
  }
}

async function createBrands() {
  console.log('=== Creando Atributo y Marcas en WooCommerce ===\n');

  // Crear o obtener el atributo
  const attributeId = await createOrGetAttribute();

  let created = 0;
  let existing = 0;
  let errors = 0;

  console.log('Creando marcas...\n');

  for (const brand of brands) {
    try {
      console.log(`Creando marca: ${brand}...`);
      const result = await createBrandTerm(attributeId, brand);

      if (result) {
        console.log(`✓ Marca creada: ${result.name} (ID: ${result.id})\n`);
        created++;
      } else {
        existing++;
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error creando marca: ${brand}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Creación de Marcas ===');
  console.log(`Marcas creadas: ${created}`);
  console.log(`Marcas existentes: ${existing}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesadas: ${brands.length}`);
}

createBrands().catch(console.error);
