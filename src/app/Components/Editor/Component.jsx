import 'draft-js/dist/Draft.css';
import styles from './style.css';
import ActionBar from './ActionBar/Component';
import TitleInput from './TitleInput/Component';
import Button from 'Components/Button/Component';
import { stateToHTML } from 'draft-js-export-html';
import React, { Component, PropTypes } from 'react';
import InlineToolbar from './InlineToolbar/Component';
import {
	Editor,
	RichUtils,
	EditorState,
	getVisibleSelectionRect
} from 'draft-js';

class EditorComponent extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		onSave: PropTypes.func,
	}

	/**
	 * The state of the component.
	 *
	 * @type {Object}
	 */
	state = {
		title: null,
		editorState: EditorState.createEmpty(),
		inlineToolbar: {
			show: false,
			position: { top: 0, left: 0 },
		},
	}

	/**
	 * Invoked when the title is changed.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onTitleChange = (event) => {
		this.setState({ title: event.target.value });
	}

	/**
	 * Invoked when the editor changes.
	 *
	 * @param  {Object} editorState
	 * @return {void}
	 */
	onChange = (editorState) => {
		const selection = editorState.getSelection();

		if (!selection.isCollapsed()) {
			this.onSelect(selection);
		} else {
			this.setState({ inlineToolbar: { show: false } });
		}

		this.setState({ editorState });
	}

	/**
	 * Invoked when there is a selection active.
	 * This event is sometimes called after the editor is blurred.
	 * Therefore we check if there are range bounds, if not we hide the
	 * toolbar.
	 *
	 * @return {[type]} [description]
	 */
	onSelect() {
		const rangeBounds = getVisibleSelectionRect(window);

		if (!rangeBounds) {
			this.refs.instance.blur();
			return this.setState({ inlineToolbar: { show: false } });
		}

		const container = this.refs.instance.refs.editorContainer;
		const editorBounds = container.getBoundingClientRect();
		const position = this.getToolbarPosition(rangeBounds, editorBounds);
		this.setState({ inlineToolbar: { show: true, position } });
	}

	/**
	 * Invoked when the editor blurs.
	 *
	 * @return {void}
	 */
	onBlur = () => {
		this.setState({ inlineToolbar: { show: false } });
	}

	/**
	 * Invoked when the publish button is clicked.
	 *
	 * @return {void}
	 */
	onPublishClick = () => {
		const contentState = this.state.editorState.getCurrentContent();
		const content = stateToHTML(contentState);
		this.props.onSave({ title: this.state.title, body: content });
	}

	/**
	 * Get the position of the toolbar.
	 *
	 * @param  {Object} rangeBounds
	 * @param  {Object} editorBounds
	 * @return {Object}
	 */
	getToolbarPosition = (rangeBounds, editorBounds) => {
		const top = rangeBounds.top - editorBounds.top;
		const left = (rangeBounds.left - editorBounds.left) + (rangeBounds.width / 2);
		return { top, left };
	}

	/**
	 * Get the style for the block type.
	 *
	 * @param  {Object} contentBlock
	 * @return {String}
	 */
	getBlockStyle(contentBlock) {
		const type = contentBlock.getType();
		return styles[type];
	}

	/**
	 * Toggle the block type.
	 *
	 * @param  {Object} blockType
	 * @return {void}
	 */
	toggleBlockType = (blockType) => {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	/**
	 * Toggle the inline style.
	 *
	 * @param  {Object} inlineStyle
	 * @return {void}
	 */
	toggleInlineStyle = (inlineStyle) => {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	/**
	 * Render the inline toolbar.
	 *
	 * @return {ReactElement|null}
	 */
	renderInlineToolbar() {
		if (!this.state.inlineToolbar.show) return null;

		return (
			<InlineToolbar
				onInlineToggle={this.toggleInlineStyle}
				onBlockToggle={this.toggleBlockType}
				editorState={this.state.editorState}
				position={this.state.inlineToolbar.position}
			/>
		);
	}


	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div className={styles.container}>
				<ActionBar
					onPublish={this.onPublishClick}
				/>
				<div className={styles.editor_wrapper}>
					<TitleInput
						placeholder="Titel"
						onChange={this.onTitleChange}
					/>
					<div className={styles.editor}>
						{this.renderInlineToolbar()}
						<Editor
							ref="instance"
							className={styles.editor}
							placeholder="Schrijf een verhaal"
							onBlur={this.onBlur}
							onChange={this.onChange}
							blockStyleFn={this.getBlockStyle}
							editorState={this.state.editorState}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default EditorComponent;
