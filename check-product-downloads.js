import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

async function checkProductDownloads() {
  try {
    const response = await axios.get(
      `${WC_API_URL}/products`,
      {
        params: { per_page: 3 },
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );

    console.log('=== Verificando archivos descargables en productos ===\n');

    response.data.forEach(product => {
      console.log(`Producto: ${product.name}`);
      console.log(`ID: ${product.id}`);
      console.log(`Downloads:`, JSON.stringify(product.downloads, null, 2));
      console.log(`Downloadable:`, product.downloadable);
      console.log(`Meta data (ficha):`, product.meta_data.filter(m =>
        m.key.toLowerCase().includes('ficha') ||
        m.key.toLowerCase().includes('pdf') ||
        m.key.toLowerCase().includes('download')
      ));
      console.log('---\n');
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

checkProductDownloads();
