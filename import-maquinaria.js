import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

const csvFile = fs.readFileSync('./docs/Datos de equipos FL Rental.xlsx - Maquinaria .csv', 'utf-8');
const lines = csvFile.split('\n');

console.log('Iniciando importación de maquinaria...\n');

async function createProduct(productData) {
  try {
    const response = await axios.post(
      `${WC_API_URL}/products`,
      productData,
      {
        auth: {
          username: CONSUMER_KEY,
          password: CONSUMER_SECRET
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error.response?.data || error.message);
    throw error;
  }
}

async function importProducts() {
  let created = 0;
  let errors = 0;

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = lines[i].split(',');

    const codigo = values[0];
    const tipoEquipo = values[1];
    const marca = values[2];
    const modelo = values[3];
    const pesoOperacional = values[4];
    const potencia = values[5];
    const capacidad = values[6];
    const profundidadMax = values[7];
    const cabina = values[8];
    const cantidad = parseInt(values[9]) || 1;

    const name = `${tipoEquipo} ${marca} ${modelo}`;

    let description = `<p><strong>Tipo de Equipo:</strong> ${tipoEquipo}</p>`;
    description += `<p><strong>Marca:</strong> ${marca}</p>`;
    description += `<p><strong>Modelo:</strong> ${modelo}</p>`;
    if (pesoOperacional && pesoOperacional !== 'N/A') {
      description += `<p><strong>Peso Operacional:</strong> ${pesoOperacional} kg</p>`;
    }
    if (potencia && potencia !== 'N/A') {
      description += `<p><strong>Potencia:</strong> ${potencia} hp</p>`;
    }
    if (capacidad && capacidad !== 'N/A') {
      description += `<p><strong>Capacidad:</strong> ${capacidad}</p>`;
    }
    if (profundidadMax && profundidadMax !== 'N/A') {
      description += `<p><strong>Profundidad Máxima:</strong> ${profundidadMax}</p>`;
    }
    if (cabina && cabina !== 'N/A') {
      description += `<p><strong>Cabina:</strong> ${cabina}</p>`;
    }

    const productData = {
      name: name,
      type: 'simple',
      regular_price: '0',
      description: description,
      short_description: `${tipoEquipo} - ${marca} ${modelo}`,
      sku: codigo,
      manage_stock: true,
      stock_quantity: cantidad,
      categories: [{ name: tipoEquipo }],
      meta_data: [
        { key: 'tipo_equipo', value: tipoEquipo },
        { key: 'marca', value: marca },
        { key: 'modelo', value: modelo },
        { key: 'peso_operacional', value: pesoOperacional },
        { key: 'potencia', value: potencia },
        { key: 'capacidad', value: capacidad },
        { key: 'profundidad_max', value: profundidadMax },
        { key: 'cabina', value: cabina }
      ]
    };

    try {
      console.log(`Creando producto ${i}/${lines.length - 1}: ${name}...`);
      const result = await createProduct(productData);
      console.log(`✓ Producto creado: ${result.name} (ID: ${result.id})\n`);
      created++;
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error creando producto: ${name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Importación de Maquinaria ===');
  console.log(`Productos creados: ${created}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${created + errors}`);
}

importProducts().catch(console.error);
