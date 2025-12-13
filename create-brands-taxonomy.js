import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

// Lista de marcas únicas extraídas de los CSVs
const brands = [
  'Mercedes Benz',
  'Mitsubishi',
  'VOLVO',
  'HINO',
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
  'Tremac',
  'Mitsubishi / Mercedes Benz'
];

async function createBrandTerm(brandName) {
  try {
    const response = await axios.post(
      `${WC_API_URL}/products/brands`,
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
    // Si el brand ya existe, intentar obtenerlo
    if (error.response?.status === 400 && error.response?.data?.code === 'term_exists') {
      console.log(`  → Marca ya existe: ${brandName}`);
      return { id: error.response.data.data.resource_id, name: brandName };
    }
    throw error;
  }
}

async function createAllBrands() {
  console.log('=== Creando marcas en taxonomía product_brand ===\n');

  const createdBrands = {};

  for (const brand of brands) {
    try {
      console.log(`Creando marca: ${brand}...`);
      const result = await createBrandTerm(brand);
      createdBrands[brand] = result.id;
      console.log(`✓ Marca creada: ${brand} (ID: ${result.id})\n`);

      // Pequeña pausa para evitar rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (error) {
      console.error(`✗ Error creando marca ${brand}:`, error.response?.data || error.message);
      console.log('');
    }
  }

  console.log('\n=== Resumen ===');
  console.log(`Marcas creadas/verificadas: ${Object.keys(createdBrands).length}`);
  console.log('\nIDs de marcas:', createdBrands);

  return createdBrands;
}

createAllBrands().catch(console.error);
