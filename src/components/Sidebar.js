import { dispatch, select } from "@wordpress/data";
import { PluginDocumentSettingPanel } from "@wordpress/edit-post";
import { BaseControl, CheckboxControl } from "@wordpress/components";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";

const decodeEntity = (inputStr) => {
	const textarea = document.createElement("textarea");
	textarea.innerHTML = inputStr;
	return textarea.value;
};

const Sidebar = ({ leaderText, ctaText }) => {
	const status = select("core/editor").getEditedPostAttribute("status");
	const visibility = select("core/editor").getEditedPostVisibility();
	const password = select("core/editor").getEditedPostAttribute("password");
	const meta = select("core/editor").getEditedPostAttribute("meta");

	const [isChecked, setChecked] = useState("password" === visibility);

	const leader_text = meta["_pp_leader_text_metafield"];
	const cta_text = meta["_pp_cta_text_metafield"];

	const setPasswordProtection = () => {
		!isChecked ? setChecked(true) : setChecked(false);

		dispatch("core/editor").editPost({
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
								dispatch("core/editor").editPost({
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
						label={__("Leader Text", "password-protection-options")}
					>
						<RichText
							className="block__text"
							keepPlaceholderOnFocus
							onChange={(value) => {
								dispatch("core/editor").editPost({
									meta: {
										_pp_leader_text_metafield: value,
									},
								});
							}}
							placeholder={__(
								decodeEntity(leader_text),
								"password-protection-options"
							)}
							tagName="p"
							value={leaderText}
							style={{ ...childStyles, marginBottom: "20px" }}
						/>
					</BaseControl>
					<BaseControl
						id="cta-text"
						label={__("CTA Text", "password-protection-options")}
					>
						<RichText
							className="block__text"
							keepPlaceholderOnFocus
							onChange={(value) => {
								dispatch("core/editor").editPost({
									meta: {
										_pp_cta_text_metafield: value,
									},
								});
							}}
							placeholder={__(
								decodeEntity(cta_text),
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

export default Sidebar;
