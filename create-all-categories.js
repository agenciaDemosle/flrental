import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const WC_API_URL = `${process.env.VITE_API_URL}/wp-json/wc/v3`;
const CONSUMER_KEY = process.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.VITE_WC_CONSUMER_SECRET;

const categories = [
  // Categorías de Camiones (ya existen)
  { name: 'Camión Tolva', slug: 'camion-tolva', description: 'Camiones tolva para transporte de materiales' },
  { name: 'Camión Aljibe', slug: 'camion-aljibe', description: 'Camiones aljibe para transporte de agua' },
  { name: 'Camión Lubricador', slug: 'camion-lubricador', description: 'Camiones lubricadores para servicios de mantenimiento' },
  { name: 'Camión Pluma', slug: 'camion-pluma', description: 'Camiones con grúa pluma para levantamiento de cargas' },
  { name: 'Tracto Pluma', slug: 'tracto-pluma', description: 'Tractos con grúa pluma' },
  { name: 'Camión Plano', slug: 'camion-plano', description: 'Camiones planos para transporte general' },
  { name: 'Camión Tracto', slug: 'camion-tracto', description: 'Camiones tracto para remolques' },
  { name: 'Minibus', slug: 'minibus', description: 'Minibuses para transporte de personal' },

  // Categorías de Maquinaria (NUEVAS)
  { name: 'Excavadora', slug: 'excavadora', description: 'Excavadoras para movimiento de tierra y excavación' },
  { name: 'Cargador Frontal', slug: 'cargador-frontal', description: 'Cargadores frontales para carga y transporte de materiales' },
  { name: 'Motoniveladora', slug: 'motoniveladora', description: 'Motoniveladoras para nivelación de terrenos' },
  { name: 'Tractor de Cadena', slug: 'tractor-de-cadena', description: 'Tractores de cadena para movimiento de tierra' },
  { name: 'Retroexcavadora', slug: 'retroexcavadora', description: 'Retroexcavadoras para excavación y carga' },
  { name: 'Rodillo Compactador', slug: 'rodillo-compactador', description: 'Rodillos compactadores para compactación de suelos' },
  { name: 'Minicargador', slug: 'minicargador', description: 'Minicargadores compactos para espacios reducidos' },
  { name: 'Manipulador Telescópico', slug: 'manipulador-telescopico', description: 'Manipuladores telescópicos para elevación y alcance' },
  { name: 'Grúa Horquilla', slug: 'grua-horquilla', description: 'Grúas horquilla para manejo de cargas pesadas' },

  // Categorías de Semi-Remolques (NUEVAS)
  { name: 'Cama Baja', slug: 'cama-baja', description: 'Camas bajas para transporte de maquinaria pesada' },
  { name: 'Rampla', slug: 'rampla', description: 'Ramplas para transporte de carga general' },
];

async function createCategory(categoryData) {
  try {
    const response = await axios.post(
      `${WC_API_URL}/products/categories`,
      categoryData,
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
      console.log(`⚠ Categoría ya existe: ${categoryData.name}`);
      return null;
    }
    console.error('Error al crear categoría:', error.response?.data || error.message);
    throw error;
  }
}

async function createCategories() {
  console.log('Iniciando creación de categorías...\n');

  let created = 0;
  let existing = 0;
  let errors = 0;

  for (const category of categories) {
    try {
      console.log(`Creando categoría: ${category.name}...`);
      const result = await createCategory(category);

      if (result) {
        console.log(`✓ Categoría creada: ${result.name} (ID: ${result.id})\n`);
        created++;
      } else {
        existing++;
      }

      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`✗ Error creando categoría: ${category.name}\n`);
      errors++;
    }
  }

  console.log('\n=== Resumen de Creación de Categorías ===');
  console.log(`Categorías creadas: ${created}`);
  console.log(`Categorías existentes: ${existing}`);
  console.log(`Errores: ${errors}`);
  console.log(`Total procesadas: ${categories.length}`);
}

createCategories().catch(console.error);
