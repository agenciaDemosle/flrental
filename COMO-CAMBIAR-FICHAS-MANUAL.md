# Cómo Cambiar Fichas Técnicas Manualmente en WooCommerce

## 📋 Pasos para Actualizar/Cambiar una Ficha Técnica

### 1. Acceder al Panel de WordPress

1. Ve a: https://franciscal61.sg-host.com/demosle/wp-admin
2. Inicia sesión con tus credenciales

### 2. Ir a la Lista de Productos

1. En el menú lateral izquierdo, busca **Productos**
2. Haz clic en **Todos los productos**
3. Verás la lista completa de tus 76 productos

### 3. Editar el Producto

1. Busca el producto que quieres modificar (puedes usar el buscador)
2. Pasa el mouse sobre el nombre del producto
3. Haz clic en **Editar**

### 4. Configurar Archivos Descargables

Una vez dentro del producto:

1. **Busca la sección "Datos del producto"**
   - Está justo debajo del título del producto
   - Es una caja con pestañas

2. **Ve a la pestaña "General"**
   - Es la primera pestaña por defecto

3. **Marca la casilla "Descargable"**
   - Está cerca del inicio de la pestaña
   - Al marcarla, aparecerá una nueva sección "Archivos descargables"

4. **En "Archivos descargables":**

   **Para AGREGAR una nueva ficha:**
   - Haz clic en **"Añadir archivo"**
   - Verás dos campos:
     - **Nombre**: Escribe "Ficha Técnica" (o el nombre que prefieras)
     - **URL del archivo**: Haz clic en **"Elegir archivo"**
       - Se abrirá la biblioteca de medios
       - Busca tu PDF o sube uno nuevo
       - Haz clic en el PDF que quieres usar
       - Haz clic en **"Insertar en producto"**

   **Para CAMBIAR una ficha existente:**
   - Verás el archivo actual listado
   - Haz clic en el botón **"Elegir archivo"** al lado del campo URL
   - Selecciona el nuevo PDF
   - Haz clic en **"Insertar en producto"**

   **Para ELIMINAR una ficha:**
   - Haz clic en el ícono de **X** (eliminar) al lado del archivo
   - Confirma la eliminación

5. **Límite de descargas (Opcional):**
   - Puedes dejarlo vacío (descargas ilimitadas)
   - O establecer un número máximo de descargas por compra

6. **Días de caducidad (Opcional):**
   - Puedes dejarlo vacío (sin caducidad)
   - O establecer cuántos días estará disponible la descarga

### 5. Guardar los Cambios

1. Scroll hasta arriba de la página
2. Haz clic en el botón azul **"Actualizar"** (esquina superior derecha)
3. Espera a que se guarde (verás un mensaje de confirmación)

## 📸 Referencia Visual

```
┌─────────────────────────────────────────────────┐
│ EDITAR PRODUCTO: Excavadora Caterpillar 350    │
├─────────────────────────────────────────────────┤
│                                                 │
│ Datos del producto                              │
│ ┌─────────────────────────────────────────────┐│
│ │ General | Inventario | Envío | ...          ││
│ ├─────────────────────────────────────────────┤│
│ │                                              ││
│ │ ☑ Virtual                                   ││
│ │ ☑ Descargable  ← MARCA ESTO                ││
│ │                                              ││
│ │ Archivos descargables:                       ││
│ │ ┌──────────────────────────────────────────┐││
│ │ │ Nombre: Ficha Técnica                    │││
│ │ │ URL: .../excavadora.pdf [Elegir archivo] │││
│ │ │                                      [X] │││
│ │ └──────────────────────────────────────────┘││
│ │ [+ Añadir archivo]                          ││
│ │                                              ││
│ └──────────────────────────────────────────────┘│
│                                                 │
│                           [Actualizar] ← CLIC  │
└─────────────────────────────────────────────────┘
```

## 🔄 Casos de Uso Comunes

### Caso 1: Actualizar una ficha con nueva versión
1. Edita el producto
2. En "Archivos descargables", clic en "Elegir archivo"
3. Sube el nuevo PDF o selecciona uno existente
4. Actualizar producto

### Caso 2: Agregar una segunda ficha (manual + especificaciones)
1. Edita el producto
2. Clic en "+ Añadir archivo"
3. Nombre: "Manual de Usuario"
4. Selecciona el archivo
5. Clic en "+ Añadir archivo" nuevamente
6. Nombre: "Especificaciones Técnicas"
7. Selecciona el segundo archivo
8. Actualizar producto

### Caso 3: Eliminar la ficha temporal
1. Edita el producto
2. Clic en la X al lado del archivo
3. Actualizar producto
4. (Opcional) Desmarcar "Descargable" si no habrá más archivos

## ⚡ Tips Rápidos

- **No olvides hacer clic en "Actualizar"** - Los cambios no se guardan automáticamente
- **Puedes tener múltiples archivos** - Un producto puede tener varias fichas
- **Los PDFs deben estar en la biblioteca** - Súbelos primero en Medios > Añadir nuevo
- **Tamaño recomendado** - Mantén los PDFs bajo 5 MB para descarga rápida
- **Nombre descriptivo** - Usa nombres claros como "Ficha Técnica - Excavadora CAT 350"

## 🎯 Acceso Rápido

**URL directa a productos:**
https://franciscal61.sg-host.com/demosle/wp-admin/edit.php?post_type=product

**URL directa a medios:**
https://franciscal61.sg-host.com/demosle/wp-admin/upload.php

## ❓ Problemas Comunes

**P: No veo la opción "Descargable"**
R: Verifica que estés en la pestaña "General" dentro de "Datos del producto"

**P: El archivo no se sube**
R: Verifica el tamaño del archivo (límite de WordPress, generalmente 8-64 MB según hosting)

**P: Los cambios no aparecen en el frontend**
R: Espera unos segundos y refresca la página (Ctrl+F5). Puede haber caché.

**P: Quiero subir un archivo nuevo desde mi computadora**
R: En la biblioteca de medios, haz clic en "Subir archivos" antes de seleccionar

## 🔧 Verificar que Funcionó

Después de guardar:

1. Ve al sitio: http://localhost:5176 (o la URL de producción)
2. Busca el producto que editaste
3. Haz clic para ver el detalle
4. Deberías ver el bloque verde "Ficha Técnica" con el botón de descarga
5. Haz clic en descargar para verificar que es el archivo correcto
