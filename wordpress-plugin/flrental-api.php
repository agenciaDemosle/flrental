<?php
/**
 * Plugin Name: FL Rental API
 * Plugin URI: https://flrental.cl
 * Description: Habilita CORS y endpoints personalizados para FL Rental
 * Version: 1.0.0
 * Author: FL Rental
 * Author URI: https://flrental.cl
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Habilitar CORS para la API REST de WooCommerce
 */
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();

        // Dominios permitidos
        $allowed_origins = array(
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
            'https://franciscal56.sg-host.com',
            'https://flrental.cl',
            'https://www.flrental.cl',
        );

        if ($origin && in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        } else {
            header('Access-Control-Allow-Origin: *');
        }

        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, X-WP-Nonce');
        header('Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages');

        return $value;
    });
}, 15);

/**
 * Manejar solicitudes OPTIONS (preflight)
 */
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*';

        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, X-WP-Nonce');
        header('Access-Control-Max-Age: 86400');

        status_header(200);
        exit();
    }
});

/**
 * Registrar endpoints personalizados para FL Rental
 */
add_action('rest_api_init', function() {
    // Endpoint para obtener categorías de maquinaria
    register_rest_route('flrental/v1', '/categorias', array(
        'methods' => 'GET',
        'callback' => 'flrental_get_categorias',
        'permission_callback' => '__return_true',
    ));

    // Endpoint para obtener productos destacados
    register_rest_route('flrental/v1', '/destacados', array(
        'methods' => 'GET',
        'callback' => 'flrental_get_destacados',
        'permission_callback' => '__return_true',
    ));

    // Endpoint para cotización
    register_rest_route('flrental/v1', '/cotizacion', array(
        'methods' => 'POST',
        'callback' => 'flrental_crear_cotizacion',
        'permission_callback' => '__return_true',
    ));

    // Endpoint de salud/status
    register_rest_route('flrental/v1', '/status', array(
        'methods' => 'GET',
        'callback' => 'flrental_api_status',
        'permission_callback' => '__return_true',
    ));
});

/**
 * Obtener categorías de productos
 */
function flrental_get_categorias() {
    $categories = get_terms(array(
        'taxonomy' => 'product_cat',
        'hide_empty' => false,
        'parent' => 0,
    ));

    $result = array();
    foreach ($categories as $cat) {
        $thumbnail_id = get_term_meta($cat->term_id, 'thumbnail_id', true);
        $image = $thumbnail_id ? wp_get_attachment_url($thumbnail_id) : '';

        $result[] = array(
            'id' => $cat->term_id,
            'name' => $cat->name,
            'slug' => $cat->slug,
            'description' => $cat->description,
            'count' => $cat->count,
            'image' => $image,
        );
    }

    return rest_ensure_response($result);
}

/**
 * Obtener productos destacados
 */
function flrental_get_destacados() {
    $args = array(
        'post_type' => 'product',
        'posts_per_page' => 8,
        'meta_query' => array(
            array(
                'key' => '_featured',
                'value' => 'yes',
            ),
        ),
    );

    $products = wc_get_products(array(
        'featured' => true,
        'limit' => 8,
        'status' => 'publish',
    ));

    $result = array();
    foreach ($products as $product) {
        $result[] = flrental_format_product($product);
    }

    return rest_ensure_response($result);
}

/**
 * Formatear producto para la API
 */
function flrental_format_product($product) {
    $image_id = $product->get_image_id();
    $gallery_ids = $product->get_gallery_image_ids();

    $images = array();
    if ($image_id) {
        $images[] = wp_get_attachment_url($image_id);
    }
    foreach ($gallery_ids as $gal_id) {
        $images[] = wp_get_attachment_url($gal_id);
    }

    $categories = array();
    $terms = get_the_terms($product->get_id(), 'product_cat');
    if ($terms) {
        foreach ($terms as $term) {
            $categories[] = array(
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
            );
        }
    }

    return array(
        'id' => $product->get_id(),
        'name' => $product->get_name(),
        'slug' => $product->get_slug(),
        'permalink' => $product->get_permalink(),
        'description' => $product->get_description(),
        'short_description' => $product->get_short_description(),
        'price' => $product->get_price(),
        'regular_price' => $product->get_regular_price(),
        'sale_price' => $product->get_sale_price(),
        'on_sale' => $product->is_on_sale(),
        'stock_status' => $product->get_stock_status(),
        'featured' => $product->is_featured(),
        'images' => $images,
        'categories' => $categories,
        'attributes' => $product->get_attributes(),
        'meta_data' => array(
            'marca' => get_post_meta($product->get_id(), '_marca', true),
            'modelo' => get_post_meta($product->get_id(), '_modelo', true),
            'año' => get_post_meta($product->get_id(), '_año', true),
            'horas_uso' => get_post_meta($product->get_id(), '_horas_uso', true),
            'capacidad' => get_post_meta($product->get_id(), '_capacidad', true),
            'potencia' => get_post_meta($product->get_id(), '_potencia', true),
        ),
    );
}

