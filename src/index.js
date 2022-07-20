import { registerPlugin } from "@wordpress/plugins";
import { useDispatch, useSelect } from "@wordpress/data";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { BaseControl, CheckboxControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";
import domReady from "@wordpress/dom-ready";

const Sidebar = () => {
	const { password, status, visibility, meta } = useSelect((select) => {
		const editor = select("core/editor");
		const getAttribute = editor.getEditedPostAttribute;

		return {
			password: getAttribute("password"),
			status: getAttribute("status"),
			visibility: editor.getEditedPostVisibility(),
			meta: getAttribute("meta"),
		};
	});
	const { editPost } = useDispatch("core/editor");

	const [isChecked, setChecked] = useState("password" === visibility);

	const leaderText = meta["_pp_leader_text_metafield"];
	const ctaText = meta["_pp_cta_text_metafield"];

	const setPasswordProtection = () => {
		!isChecked ? setChecked(true) : setChecked(false);

		editPost({
			status: visibility === "private" ? "draft" : status,
			password: password || "",
		});
	};

	const parentStyles = {
		display: "flex",
		flexDirection: "column",
		paddingBottom: "20px",
	};
	const childStyles = {
		width: "100%",
		border: "1px solid grey",
		borderRadius: "2px",
		padding: "8px",
	};

	return (
		<PluginDocumentSettingPanel
			name="protect-password-protection-options"
			icon="admin-post"
			title={__("Password Protection Options", "password-protection-options")}
			intialOpen={true}
			style={{ ...parentStyles }}
		>
			<CheckboxControl
				label="Enable Password Protection"
				help="Add password protection to the post"
				checked={isChecked}
				onChange={setPasswordProtection}
			/>
			{isChecked && (
				<>
					<BaseControl
						id="password-text"
						label={__("Password", "password-protection-options")}
					>
						<RichText
							className="block__text"
							keepPlaceholderOnFocus
							onChange={(value) => {
								editPost({
									password: value,
								});
							}}
							placeholder={__("Enter password", "password-protection-options")}
							tagName="p"
							value={password}
							style={{ ...childStyles, marginBottom: "20px" }}
						/>
					</BaseControl>
					<BaseControl
						id="leader-text"
						label={__("Above The Form", "password-protection-options")}
					>
						<RichText
							className="block__text"
							keepPlaceholderOnFocus
							onChange={(value) => {
								editPost({
									meta: {
										_pp_leader_text_metafield: value,
									},
								});
							}}
							placeholder={__(
								"Enter rich text that will appear above the password form",
								"password-protection-options"
							)}
							tagName="p"
							value={leaderText}
							style={{ ...childStyles, marginBottom: "20px" }}
						/>
					</BaseControl>
					<BaseControl
						id="cta-text"
						label={__("Below The Form", "password-protection-options")}
					>
						<RichText
							className="block__text"
							keepPlaceholderOnFocus
							onChange={(value) => {
								editPost({
									meta: {
										_pp_cta_text_metafield: value,
									},
								});
							}}
							placeholder={__(
								"Enter rich text that will appear below the password form",
								"password-protection-options"
							)}
							tagName="p"
							value={ctaText}
							style={childStyles}
						/>
					</BaseControl>
				</>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default () => {
	domReady(() => {
		registerPlugin("protect-password-protection-options", {
			icon: "visibility",
			render() {
				return <Sidebar />;
			},
		});
	});
};
