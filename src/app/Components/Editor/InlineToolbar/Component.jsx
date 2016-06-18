import styles from './style.css';
import StyleButton from '../StyleButton/Component';
import React, { Component, PropTypes } from 'react';

const INLINE_STYLES = [
	{ label: 'B', style: 'BOLD' },
	{ label: 'I', style: 'ITALIC' },
	{ label: 'U', style: 'UNDERLINE' },
];

const BLOCK_STYLES = [
	{ label: 'H1', style: 'header-one' },
	{ label: 'H2', style: 'header-two' },
];

class InlineToolbar extends Component {
	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		onInlineToggle: PropTypes.func.isRequired,
		onBlockToggle: PropTypes.func.isRequired,
		position: PropTypes.object.isRequired,
		editorState: PropTypes.object.isRequired,
	}

	componentDidMount() {
		this.updatePosition();
	}

	componentWillReceiveProps() {
		this.updatePosition();
	}

	updatePosition() {
		const element = this.refs.element;
		const width = element.offsetWidth;
		const height = element.offsetHeight;
		const top = this.props.position.top - (height / 1.75);
		const left = this.props.position.left - (width / 2);

		// if (top < 0) top = 0;
		// if (left < 0) left = 0;

		element.style.top = `${top}px`;
		element.style.left = `${left}px`;
	}

	getCurrentInlineStyle(editorState) {
		return editorState.getCurrentInlineStyle();
	}

	getCurrentBlockType(editorState) {
		const selection = editorState.getSelection();
		return editorState.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();
	}

	render() {
		const editorState = this.props.editorState;
		const currentStyle = this.getCurrentInlineStyle(editorState);
		const currentBlockType = this.getCurrentBlockType(editorState);

		return (
			<div
				ref="element"
				className={styles.toolbar}
			>
				{INLINE_STYLES.map(type =>
					<StyleButton
						key={type.label}
						active={currentStyle.has(type.style)}
						label={type.label}
						onToggle={this.props.onInlineToggle}
						style={type.style}
					/>
				)}
				<span className={styles.divider} />
				{BLOCK_STYLES.map(type =>
					<StyleButton
						key={type.label}
						active={type.style === currentBlockType}
						label={type.label}
						onToggle={this.props.onBlockToggle}
						style={type.style}
					/>
				)}
			</div>
		);
	}
}

export default InlineToolbar;
