<?php
/**
 * Plugin Name:       Password Protection Options
 * Description:       Custom field options for extending core WordPress password protection 
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            XWP, Tonnie Exelero
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       password-protection-options
 *
 * @package           PasswordProtectionOptions
 */

namespace XWP\PasswordProtectionOptions;

const MAIN_DIR = __DIR__;

if( ! defined( 'ABSPATH') ) {
    exit;
}

// Custom Metabox.
include_once MAIN_DIR . '/inc/metabox.php';

// Override Text.
include_once MAIN_DIR . '/inc/override-text.php';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function password_protection_options_block_init() {
	register_block_type( MAIN_DIR . '/build' );
}
add_action( 'init', __NAMESPACE__ . '\\password_protection_options_block_init' );

function password_protect_options_plugin_register_post_meta() {
    register_post_meta(
        '',
        '_pp_leader_text_metafield',
        [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'sanitize_callback' => 'sanitize_text_field',
			'auth_callback' => function() { 
				return current_user_can( 'edit_posts' );
			},
        ]
    );

	register_post_meta(
        '',
        '_pp_cta_text_metafield',
        [
            'show_in_rest'  => true,
            'single'        => true,
            'type'          => 'string',
            'sanitize_callback' => 'sanitize_text_field',
			'auth_callback' => function() { 
				return current_user_can( 'edit_posts' );
			},
        ]
    );
}
add_action( 'init', __NAMESPACE__ . '\\password_protect_options_plugin_register_post_meta' );
