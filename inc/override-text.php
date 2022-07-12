<?php
/**
 * Override Password Protection text.
 * 
 * @package EditPasswordProtection
 */

namespace XWP\EditPasswordProtection\PPOverrideText;

/**
 * Override the default password protection text.
 * 
 * @param string  $output The password form HTML output.
 * @param WP_Post $post   Post object.
 * 
 * @return string HTML content for password form for password protected post.
 */
function custom_form_overrides( $output, $post = 0 ) {
    $post   = get_post( $post );
	$label  = 'pwbox-' . ( empty( $post->ID ) ? wp_rand() : $post->ID );
	$leader_value = htmlspecialchars_decode( get_post_meta( $post->ID, '_pp_leader_text_metafield', true ) );
    $cta_value = htmlspecialchars_decode( get_post_meta( $post->ID, '_pp_cta_text_metafield', true ) );
	
	// Custom Styles
	$container_styles = '
		width: 100%;
		margin: 0 auto;
		border: 1px solid #000;
		padding: 0 20px;
	';
	$submit_styles = '
	    border: 0;
		border-radius: 0;
		font-size: 0.9rem;
		line-height: 1;
		padding: 0.4em 2em 0.4em;
		height: 2.2rem;
	';

	$output = '
	<div class="post-password-container" style="' . $container_styles . '">
	<p class="post-password-message">' . $leader_value . '</p>
	<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" class="post-password-form" method="post" style="display: flex; align-items: center; margin-bottom: 10px;">
	<label class="post-password-form__label" for="' . esc_attr( $label ) . '" style="margin: 0 10px 0 0;">' . esc_html_x( 'Password:', 'Post password form', 'password-protection-options' ) . '</label>
	<input class="post-password-form__input" name="post_password" id="' . esc_attr( $label ) . '" type="password" size="20" style="margin: 0 10px 0 0; padding: 6px; border-radius: 0;" />
	<input type="submit" class="post-password-form__submit" name="' . esc_attr_x( 'Submit', 'Post password form', 'password-protection-options' ) . '" value="' . esc_attr_x( 'Enter', 'Post password form', 'password-protection-options' ) . '" style="' . $submit_styles . '" />
	</form>
	<p class="post-password-message">' . $cta_value . '</p>
	<div>
	';

	return $output;
}   
add_filter( 'the_password_form', __NAMESPACE__ . '\\custom_form_overrides', 10, 2 );
