<?php
/**
 * Class EstateAI_REST
 * Handles Custom REST API Endpoints
 */

if (!defined('ABSPATH')) {
    exit;
}

class EstateAI_REST {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_endpoints'));
    }

    public function register_endpoints() {
        register_rest_route('estateai/v1', '/properties', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_properties'),
            'permission_callback' => '__return_true',
        ));

        register_rest_route('estateai/v1', '/recommendations', array(
            'methods'  => 'GET',
            'callback' => array($this, 'get_recommendations'),
            'permission_callback' => '__return_true',
        ));
    }

    public function get_properties($request) {
        $args = array(
            'post_type'      => 'property',
            'posts_per_page' => 10,
            'status'         => 'publish'
        );

        $query = new WP_Query($args);
        $properties = [];

        foreach ($query->posts as $post) {
            $properties[] = array(
                'id'      => $post->ID,
                'title'   => $post->post_title,
                'price'   => get_post_meta($post->ID, '_property_price', true),
                'address' => get_post_meta($post->ID, '_property_address', true),
                'beds'    => get_post_meta($post->ID, '_property_beds', true),
                'baths'   => get_post_meta($post->ID, '_property_baths', true),
                'area'    => get_post_meta($post->ID, '_property_area', true),
                'image'   => get_the_post_thumbnail_url($post->ID, 'large')
            );
        }

        return new WP_REST_Response($properties, 200);
    }

    public function get_recommendations($request) {
        // AI Logic placeholder - in production this would call OpenAI embeddings
        return new WP_REST_Response(['message' => 'AI Recommendations placeholder'], 200);
    }
}