/**
 * Crear cotización
 */
function flrental_crear_cotizacion($request) {
    $params = $request->get_json_params();

    // Validar campos requeridos
    $required = array('nombre', 'email', 'telefono', 'productos');
    foreach ($required as $field) {
        if (empty($params[$field])) {
            return new WP_Error('missing_field', "El campo {$field} es requerido", array('status' => 400));
        }
    }

    // Crear entrada de cotización
    $cotizacion_id = wp_insert_post(array(
        'post_type' => 'cotizacion',
        'post_title' => 'Cotización - ' . sanitize_text_field($params['nombre']),
        'post_status' => 'publish',
    ));

    if (is_wp_error($cotizacion_id)) {
        return new WP_Error('create_error', 'Error al crear la cotización', array('status' => 500));
    }

    // Guardar meta datos
    update_post_meta($cotizacion_id, '_nombre', sanitize_text_field($params['nombre']));
    update_post_meta($cotizacion_id, '_email', sanitize_email($params['email']));
    update_post_meta($cotizacion_id, '_telefono', sanitize_text_field($params['telefono']));
    update_post_meta($cotizacion_id, '_empresa', sanitize_text_field($params['empresa'] ?? ''));
    update_post_meta($cotizacion_id, '_rut', sanitize_text_field($params['rut'] ?? ''));
    update_post_meta($cotizacion_id, '_mensaje', sanitize_textarea_field($params['mensaje'] ?? ''));
    update_post_meta($cotizacion_id, '_productos', $params['productos']);
    update_post_meta($cotizacion_id, '_fecha', current_time('mysql'));

    // Enviar email de notificación
    $to = get_option('admin_email');
    $subject = 'Nueva Cotización - FL Rental';
    $message = "Nueva solicitud de cotización:\n\n";
    $message .= "Nombre: " . $params['nombre'] . "\n";
    $message .= "Email: " . $params['email'] . "\n";
    $message .= "Teléfono: " . $params['telefono'] . "\n";
    $message .= "Empresa: " . ($params['empresa'] ?? 'No especificada') . "\n";
    $message .= "RUT: " . ($params['rut'] ?? 'No especificado') . "\n";
    $message .= "Mensaje: " . ($params['mensaje'] ?? 'Sin mensaje') . "\n\n";
    $message .= "Productos solicitados:\n";

    foreach ($params['productos'] as $producto) {
        $message .= "- " . $producto['nombre'] . " (ID: " . $producto['id'] . ")\n";
    }

    wp_mail($to, $subject, $message);

    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Cotización enviada correctamente',
        'cotizacion_id' => $cotizacion_id,
    ));
}

/**
 * Estado de la API
 */
function flrental_api_status() {
    return rest_ensure_response(array(
        'status' => 'ok',
        'version' => '1.0.0',
        'woocommerce' => class_exists('WooCommerce'),
        'timestamp' => current_time('mysql'),
    ));
}

/**
 * Registrar Custom Post Type para Cotizaciones
 */
add_action('init', function() {
    register_post_type('cotizacion', array(
        'labels' => array(
            'name' => 'Cotizaciones',
            'singular_name' => 'Cotización',
            'menu_name' => 'Cotizaciones',
            'add_new' => 'Nueva Cotización',
            'add_new_item' => 'Agregar Nueva Cotización',
            'edit_item' => 'Editar Cotización',
            'view_item' => 'Ver Cotización',
            'all_items' => 'Todas las Cotizaciones',
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-clipboard',
        'supports' => array('title'),
        'capability_type' => 'post',
    ));
});

/**
 * Agregar columnas personalizadas a la lista de cotizaciones
 */
add_filter('manage_cotizacion_posts_columns', function($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = 'Cotización';
    $new_columns['email'] = 'Email';
    $new_columns['telefono'] = 'Teléfono';
    $new_columns['fecha'] = 'Fecha';
    return $new_columns;
});

add_action('manage_cotizacion_posts_custom_column', function($column, $post_id) {
    switch ($column) {
        case 'email':
            echo esc_html(get_post_meta($post_id, '_email', true));
            break;
        case 'telefono':
            echo esc_html(get_post_meta($post_id, '_telefono', true));
            break;
        case 'fecha':
            echo esc_html(get_post_meta($post_id, '_fecha', true));
            break;
    }
}, 10, 2);
