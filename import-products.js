import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

// Leer el archivo CSV
const csvFile = fs.readFileSync('./docs/Datos de equipos FL Rental.xlsx - Camiones .csv', 'utf-8');
const lines = csvFile.split('\n');
const headers = lines[0].split(',');

console.log('Iniciando importación de productos...\n');

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
    const capacidad = values[4];
    const potencia = values[5];
    const traccion = values[6];
    const transmision = values[7];
    const origen = values[8];
    const notas = values[9];
    const cantidad = parseInt(values[10]) || 1;

    // Crear el nombre del producto
    const name = `${tipoEquipo} ${marca} ${modelo}`;

    // Crear la descripción con todos los detalles
    let description = `<p><strong>Tipo de Equipo:</strong> ${tipoEquipo}</p>`;
    description += `<p><strong>Marca:</strong> ${marca}</p>`;
    description += `<p><strong>Modelo:</strong> ${modelo}</p>`;
    if (capacidad && capacidad !== '-' && capacidad !== 'N/A') {
      description += `<p><strong>Capacidad / Carga Útil:</strong> ${capacidad}</p>`;
    }
    if (potencia && potencia !== '-' && potencia !== 'N/A') {
      description += `<p><strong>Potencia:</strong> ${potencia} hp</p>`;
    }
    if (traccion && traccion !== '-' && traccion !== 'N/A') {
      description += `<p><strong>Tracción:</strong> ${traccion}</p>`;
    }
    if (transmision && transmision !== '-' && transmision !== 'N/A') {
      description += `<p><strong>Transmisión:</strong> ${transmision}</p>`;
    }
    if (origen && origen !== '-' && origen !== 'N/A') {
      description += `<p><strong>Origen:</strong> ${origen}</p>`;
    }
    if (notas && notas !== '-' && notas !== 'N/A') {
      description += `<p><strong>Notas:</strong> ${notas}</p>`;
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
      categories: [
        {
          name: tipoEquipo
        }
      ],
      meta_data: [
        { key: 'tipo_equipo', value: tipoEquipo },
        { key: 'marca', value: marca },
        { key: 'modelo', value: modelo },
        { key: 'capacidad', value: capacidad },
        { key: 'potencia', value: potencia },
        { key: 'traccion', value: traccion },
        { key: 'transmision', value: transmision },
        { key: 'origen', value: origen },
        { key: 'notas', value: notas }
      ]
    };

    try {
      console.log(`Creando producto ${i}/${lines.length - 1}: ${name}...`);
      const result = await createProduct(productData);
      console.log(`✓ Producto creado: ${result.name} (ID: ${result.id})\n`);
      created++;

      // Pequeña pausa para no saturar la API
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`✗ Error creando producto: ${name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Importación ===');
  console.log(`Productos creados: ${created}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesados: ${created + errors}`);
}

importProducts().catch(console.error);
