import 'draft-js/dist/Draft.css';
import styles from './style.css';
import React, { Component } from 'react';
import { publishStory } from 'Sources/Stories';
import Button from 'Components/Button/Component';
import { stateToHTML } from 'draft-js-export-html';
import InlineToolbar from './InlineToolbar/Component';
import {
	Editor,
	RichUtils,
	EditorState,
	getVisibleSelectionRect
} from 'draft-js';

class EditorComponent extends Component {
	state = {
		editorState: EditorState.createEmpty(),
		inlineToolbar: {
			show: false,
			position: { top: 0, left: 0 },
		},
	}

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

	onBlur = () => {
		this.setState({ inlineToolbar: { show: false } });
	}

	getToolbarPosition = (rangeBounds, editorBounds) => {
		const top = rangeBounds.top - editorBounds.top;
		const left = rangeBounds.left + (rangeBounds.width / 2);
		return { top, left };
	}

	toggleBlockType = (blockType) => {
		this.onChange(
			RichUtils.toggleBlockType(
				this.state.editorState,
				blockType
			)
		);
	}

	toggleInlineStyle = (inlineStyle) => {
		this.onChange(
			RichUtils.toggleInlineStyle(
				this.state.editorState,
				inlineStyle
			)
		);
	}

	getBlockStyle(contentBlock) {
		const type = contentBlock.getType();
		return styles[type];
	}

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

	onPublishClick = () => {
		const contentState = this.state.editorState.getCurrentContent();
		const content = stateToHTML(contentState);
		publishStory({ title: 'foo', body: content });
	}

	render() {
		return (
			<div className={styles.wrapper}>
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
				<Button onClick={this.onPublishClick} label='Publish' />
			</div>
		);
	}
}

export default EditorComponent;
