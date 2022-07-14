<?php
/**
 * Custom metabox.
 *
 * @package EditPasswordProtection
 */

namespace XWP\EditPasswordProtection\PPMetabox;

/**
 * Function to Add a Metabox.
 */
function pp_add_meta_box() {
    add_meta_box( 
        'pp_post_options_metabox', 
        __( 'Password Protect Options', 'password-protection-options' ), 
        __NAMESPACE__ . '\pp_post_options_metabox_html', 
        'post',
        'side',
        'high',
		array( '__back_compat_meta_box' => true ),
    );
}
add_action( 'add_meta_boxes', __NAMESPACE__ . '\\pp_add_meta_box' );

/**
 * Function to post Metabox options.
 * 
 * Don't escape values intentionally since
 * we want to use HTML entities.
 * 
 * @param WP_Post $post Post object.
 */
function pp_post_options_metabox_html( $post ) {
    $leader_value = get_post_meta( $post->ID, '_pp_leader_text_metafield', true );
    $cta_value    = get_post_meta( $post->ID, '_pp_cta_text_metafield', true );

    wp_nonce_field( 'pp_update_post_metabox', 'pp_update_post_nonce' );
    ?>
    <p>
        <label for="pp_leader_text_metafield"><?php esc_html_e( 'Above The Form', 'password-protection-options' ); ?></label>
        <br />
        <textarea class="widefat" type="text" name="pp_leader_text_metafield" id="pp_leader_text_metafield"><?php echo $leader_value; ?></textarea>
    </p>
	<p>
        <label for="pp_cta_text_metafield"><?php esc_html_e( 'Below The Form', 'password-protection-options' ); ?></label>
        <br />
        <textarea class="widefat" type="text" name="pp_cta_text_metafield" id="pp_cta_text_metafield"><?php echo $cta_value; ?></textarea>
    </p>
    <?php
}

/**
 * Function to save metabox.
 * 
 * @param int     $post_id Post ID.
 * @param WP_Post $post    Post object.
 */
function pp_save_post_metabox( $post_id, $post ) {
    $edit_cap = get_post_type_object( $post->post_type )->cap->edit_post;

    if ( !current_user_can( $edit_cap, $post_id ) ) {
        return;
    }

    if ( !isset( $_POST[ 'pp_update_post_nonce' ] ) || !wp_verify_nonce( $_POST[ 'pp_update_post_nonce' ], 'pp_update_post_metabox' ) ) {
        return;
    }

    if ( array_key_exists( 'pp_leader_text_metafield', $_POST ) ) {
        update_post_meta( 
            $post_id, 
            '_pp_leader_text_metafield', 
            current_user_can( 'unfiltered_html' ) ?
				htmlspecialchars( $_POST[ 'pp_leader_text_metafield' ] ) :
				sanitize_text_field( $_POST[ 'pp_leader_text_metafield' ] )
        );
    }

	if ( array_key_exists( 'pp_cta_text_metafield', $_POST ) ) {
		update_post_meta( 
			$post_id, 
			'_pp_cta_text_metafield', 
			current_user_can( 'unfiltered_html' ) ?
				htmlspecialchars( $_POST[ 'pp_cta_text_metafield' ] ) :
				sanitize_text_field( $_POST[ 'pp_cta_text_metafield' ] )
		);
	}
}
add_action( 'save_post', __NAMESPACE__ . '\\pp_save_post_metabox', 10, 2 );
