/**
 * FL Rental - Script para crear productos de maquinaria pesada en WooCommerce
 *
 * Ejecutar con: npx tsx scripts/seed-products.ts
 */

const API_URL = 'https://franciscal56.sg-host.com/demosle';
const WC_CONSUMER_KEY = 'ck_528cb46a6377861bb313fa7364b9f543000271fe';
const WC_CONSUMER_SECRET = 'cs_978a7b23882a313675f0c9f5f7a4cd46c09ac67b';

const WC_API_BASE = `${API_URL}/wp-json/wc/v3`;

interface ProductData {
  name: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  regular_price: string;
  categories: { id?: number; name?: string }[];
  attributes: { name: string; options: string[]; visible: boolean }[];
  meta_data: { key: string; value: string }[];
}

// Productos de maquinaria pesada (sin imágenes para evitar errores)
const PRODUCTS: ProductData[] = [
  // EXCAVADORAS
  {
    name: 'Excavadora CAT 320',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Excavadora Hidráulica Caterpillar 320</h3>
<p>La excavadora CAT 320 es una máquina versátil y potente, ideal para trabajos de excavación, demolición y movimiento de tierra en proyectos de construcción y minería.</p>
<h4>Características principales:</h4>
<ul>
<li>Motor Cat C4.4 con tecnología ACERT</li>
<li>Potencia neta: 121 kW (162 hp)</li>
<li>Peso operativo: 22.200 kg</li>
<li>Profundidad máxima de excavación: 6.700 mm</li>
<li>Alcance máximo: 9.960 mm</li>
<li>Capacidad del cucharón: 0.8 - 1.4 m³</li>
<li>Sistema hidráulico eficiente</li>
<li>Cabina ROPS/FOPS con aire acondicionado</li>
</ul>`,
    short_description: 'Excavadora hidráulica de 22 ton con motor CAT C4.4 de 162 HP. Ideal para excavación y movimiento de tierra.',
    sku: 'EXC-CAT320-001',
    regular_price: '450000',
    categories: [{ name: 'Excavadoras' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['320'], visible: true },
      { name: 'Peso Operativo', options: ['22.200 kg'], visible: true },
      { name: 'Potencia', options: ['162 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: '320' },
      { key: '_año', value: '2022' },
      { key: '_horas_uso', value: '1500' },
    ]
  },
  {
    name: 'Excavadora Komatsu PC200-8',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Excavadora Hidráulica Komatsu PC200-8</h3>
<p>La PC200-8 combina productividad, eficiencia de combustible y confiabilidad en una máquina versátil para múltiples aplicaciones.</p>
<h4>Características principales:</h4>
<ul>
<li>Motor Komatsu SAA6D107E-1</li>
<li>Potencia neta: 110 kW (147 hp)</li>
<li>Peso operativo: 20.300 kg</li>
<li>Profundidad máxima de excavación: 6.620 mm</li>
<li>Sistema KOMTRAX de monitoreo</li>
<li>Cabina espaciosa con excelente visibilidad</li>
</ul>`,
    short_description: 'Excavadora hidráulica de 20 ton con sistema KOMTRAX. Eficiente en combustible y alto rendimiento.',
    sku: 'EXC-KOM-PC200-001',
    regular_price: '420000',
    categories: [{ name: 'Excavadoras' }],
    attributes: [
      { name: 'Marca', options: ['Komatsu'], visible: true },
      { name: 'Modelo', options: ['PC200-8'], visible: true },
      { name: 'Peso Operativo', options: ['20.300 kg'], visible: true },
      { name: 'Potencia', options: ['147 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Komatsu' },
      { key: '_modelo', value: 'PC200-8' },
      { key: '_año', value: '2021' },
      { key: '_horas_uso', value: '2200' },
    ]
  },
  {
    name: 'Mini Excavadora CAT 305.5E2',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Mini Excavadora Caterpillar 305.5E2</h3>
<p>Excavadora compacta perfecta para trabajos en espacios reducidos, paisajismo y proyectos residenciales.</p>
<h4>Características:</h4>
<ul>
<li>Motor Cat C2.4 Turbo</li>
<li>Potencia: 34.1 kW (45.7 hp)</li>
<li>Peso operativo: 5.305 kg</li>
<li>Profundidad de excavación: 3.650 mm</li>
</ul>`,
    short_description: 'Mini excavadora de 5.3 ton, perfecta para espacios reducidos y trabajos de precisión.',
    sku: 'EXC-CAT305-001',
    regular_price: '180000',
    categories: [{ name: 'Excavadoras' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['305.5E2'], visible: true },
      { name: 'Peso Operativo', options: ['5.305 kg'], visible: true },
      { name: 'Potencia', options: ['45.7 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: '305.5E2' },
      { key: '_año', value: '2023' },
      { key: '_horas_uso', value: '800' },
    ]
  },
  {
    name: 'Excavadora Volvo EC220E',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Excavadora Hidráulica Volvo EC220E</h3>
<p>Excavadora de última generación con tecnología ECO mode y sistema de control avanzado.</p>`,
    short_description: 'Excavadora Volvo de 22 ton con tecnología ECO mode para máximo ahorro.',
    sku: 'EXC-VOL-EC220-001',
    regular_price: '440000',
    categories: [{ name: 'Excavadoras' }],
    attributes: [
      { name: 'Marca', options: ['Volvo'], visible: true },
      { name: 'Modelo', options: ['EC220E'], visible: true },
      { name: 'Peso Operativo', options: ['22.100 kg'], visible: true },
      { name: 'Potencia', options: ['168 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Volvo' },
      { key: '_modelo', value: 'EC220E' },
    ]
  },

  // RETROEXCAVADORAS
  {
    name: 'Retroexcavadora CAT 420F2',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Retroexcavadora Caterpillar 420F2</h3>
<p>La retroexcavadora más vendida del mundo. Versátil, potente y confiable para todo tipo de trabajos.</p>
<h4>Características:</h4>
<ul>
<li>Motor Cat C4.4</li>
<li>Potencia: 72 kW (97 hp)</li>
<li>Peso operativo: 8.709 kg</li>
<li>Profundidad de excavación: 4.326 mm</li>
<li>Capacidad cargador: 1.03 m³</li>
</ul>`,
    short_description: 'Retroexcavadora versátil de 97 HP. La más vendida del mundo por su confiabilidad.',
    sku: 'RET-CAT420-001',
    regular_price: '280000',
    categories: [{ name: 'Retroexcavadoras' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['420F2'], visible: true },
      { name: 'Peso Operativo', options: ['8.709 kg'], visible: true },
      { name: 'Potencia', options: ['97 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: '420F2' },
      { key: '_año', value: '2022' },
      { key: '_horas_uso', value: '1800' },
    ]
  },
  {
    name: 'Retroexcavadora JCB 3CX',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Retroexcavadora JCB 3CX</h3>
<p>Retroexcavadora premium con la mejor ergonomía y rendimiento de su clase.</p>`,
    short_description: 'Retroexcavadora JCB 3CX con motor EcoMAX de 91 HP. Excelente ergonomía.',
    sku: 'RET-JCB3CX-001',
    regular_price: '260000',
    categories: [{ name: 'Retroexcavadoras' }],
    attributes: [
      { name: 'Marca', options: ['JCB'], visible: true },
      { name: 'Modelo', options: ['3CX'], visible: true },
      { name: 'Peso Operativo', options: ['8.070 kg'], visible: true },
      { name: 'Potencia', options: ['91 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'JCB' },
      { key: '_modelo', value: '3CX' },
    ]
  },
  {
    name: 'Retroexcavadora Case 580N',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Retroexcavadora Case 580N</h3>
<p>Retroexcavadora robusta con excelente profundidad de excavación y fuerza de levantamiento.</p>`,
    short_description: 'Retroexcavadora Case 580N de 97 HP. Robusta y confiable.',
    sku: 'RET-CASE580-001',
    regular_price: '250000',
    categories: [{ name: 'Retroexcavadoras' }],
    attributes: [
      { name: 'Marca', options: ['Case'], visible: true },
      { name: 'Modelo', options: ['580N'], visible: true },
      { name: 'Potencia', options: ['97 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Case' },
      { key: '_modelo', value: '580N' },
    ]
  },

  // BULLDOZERS
  {
    name: 'Bulldozer CAT D6',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Tractor de Orugas Caterpillar D6</h3>
<p>El D6 ofrece la versatilidad y productividad que necesitas para trabajos de nivelación, excavación y empuje.</p>
<h4>Características:</h4>
<ul>
<li>Motor Cat C9.3B</li>
<li>Potencia: 158 kW (212 hp)</li>
<li>Peso operativo: 20.390 kg</li>
<li>Capacidad de hoja: 3.9 - 5.6 m³</li>
<li>Sistema Grade con GPS opcional</li>
</ul>`,
    short_description: 'Bulldozer de 212 HP con tecnología Grade. Máxima productividad en nivelación.',
    sku: 'BUL-CATD6-001',
    regular_price: '520000',
    categories: [{ name: 'Bulldozers' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['D6'], visible: true },
      { name: 'Peso Operativo', options: ['20.390 kg'], visible: true },
      { name: 'Potencia', options: ['212 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: 'D6' },
      { key: '_año', value: '2022' },
    ]
  },
  {
    name: 'Bulldozer Komatsu D65PX',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Tractor de Orugas Komatsu D65PX</h3>
<p>Bulldozer de alta producción con excelente capacidad de empuje y nivelación.</p>`,
    short_description: 'Bulldozer Komatsu D65PX de 205 HP. Alto rendimiento en movimiento de tierra.',
    sku: 'BUL-KOMD65-001',
    regular_price: '480000',
    categories: [{ name: 'Bulldozers' }],
    attributes: [
      { name: 'Marca', options: ['Komatsu'], visible: true },
      { name: 'Modelo', options: ['D65PX'], visible: true },
      { name: 'Potencia', options: ['205 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Komatsu' },
      { key: '_modelo', value: 'D65PX' },
    ]
  },

  // RODILLOS COMPACTADORES
  {
    name: 'Rodillo Compactador CAT CS56B',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Rodillo Vibratorio Caterpillar CS56B</h3>
<p>Rodillo vibratorio de tambor liso para compactación de suelos y bases.</p>
<h4>Características:</h4>
<ul>
<li>Motor Cat C4.4</li>
<li>Potencia: 97 kW (130 hp)</li>
<li>Peso operativo: 11.340 kg</li>
<li>Ancho de tambor: 2.134 mm</li>
<li>Fuerza centrífuga: 254 kN</li>
</ul>`,
    short_description: 'Rodillo vibratorio de 11.3 ton con tambor de 2.1m. Ideal para compactación de suelos.',
    sku: 'ROD-CATCS56-001',
    regular_price: '220000',
    categories: [{ name: 'Rodillos Compactadores' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['CS56B'], visible: true },
      { name: 'Peso Operativo', options: ['11.340 kg'], visible: true },
      { name: 'Potencia', options: ['130 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: 'CS56B' },
    ]
  },
  {
    name: 'Rodillo Doble Tambor BOMAG BW161AD-5',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Rodillo Tándem BOMAG BW161AD-5</h3>
<p>Rodillo de doble tambor para compactación de asfalto y acabados finos.</p>`,
    short_description: 'Rodillo tándem BOMAG de 7 ton para compactación de asfalto.',
    sku: 'ROD-BOMAG161-001',
    regular_price: '180000',
    categories: [{ name: 'Rodillos Compactadores' }],
    attributes: [
      { name: 'Marca', options: ['BOMAG'], visible: true },
      { name: 'Modelo', options: ['BW161AD-5'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'BOMAG' },
      { key: '_modelo', value: 'BW161AD-5' },
    ]
  },
  {
    name: 'Rodillo Pata de Cabra CAT CP56B',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Rodillo Pata de Cabra Caterpillar CP56B</h3>
<p>Rodillo con tambor pata de cabra para compactación de suelos cohesivos.</p>`,
    short_description: 'Rodillo pata de cabra CAT de 11 ton para suelos cohesivos.',
    sku: 'ROD-CATCP56-001',
    regular_price: '230000',
    categories: [{ name: 'Rodillos Compactadores' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['CP56B'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: 'CP56B' },
    ]
  },

  // CARGADORES FRONTALES
  {
    name: 'Cargador Frontal CAT 950M',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Cargador de Ruedas Caterpillar 950M</h3>
<p>Cargador de ruedas mediano con excelente capacidad de carga y versatilidad.</p>
<h4>Características:</h4>
<ul>
<li>Motor Cat C7.1</li>
<li>Potencia: 162 kW (217 hp)</li>
<li>Peso operativo: 18.193 kg</li>
<li>Capacidad del cucharón: 3.1 - 4.2 m³</li>
<li>Fuerza de desprendimiento: 174 kN</li>
</ul>`,
    short_description: 'Cargador frontal de 217 HP con capacidad de 4.2 m³. Máxima versatilidad.',
    sku: 'CAR-CAT950-001',
    regular_price: '380000',
    categories: [{ name: 'Cargadores Frontales' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['950M'], visible: true },
      { name: 'Peso Operativo', options: ['18.193 kg'], visible: true },
      { name: 'Potencia', options: ['217 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: '950M' },
    ]
  },
  {
    name: 'Cargador Frontal Volvo L120H',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Cargador de Ruedas Volvo L120H</h3>
<p>Cargador premium con tecnología avanzada y bajo consumo de combustible.</p>`,
    short_description: 'Cargador Volvo L120H de 220 HP. Eficiencia y productividad.',
    sku: 'CAR-VOLL120-001',
    regular_price: '400000',
    categories: [{ name: 'Cargadores Frontales' }],
    attributes: [
      { name: 'Marca', options: ['Volvo'], visible: true },
      { name: 'Modelo', options: ['L120H'], visible: true },
      { name: 'Potencia', options: ['220 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Volvo' },
      { key: '_modelo', value: 'L120H' },
    ]
  },
  {
    name: 'Cargador Frontal Komatsu WA320',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Cargador de Ruedas Komatsu WA320</h3>
<p>Cargador compacto y maniobrable con excelente visibilidad.</p>`,
    short_description: 'Cargador Komatsu WA320 de 165 HP. Compacto y maniobrable.',
    sku: 'CAR-KOMWA320-001',
    regular_price: '320000',
    categories: [{ name: 'Cargadores Frontales' }],
    attributes: [
      { name: 'Marca', options: ['Komatsu'], visible: true },
      { name: 'Modelo', options: ['WA320'], visible: true },
      { name: 'Potencia', options: ['165 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Komatsu' },
      { key: '_modelo', value: 'WA320' },
    ]
  },

  // GRÚAS
  {
    name: 'Grúa Telescópica Grove GMK3060',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Grúa Móvil Telescópica Grove GMK3060</h3>
<p>Grúa todo terreno de 60 toneladas con excelente capacidad de izaje y movilidad.</p>
<h4>Características:</h4>
<ul>
<li>Capacidad máxima: 60 toneladas</li>
<li>Longitud de pluma: 43 metros</li>
<li>Motor Mercedes-Benz</li>
<li>Sistema de estabilización automático</li>
<li>Transmisión 6x6x6</li>
</ul>`,
    short_description: 'Grúa móvil de 60 ton con pluma de 43m. Máxima capacidad de izaje.',
    sku: 'GRU-GROVE60-001',
    regular_price: '850000',
    categories: [{ name: 'Grúas' }],
    attributes: [
      { name: 'Marca', options: ['Grove'], visible: true },
      { name: 'Modelo', options: ['GMK3060'], visible: true },
      { name: 'Capacidad', options: ['60 toneladas'], visible: true },
      { name: 'Longitud Pluma', options: ['43 metros'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Grove' },
      { key: '_modelo', value: 'GMK3060' },
      { key: '_capacidad', value: '60 toneladas' },
    ]
  },
  {
    name: 'Grúa Liebherr LTM 1100',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Grúa Móvil Liebherr LTM 1100</h3>
<p>Grúa de alta capacidad para proyectos de gran envergadura.</p>`,
    short_description: 'Grúa Liebherr de 100 ton. Capacidad para grandes proyectos.',
    sku: 'GRU-LIEB100-001',
    regular_price: '1200000',
    categories: [{ name: 'Grúas' }],
    attributes: [
      { name: 'Marca', options: ['Liebherr'], visible: true },
      { name: 'Modelo', options: ['LTM 1100'], visible: true },
      { name: 'Capacidad', options: ['100 toneladas'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Liebherr' },
      { key: '_modelo', value: 'LTM 1100' },
      { key: '_capacidad', value: '100 toneladas' },
    ]
  },
  {
    name: 'Grúa Tadano GR-500EX',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Grúa Hidráulica Tadano GR-500EX</h3>
<p>Grúa sobre camión de 50 toneladas, compacta y versátil.</p>`,
    short_description: 'Grúa Tadano de 50 ton. Compacta y versátil.',
    sku: 'GRU-TAD500-001',
    regular_price: '650000',
    categories: [{ name: 'Grúas' }],
    attributes: [
      { name: 'Marca', options: ['Tadano'], visible: true },
      { name: 'Modelo', options: ['GR-500EX'], visible: true },
      { name: 'Capacidad', options: ['50 toneladas'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Tadano' },
      { key: '_modelo', value: 'GR-500EX' },
    ]
  },

  // MINICARGADORES
  {
    name: 'Minicargador Bobcat S650',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Minicargador Bobcat S650</h3>
<p>Minicargador versátil y compacto con gran capacidad de carga y múltiples accesorios disponibles.</p>
<h4>Características:</h4>
<ul>
<li>Motor Bobcat de 74.2 hp</li>
<li>Capacidad operativa: 1.179 kg</li>
<li>Altura de levantamiento: 3.124 mm</li>
<li>Compatible con más de 60 accesorios</li>
</ul>`,
    short_description: 'Minicargador Bobcat S650 de 74 HP. Versátil con múltiples accesorios.',
    sku: 'MIN-BOBS650-001',
    regular_price: '150000',
    categories: [{ name: 'Minicargadores' }],
    attributes: [
      { name: 'Marca', options: ['Bobcat'], visible: true },
      { name: 'Modelo', options: ['S650'], visible: true },
      { name: 'Potencia', options: ['74 HP'], visible: true },
      { name: 'Capacidad', options: ['1.179 kg'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Bobcat' },
      { key: '_modelo', value: 'S650' },
    ]
  },
  {
    name: 'Minicargador CAT 262D3',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Minicargador Caterpillar 262D3</h3>
<p>Minicargador de alto rendimiento con cabina cerrada y sistema hidráulico de alta presión.</p>`,
    short_description: 'Minicargador CAT 262D3 de 74 HP con sistema hidráulico avanzado.',
    sku: 'MIN-CAT262-001',
    regular_price: '160000',
    categories: [{ name: 'Minicargadores' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['262D3'], visible: true },
      { name: 'Potencia', options: ['74 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: '262D3' },
    ]
  },
  {
    name: 'Minicargador John Deere 320G',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Minicargador John Deere 320G</h3>
<p>Minicargador con tecnología EH y excelente visibilidad lateral.</p>`,
    short_description: 'Minicargador John Deere 320G de 69 HP. Tecnología EH.',
    sku: 'MIN-JD320G-001',
    regular_price: '145000',
    categories: [{ name: 'Minicargadores' }],
    attributes: [
      { name: 'Marca', options: ['John Deere'], visible: true },
      { name: 'Modelo', options: ['320G'], visible: true },
      { name: 'Potencia', options: ['69 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'John Deere' },
      { key: '_modelo', value: '320G' },
    ]
  },

  // GENERADORES
  {
    name: 'Generador CAT DE200',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Grupo Electrógeno Caterpillar DE200</h3>
<p>Generador diésel de 200 kVA para aplicaciones industriales y de emergencia.</p>
<h4>Características:</h4>
<ul>
<li>Potencia: 200 kVA / 160 kW</li>
<li>Motor Cat C7.1</li>
<li>Voltaje: 380/220V trifásico</li>
<li>Consumo: 42 L/h al 100%</li>
<li>Tanque de combustible de 24 horas</li>
<li>Panel de control digital</li>
</ul>`,
    short_description: 'Generador diésel de 200 kVA con tanque de 24 horas de autonomía.',
    sku: 'GEN-CATDE200-001',
    regular_price: '120000',
    categories: [{ name: 'Generadores' }],
    attributes: [
      { name: 'Marca', options: ['Caterpillar'], visible: true },
      { name: 'Modelo', options: ['DE200'], visible: true },
      { name: 'Potencia', options: ['200 kVA'], visible: true },
      { name: 'Voltaje', options: ['380/220V'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Caterpillar' },
      { key: '_modelo', value: 'DE200' },
      { key: '_potencia', value: '200 kVA' },
    ]
  },
  {
    name: 'Generador Cummins C500D5',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Grupo Electrógeno Cummins C500D5</h3>
<p>Generador de alta capacidad para grandes proyectos industriales.</p>`,
    short_description: 'Generador Cummins de 500 kVA. Alta capacidad para proyectos industriales.',
    sku: 'GEN-CUMM500-001',
    regular_price: '250000',
    categories: [{ name: 'Generadores' }],
    attributes: [
      { name: 'Marca', options: ['Cummins'], visible: true },
      { name: 'Modelo', options: ['C500D5'], visible: true },
      { name: 'Potencia', options: ['500 kVA'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Cummins' },
      { key: '_modelo', value: 'C500D5' },
      { key: '_potencia', value: '500 kVA' },
    ]
  },
  {
    name: 'Generador Atlas Copco QAS 80',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Grupo Electrógeno Atlas Copco QAS 80</h3>
<p>Generador portátil de 80 kVA, silencioso y compacto.</p>`,
    short_description: 'Generador Atlas Copco de 80 kVA. Portátil y silencioso.',
    sku: 'GEN-ATLAS80-001',
    regular_price: '85000',
    categories: [{ name: 'Generadores' }],
    attributes: [
      { name: 'Marca', options: ['Atlas Copco'], visible: true },
      { name: 'Modelo', options: ['QAS 80'], visible: true },
      { name: 'Potencia', options: ['80 kVA'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Atlas Copco' },
      { key: '_modelo', value: 'QAS 80' },
    ]
  },

  // PLATAFORMAS ELEVADORAS
  {
    name: 'Plataforma Tijera JLG 3246ES',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Plataforma de Tijera Eléctrica JLG 3246ES</h3>
<p>Plataforma elevadora de tijera para trabajo en altura en interiores.</p>
<h4>Características:</h4>
<ul>
<li>Altura de trabajo: 11.75 m</li>
<li>Capacidad plataforma: 318 kg</li>
<li>Dimensiones plataforma: 2.26 x 0.81 m</li>
<li>Propulsión eléctrica - cero emisiones</li>
</ul>`,
    short_description: 'Plataforma de tijera eléctrica con altura de trabajo de 11.75m.',
    sku: 'PLA-JLG3246-001',
    regular_price: '85000',
    categories: [{ name: 'Plataformas Elevadoras' }],
    attributes: [
      { name: 'Marca', options: ['JLG'], visible: true },
      { name: 'Modelo', options: ['3246ES'], visible: true },
      { name: 'Altura Trabajo', options: ['11.75 m'], visible: true },
      { name: 'Capacidad', options: ['318 kg'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'JLG' },
      { key: '_modelo', value: '3246ES' },
    ]
  },
  {
    name: 'Plataforma Articulada Genie Z-60/37',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Plataforma Articulada Genie Z-60/37</h3>
<p>Plataforma articulada diésel para trabajo en exteriores con gran alcance.</p>`,
    short_description: 'Plataforma articulada Genie con altura de trabajo de 20m.',
    sku: 'PLA-GENZ60-001',
    regular_price: '140000',
    categories: [{ name: 'Plataformas Elevadoras' }],
    attributes: [
      { name: 'Marca', options: ['Genie'], visible: true },
      { name: 'Modelo', options: ['Z-60/37'], visible: true },
      { name: 'Altura Trabajo', options: ['20 m'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Genie' },
      { key: '_modelo', value: 'Z-60/37' },
    ]
  },
  {
    name: 'Plataforma Telescópica JLG 660SJ',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Plataforma Telescópica JLG 660SJ</h3>
<p>Plataforma telescópica de gran alcance para trabajo en altura.</p>`,
    short_description: 'Plataforma telescópica JLG con altura de trabajo de 22m.',
    sku: 'PLA-JLG660-001',
    regular_price: '160000',
    categories: [{ name: 'Plataformas Elevadoras' }],
    attributes: [
      { name: 'Marca', options: ['JLG'], visible: true },
      { name: 'Modelo', options: ['660SJ'], visible: true },
      { name: 'Altura Trabajo', options: ['22 m'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'JLG' },
      { key: '_modelo', value: '660SJ' },
    ]
  },

  // CAMIONES
  {
    name: 'Camión Tolva Mercedes Actros 4144K',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Camión Tolva Mercedes-Benz Actros 4144K</h3>
<p>Camión volquete de gran capacidad para transporte de áridos y materiales a granel.</p>
<h4>Características:</h4>
<ul>
<li>Motor OM 501 LA de 435 hp</li>
<li>Capacidad tolva: 14 m³</li>
<li>Configuración 8x4</li>
<li>Caja automatizada PowerShift</li>
</ul>`,
    short_description: 'Camión tolva 8x4 de 435 HP con capacidad de 14 m³.',
    sku: 'CAM-MBACT-001',
    regular_price: '320000',
    categories: [{ name: 'Camiones' }],
    attributes: [
      { name: 'Marca', options: ['Mercedes-Benz'], visible: true },
      { name: 'Modelo', options: ['Actros 4144K'], visible: true },
      { name: 'Potencia', options: ['435 HP'], visible: true },
      { name: 'Capacidad', options: ['14 m³'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Mercedes-Benz' },
      { key: '_modelo', value: 'Actros 4144K' },
    ]
  },
  {
    name: 'Camión Mixer Volvo FMX 420',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Camión Mixer Volvo FMX 420</h3>
<p>Camión hormigonero con mezclador de 8 m³ para transporte de hormigón premezclado.</p>`,
    short_description: 'Camión mixer Volvo de 420 HP con capacidad de 8 m³.',
    sku: 'CAM-VOLFMX-001',
    regular_price: '350000',
    categories: [{ name: 'Camiones' }],
    attributes: [
      { name: 'Marca', options: ['Volvo'], visible: true },
      { name: 'Modelo', options: ['FMX 420'], visible: true },
      { name: 'Potencia', options: ['420 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Volvo' },
      { key: '_modelo', value: 'FMX 420' },
    ]
  },
  {
    name: 'Camión Pluma Hiab Scania P360',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Camión con Grúa Hiab Scania P360</h3>
<p>Camión equipado con grúa Hiab para carga y descarga de materiales.</p>`,
    short_description: 'Camión Scania con grúa Hiab de 12 ton/m. Ideal para cargas.',
    sku: 'CAM-SCANP360-001',
    regular_price: '380000',
    categories: [{ name: 'Camiones' }],
    attributes: [
      { name: 'Marca', options: ['Scania'], visible: true },
      { name: 'Modelo', options: ['P360 + Hiab'], visible: true },
      { name: 'Potencia', options: ['360 HP'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Scania' },
      { key: '_modelo', value: 'P360 + Hiab' },
    ]
  },

  // MONTACARGAS
  {
    name: 'Montacargas Toyota 8FG25',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Montacargas Toyota 8FG25</h3>
<p>Montacargas a gas de 2.5 toneladas para operaciones de almacén y logística.</p>
<h4>Características:</h4>
<ul>
<li>Capacidad: 2.500 kg</li>
<li>Altura de levantamiento: 3.000 mm</li>
<li>Motor a gas Toyota</li>
<li>Sistema SAS de estabilidad</li>
</ul>`,
    short_description: 'Montacargas Toyota de 2.5 ton con sistema SAS de estabilidad.',
    sku: 'MON-TOY8FG25-001',
    regular_price: '75000',
    categories: [{ name: 'Montacargas' }],
    attributes: [
      { name: 'Marca', options: ['Toyota'], visible: true },
      { name: 'Modelo', options: ['8FG25'], visible: true },
      { name: 'Capacidad', options: ['2.500 kg'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Toyota' },
      { key: '_modelo', value: '8FG25' },
      { key: '_capacidad', value: '2.500 kg' },
    ]
  },
  {
    name: 'Montacargas Yale GDP50VX',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Montacargas Yale GDP50VX</h3>
<p>Montacargas diésel de 5 toneladas para trabajo pesado.</p>`,
    short_description: 'Montacargas Yale de 5 ton diésel. Para trabajo pesado.',
    sku: 'MON-YALEGDP50-001',
    regular_price: '95000',
    categories: [{ name: 'Montacargas' }],
    attributes: [
      { name: 'Marca', options: ['Yale'], visible: true },
      { name: 'Modelo', options: ['GDP50VX'], visible: true },
      { name: 'Capacidad', options: ['5.000 kg'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Yale' },
      { key: '_modelo', value: 'GDP50VX' },
    ]
  },

  // COMPRESORES
  {
    name: 'Compresor Atlas Copco XAS 186',
    type: 'simple',
    status: 'publish',
    featured: true,
    description: `<h3>Compresor Portátil Atlas Copco XAS 186</h3>
<p>Compresor de aire portátil para herramientas neumáticas en obras.</p>
<h4>Características:</h4>
<ul>
<li>Caudal: 10.6 m³/min</li>
<li>Presión: 7 bar</li>
<li>Motor diésel Deutz</li>
<li>Remolcable con freno</li>
</ul>`,
    short_description: 'Compresor portátil Atlas Copco de 186 CFM. Ideal para obras.',
    sku: 'COM-ATLXAS186-001',
    regular_price: '65000',
    categories: [{ name: 'Compresores' }],
    attributes: [
      { name: 'Marca', options: ['Atlas Copco'], visible: true },
      { name: 'Modelo', options: ['XAS 186'], visible: true },
      { name: 'Caudal', options: ['10.6 m³/min'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Atlas Copco' },
      { key: '_modelo', value: 'XAS 186' },
    ]
  },
  {
    name: 'Compresor Ingersoll Rand P260',
    type: 'simple',
    status: 'publish',
    featured: false,
    description: `<h3>Compresor Portátil Ingersoll Rand P260</h3>
<p>Compresor de alta capacidad para múltiples herramientas.</p>`,
    short_description: 'Compresor Ingersoll Rand de 260 CFM. Alta capacidad.',
    sku: 'COM-IRP260-001',
    regular_price: '85000',
    categories: [{ name: 'Compresores' }],
    attributes: [
      { name: 'Marca', options: ['Ingersoll Rand'], visible: true },
      { name: 'Modelo', options: ['P260'], visible: true },
      { name: 'Caudal', options: ['12.4 m³/min'], visible: true },
    ],
    meta_data: [
      { key: '_marca', value: 'Ingersoll Rand' },
      { key: '_modelo', value: 'P260' },
    ]
  },
];

// Mapa de categorías existentes
const CATEGORY_MAP: Record<string, number> = {
  'Excavadoras': 16,
  'Retroexcavadoras': 17,
  'Bulldozers': 18,
  'Rodillos Compactadores': 19,
  'Cargadores Frontales': 20,
  'Grúas': 21,
  'Minicargadores': 22,
  'Camiones': 23,
  'Generadores': 24,
  'Plataformas Elevadoras': 25,
  'Montacargas': 26,
  'Compresores': 27,
};

// Helper para hacer peticiones
async function wooRequest(endpoint: string, method = 'GET', body?: unknown) {
  const url = new URL(`${WC_API_BASE}${endpoint}`);
  url.searchParams.append('consumer_key', WC_CONSUMER_KEY);
  url.searchParams.append('consumer_secret', WC_CONSUMER_SECRET);

  const options: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url.toString(), options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Error ${response.status}: ${error}`);
  }

  return response.json();
}

async function main() {
  console.log('🚀 Iniciando creación de productos en WooCommerce (sin imágenes)...\n');

  console.log('📦 Creando productos...');

  let created = 0;
  let errors = 0;

  for (const product of PRODUCTS) {
    try {
      // Mapear categorías a IDs
      const categoryIds = product.categories.map(cat => {
        const id = CATEGORY_MAP[cat.name || ''];
        return id ? { id } : null;
      }).filter(Boolean);

      const productData = {
        ...product,
        categories: categoryIds,
      };

      const result = await wooRequest('/products', 'POST', productData);
      console.log(`  ✅ Producto creado: ${product.name} (ID: ${result.id})`);
      created++;

      // Pequeña pausa para no sobrecargar la API
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error: unknown) {
      const err = error as Error;
      console.log(`  ❌ Error creando producto ${product.name}: ${err.message}`);
      errors++;
    }
  }

  console.log('\n✨ Proceso completado!');
  console.log(`   Productos creados: ${created}`);
  console.log(`   Errores: ${errors}`);
  console.log(`   Total procesados: ${PRODUCTS.length}`);
}

main().catch(console.error);
