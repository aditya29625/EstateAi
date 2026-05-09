<?php
/**
 * Class EstateAI_CPT
 * Handles Property Custom Post Type Registration
 */

if (!defined('ABSPATH')) {
    exit;
}

class EstateAI_CPT {
    public function __construct() {
        add_action('init', array($this, 'register_property_cpt'));
        add_action('add_meta_boxes', array($this, 'add_property_meta_boxes'));
        add_action('save_post', array($this, 'save_property_meta'));
    }

    public function register_property_cpt() {
        $labels = array(
            'name'                  => _x('Properties', 'Post type general name', 'estate-ai'),
            'singular_name'         => _x('Property', 'Post type singular name', 'estate-ai'),
            'menu_name'             => _x('Properties', 'Admin Menu text', 'estate-ai'),
            'name_admin_bar'        => _x('Property', 'Add New on Toolbar', 'estate-ai'),
            'add_new'               => __('Add New', 'estate-ai'),
            'add_new_item'          => __('Add New Property', 'estate-ai'),
            'new_item'              => __('New Property', 'estate-ai'),
            'edit_item'             => __('Edit Property', 'estate-ai'),
            'view_item'             => __('View Property', 'estate-ai'),
            'all_items'             => __('All Properties', 'estate-ai'),
            'search_items'          => __('Search Properties', 'estate-ai'),
            'not_found'             => __('No properties found.', 'estate-ai'),
        );

        $args = array(
            'labels'             => $labels,
            'public'             => true,
            'publicly_queryable' => true,
            'show_ui'            => true,
            'show_in_menu'       => true,
            'query_var'          => true,
            'rewrite'            => array('slug' => 'property'),
            'capability_type'    => 'post',
            'has_archive'        => true,
            'hierarchical'       => false,
            'menu_position'      => 5,
            'menu_icon'          => 'dashicons-admin-home',
            'supports'           => array('title', 'editor', 'thumbnail', 'excerpt'),
            'show_in_rest'       => true, // Enable for Headless
        );

        register_post_type('property', $args);
    }

    public function add_property_meta_boxes() {
        add_meta_box(
            'property_details',
            __('Property Details', 'estate-ai'),
            array($this, 'render_property_meta_box'),
            'property',
            'normal',
            'high'
        );
    }

    public function render_property_meta_box($post) {
        $price = get_post_meta($post->ID, '_property_price', true);
        $address = get_post_meta($post->ID, '_property_address', true);
        $beds = get_post_meta($post->ID, '_property_beds', true);
        $baths = get_post_meta($post->ID, '_property_baths', true);
        $area = get_post_meta($post->ID, '_property_area', true);

        wp_nonce_field('property_meta_nonce', 'property_meta_nonce_field');

        echo '<p><label>Price ($): </label><input type="number" name="property_price" value="' . esc_attr($price) . '" class="widefat"></p>';
        echo '<p><label>Address: </label><input type="text" name="property_address" value="' . esc_attr($address) . '" class="widefat"></p>';
        echo '<p><label>Bedrooms: </label><input type="number" name="property_beds" value="' . esc_attr($beds) . '" class="widefat"></p>';
        echo '<p><label>Bathrooms: </label><input type="number" name="property_baths" value="' . esc_attr($baths) . '" class="widefat"></p>';
        echo '<p><label>Area (Sqft): </label><input type="number" name="property_area" value="' . esc_attr($area) . '" class="widefat"></p>';
    }

    public function save_property_meta($post_id) {
        if (!isset($_POST['property_meta_nonce_field']) || !wp_verify_nonce($_POST['property_meta_nonce_field'], 'property_meta_nonce')) {
            return;
        }

        $fields = ['property_price', 'property_address', 'property_beds', 'property_baths', 'property_area'];
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
            }
        }
    }
}
