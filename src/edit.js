import { useBlockProps } from "@wordpress/block-editor";
import Sidebar from "./components/Sidebar";
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes }) {
	const { leaderText, ctaText } = attributes;

	return (
		<div {...useBlockProps()}>
			<Sidebar leaderText={leaderText} ctaText={ctaText} />
		</div>
	);
}
