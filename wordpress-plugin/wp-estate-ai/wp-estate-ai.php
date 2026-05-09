<?php
/**
 * Plugin Name: EstateAI - AI-Powered Real Estate Engine
 * Description: Headless WordPress engine for property management, AI recommendations, and custom REST API endpoints.
 * Version: 1.0.0
 * Author: Antigravity AI
 * Text Domain: estate-ai
 */

if (!defined('ABSPATH')) {
    exit;
}

// Define Constants
define('ESTATE_AI_PATH', plugin_dir_path(__FILE__));
define('ESTATE_AI_URL', plugin_dir_url(__FILE__));

// Include Required Files
require_once ESTATE_AI_PATH . 'includes/class-estate-ai-cpt.php';
require_once ESTATE_AI_PATH . 'api/class-estate-ai-rest.php';
require_once ESTATE_AI_PATH . 'includes/class-estate-ai-logic.php';

/**
 * Initialize the Plugin
 */
class EstateAI {
    public function __construct() {
        add_action('init', array($this, 'init'));
        register_activation_hook(__FILE__, array($this, 'activate'));
    }

    public function init() {
        new EstateAI_CPT();
        new EstateAI_REST();
    }

    public function activate() {
        new EstateAI_CPT();
        flush_rewrite_rules();
    }
}

new EstateAI();
