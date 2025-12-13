import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

async function checkAllMetadata() {
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

    console.log('=== Buscando metadata relacionada con fichas ===\n');

    const metaKeys = new Set();

    response.data.forEach(product => {
      product.meta_data.forEach(meta => {
        metaKeys.add(meta.key);
      });
    });

    console.log('Todas las meta keys encontradas:');
    console.log([...metaKeys].sort().join('\n'));

    // Buscar productos con metadata de fichas
    console.log('\n\n=== Productos con metadata potencialmente relacionada ===\n');

    response.data.slice(0, 5).forEach(product => {
      const relevantMeta = product.meta_data.filter(m =>
        !m.key.startsWith('_') &&
        m.key !== 'marca' &&
        m.key !== 'combustible'
      );

      if (relevantMeta.length > 0) {
        console.log(`${product.name}:`);
        console.log(JSON.stringify(relevantMeta, null, 2));
        console.log('---\n');
      }
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

checkAllMetadata();
