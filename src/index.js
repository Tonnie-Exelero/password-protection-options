import { registerBlockType } from "@wordpress/blocks";
import { registerPlugin } from "@wordpress/plugins";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import render from "./components/Sidebar";
import "./style.scss";

/**
 * Register the plugin the Gutenberg way.
 */
registerPlugin("protect-password-protection-options", {
	icon: "visibility",
	render,
});

/**
 * Every block starts by registering a new block type definition.
 */
registerBlockType(metadata.name, {
	edit: Edit,
	save,
});
