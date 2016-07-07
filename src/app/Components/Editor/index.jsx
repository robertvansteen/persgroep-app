/* eslint-disable no-param-reassign */

import uuid from 'node-uuid';
import 'draft-js/dist/Draft.css';
import styles from './style.css';
import reduce from 'lodash/reduce';
import Sidebar from './Sidebar/Component';
import ImageComponent from './Entities/Image';
import ActionBar from './ActionBar/Component';
import TitleInput from './TitleInput/Component';
import React, { Component, PropTypes } from 'react';
import InlineToolbar from './InlineToolbar/Component';
import { getSelectionRange, getSelectedBlockElement } from './Utils';
import {
	Editor,
	Entity,
	RichUtils,
	EditorState,
	convertToRaw,
	AtomicBlockUtils,
	getVisibleSelectionRect,
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
		focus: false,
		editorState: EditorState.createEmpty(),
		inlineToolbar: {
			show: false,
			position: { top: 0, left: 0 },
		},
		sidebar: {
			position: 0,
		},
	}

	/**
	 * Invoked when the title is changed.
	 *
	 * @param	{Event} event
	 * @return {void}
	 */
	onTitleChange = (event) => {
		this.setState({ title: event.target.value });
	}

	/**
	 * Invoked when the editor changes.
	 *
	 * @param	{Object} editorState
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
		setTimeout(this.updateSelection.bind(this), 0);
	}

	/**
	 * Invoked when there is a selection active.
	 * This event is sometimes called after the editor is blurred.
	 * Therefore we check if there are range bounds, if not we hide the
	 * toolbar.
	 *
	 * @return {void}
	 */
	onSelect() {
		const rangeBounds = getVisibleSelectionRect(window);

		if (!rangeBounds) {
			this.refs.instance.blur();
			return this.setState({ inlineToolbar: { show: false } });
		}

		const container = this.refs.instance.refs.editorContainer;
		const editorBounds = container.getBoundingClientRect();
		const toolbarPosition = this.getToolbarPosition(rangeBounds, editorBounds);
		this.setState({ inlineToolbar: { show: true, position: toolbarPosition } });
	}

	/**
	 * Invoked when the editor focusses.
	 *
	 * @return {void}
	 */
	onFocus = () => {
		this.setState({ focus: true });
	}

	/**
	 * Invoked when the editor blurs.
	 *
	 * @return {void}
	 */
	onBlur = () => {
		this.setState({ focus: false, inlineToolbar: { show: false } });
	}

	/**
	 * Invoked when the publish button is clicked.
	 *
	 * @return {void}
	 */
	onPublishClick = () => {
		const contentState = this.state.editorState.getCurrentContent();
		const raw = convertToRaw(contentState);
		const draft = JSON.stringify(raw);
		const files = reduce(raw.entityMap, (prev, { data }) => {
			prev[data.id] = data.file;
			return prev;
		}, {});
		this.props.onSave({ title: this.state.title, draft }, files);
	}

	/**
	 * Invoked when upload button is clicked.
	 *
	 * @return {void}
	 */
	onUploadClick = () => {
		this.refs.fileInput.click();
	}

	/**
	 * Get the position of the toolbar.
	 *
	 * @param	{Object} rangeBounds
	 * @param	{Object} editorBounds
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
	 * @param	{Object} contentBlock
	 * @return {String}
	 */
	getBlockStyle(contentBlock) {
		const type = contentBlock.getType();
		return styles[type];
	}

	updateSelection() {
		const selectionRange = getSelectionRange();
		let selectedBlock;
		if (selectionRange) {
			selectedBlock = getSelectedBlockElement(selectionRange);
		}
		this.setState({
			selectedBlock,
			selectionRange,
		});
	}

	/**
	 * Handle the file input when an image is being uploaded.
	 *
	 * @param	{Event} event
	 * @return {void}
	 */
	handleFileInput = (event) => {
		const files = Array.prototype.slice.call(event.target.files, 0);
		files.forEach(this.insertImage);
	}

	/**
	 * Insert image.
	 *
	 * @param	{File} file
	 * @return {void}
	 */
	insertImage = (file) => {
		const id = uuid.v4();
		const source = { src: URL.createObjectURL(file), id, file };
		const entityKey = Entity.create('atomic', 'IMMUTABLE', source);
		this.onChange(
			AtomicBlockUtils.insertAtomicBlock(
				this.state.editorState,
				entityKey,
				' ',
			)
		);
	}

	/**
	 * Toggle the block type.
	 *
	 * @param	{Object} blockType
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
	 * @param	{Object} inlineStyle
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
	 * Define the renders for blocks.
	 *
	 * @param	{Object} block
	 * @return {void}
	 */
	blockRenderer = (block) => {
		if (block.getType() === 'atomic') {
			return {
				component: ImageComponent,
			};
		}

		return null;
	}

	/**
	 * Handle key commands.
	 *
	 * @param  {Object} command
	 * @return {Boolean}
	 */
	handleKeyCommand = command => {
		const { editorState } = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
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
	 * Render the sidebar.
	 *
	 * @return {ReactElement}
	 */
	renderSidebar() {
		let offsetTop = 0;

		if (this.state.selectedBlock) {
			const container = this.refs.instance.refs.editorContainer;
			const editorBounds = container.getBoundingClientRect();
			const blockBounds = this.state.selectedBlock.getBoundingClientRect();
			offsetTop = (blockBounds.bottom - editorBounds.top) - 18;
		}

		return (
			<Sidebar
				offsetTop={offsetTop}
				onUploadClick={this.onUploadClick}
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
						{this.renderSidebar()}
						<Editor
							ref="instance"
							className={styles.editor}
							placeholder="Schrijf een verhaal"
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onChange={this.onChange}
							blockStyleFn={this.getBlockStyle}
							editorState={this.state.editorState}
							blockRendererFn={this.blockRenderer}
							handleKeyCommand={this.handleKeyCommand}
						/>
					</div>
				</div>

				<input
					type="file" ref="fileInput"
					style={{ display: 'none' }}
					onChange={this.handleFileInput}
				/>
			</div>
		);
	}
}

export default EditorComponent;
