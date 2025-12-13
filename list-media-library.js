import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WP_API_URL = `${process.env.VITE_API_URL}/wp-json/wp/v2`;
const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

async function getMediaFiles() {
  try {
    const response = await axios.get(
      `${WP_API_URL}/media`,
      {
        params: {
          per_page: 100,
          media_type: 'application', // PDFs son de tipo application
        },
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener medios:', error.response?.data || error.message);
    throw error;
  }
}

async function listAllPDFs() {
  console.log('=== Listando PDFs en la biblioteca de WordPress ===\n');

  const media = await getMediaFiles();
  const pdfs = media.filter(file => file.mime_type === 'application/pdf');

  console.log(`Total de archivos encontrados: ${media.length}`);
  console.log(`Total de PDFs encontrados: ${pdfs.length}\n`);

  if (pdfs.length === 0) {
    console.log('⚠️  No se encontraron archivos PDF en la biblioteca.');
    return;
  }

  console.log('PDFs disponibles:\n');
  pdfs.forEach((pdf, index) => {
    console.log(`${index + 1}. ${pdf.title.rendered}`);
    console.log(`   ID: ${pdf.id}`);
    console.log(`   URL: ${pdf.source_url}`);
    console.log(`   Nombre de archivo: ${pdf.slug}`);
    console.log('');
  });

  // Guardar la información para el siguiente script
  const pdfData = pdfs.map(pdf => ({
    id: pdf.id,
    title: pdf.title.rendered,
    slug: pdf.slug,
    url: pdf.source_url,
    filename: pdf.media_details?.file || ''
  }));

  const fs = await import('fs');
  fs.writeFileSync(
    'pdf-library.json',
    JSON.stringify(pdfData, null, 2)
  );

  console.log('✓ Información guardada en pdf-library.json');
}

listAllPDFs().catch(console.error);
