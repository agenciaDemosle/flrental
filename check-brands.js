import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

async function checkProducts() {
  try {
    const response = await axios.get(
      `${WC_API_URL}/products`,
      {
        params: { per_page: 5 },
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );

    console.log('=== Verificando primeros 5 productos ===\n');

    response.data.forEach(product => {
      console.log(`Producto: ${product.name}`);
      console.log(`Atributos:`, product.attributes);
      console.log('---\n');
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

checkProducts();
