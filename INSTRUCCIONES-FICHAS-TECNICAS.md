# Instrucciones para Agregar Fichas Técnicas a los Productos

## ✅ Sistema Implementado y Ejecutado

Se ha creado un sistema completo para mostrar y descargar fichas técnicas en las páginas de productos:

- ✅ Página de detalle de producto individual (`/producto/:slug`)
- ✅ Componente visual destacado para fichas técnicas
- ✅ Botón de descarga con iconos y diseño atractivo
- ✅ Integración con WooCommerce Downloads API
- ✅ **Auto-asignación completada: 76 productos con fichas técnicas**

## 🎉 Estado Actual

**Todas las fichas técnicas ya están asignadas a los productos!**

- ✓ 76 productos procesados
- ✓ 76 fichas técnicas asignadas automáticamente
- ✓ 100 PDFs detectados en la biblioteca de WordPress
- ✓ Matching inteligente basado en nombres, marcas y modelos

## 📋 Cómo Agregar Fichas Técnicas

### Opción 1: Manualmente desde WooCommerce (Recomendado)

1. **Inicia sesión en WordPress**
   - Ve a: https://franciscal61.sg-host.com/demosle/wp-admin

2. **Sube los archivos PDF**
   - Ve a: **Medios** > **Añadir nuevo**
   - Arrastra y suelta todos los PDFs de las fichas técnicas
   - Espera a que se suban completamente

3. **Asigna fichas a los productos**
   Para cada producto:
   - Ve a: **Productos** > **Todos los productos**
   - Haz clic en **Editar** en el producto deseado
   - En la pestaña **Datos del producto** > **General**:
     - ✅ Marca la casilla **Descargable**
     - En **Archivos descargables**, haz clic en **Añadir archivo**
     - **Nombre**: "Ficha Técnica" (o el nombre que prefieras)
     - **URL del archivo**: Haz clic en **Elegir archivo** y selecciona el PDF
   - Haz clic en **Actualizar** para guardar

### Opción 2: Programáticamente con el Script

Si tienes muchos productos y quieres automatizar el proceso:

1. **Sube todos los PDFs a WordPress** (igual que en Opción 1)

2. **Copia las URLs de los archivos**
   - Después de subir cada PDF, ve a **Medios** > **Biblioteca**
   - Haz clic en cada archivo y copia la **URL del archivo**

3. **Edita el archivo `add-product-sheets.js`**
   ```javascript
   const productSheets = {
     'SKU-001': 'https://franciscal61.sg-host.com/demosle/wp-content/uploads/ficha-camion-tolva.pdf',
     'SKU-002': 'https://franciscal61.sg-host.com/demosle/wp-content/uploads/ficha-excavadora.pdf',
     // ... agregar todos los productos
   };
   ```

4. **Ejecuta el script**
   ```bash
   node add-product-sheets.js
   ```

## 🎨 Cómo se Visualiza en el Frontend

Cuando un producto tiene una ficha técnica asignada, se mostrará automáticamente en la página del producto:

- **Bloque destacado** con gradiente verde (color primario de FL Rental)
- **Título**: "Ficha Técnica"
- **Descripción**: Texto explicativo sobre el contenido
- **Botón de descarga** con iconos y animación hover
- **Múltiples archivos**: Si un producto tiene varias fichas, se mostrarán todas

### Ejemplo Visual

```
┌─────────────────────────────────────────┐
│  📄 Ficha Técnica                       │
│                                         │
│  Descarga la ficha técnica completa     │
│  con todas las especificaciones         │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │ 📥 Ficha Técnica - Excavadora    →│  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🔍 Verificar que Funciona

1. **Ve a la página de inicio**: http://localhost:5176
2. **Haz clic en cualquier producto** de la sección "Nuestros Equipos"
3. **Verás la página de detalle** con toda la información
4. **Si el producto tiene ficha técnica**, verás el bloque destacado
5. **Haz clic en descargar** y se descargará el PDF

## 📝 Notas Importantes

- Los archivos deben estar en formato **PDF**
- El tamaño máximo depende de la configuración de WordPress (generalmente 2-8 MB)
- Los archivos se guardan en: `wp-content/uploads/YYYY/MM/`
- Puedes agregar múltiples fichas a un mismo producto
- El sistema ya está completamente funcional, solo falta asociar las fichas

## 🛠️ Scripts Disponibles

- `add-product-sheets.js` - Agregar fichas técnicas de forma automatizada
- `check-product-downloads.js` - Verificar qué productos tienen fichas
- `verify-brands-taxonomy.js` - Verificar marcas y estructura de productos

## ❓ Soporte

Si tienes problemas o preguntas sobre cómo implementar las fichas técnicas, revisa:

1. Los logs del script cuando lo ejecutes
2. La consola del navegador si algo no se muestra
3. El panel de WooCommerce para verificar que los archivos están asociados correctamente
