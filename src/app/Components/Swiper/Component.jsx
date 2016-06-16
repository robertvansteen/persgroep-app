import React, { Component } from 'react';

const isBrowser = typeof window !== 'undefined';
const Flickity = isBrowser ? require('flickity') : undefined;

if (Flickity) {
	Flickity.prototype.hasDragStarted = function(moveVector) {
		return !this.isTouchScrolling && Math.abs(moveVector.x) > 25;
	};
}


class Swiper extends Component {

	/**
	 * The default props of the element.
	 *
	 * @type {Object}
	 */
	static defaultProps = {
		options: {},
		onSlideChange: () => {},
	}

	/**
	 * Invoked when the component is updated.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentDidUpdate(nextProps) {
		if (nextProps.children.length !== this.props.children.length) {
			this.initializeSwiper();
		}
	}

	/**
	 * Initialize the swiper.
	 *
	 * @return {void}
	 */
	initializeSwiper() {
		if (this.swiper) this.swiper.destroy();
		const element = this.refs.element;
		this.swiper = new Flickity(element, this.props.options);
		this.swiper.on('settle', this.onSlideChange);
		this.updateHeight();
	}

	/**
	 * Update height of the viewport to match the current cell.
	 *
	 * @return {void}
	 */
	updateHeight() {
		const cell = this.swiper.selectedCell;
		const viewport = this.refs.element.querySelector('.flickity-viewport');
		viewport.style.height = cell.size.height + 'px';
	}

	/**
	 * Invoked when the slide is changed.
	 *
	 * @return {void}
	 */
	onSlideChange = () => {
		const newIndex = this.swiper.selectedIndex;
		const newCell = this.swiper.selectedCell;
		this.updateHeight();
		this.props.onSlideChange(newIndex, newCell);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div ref="element">
				{this.props.children}
			</div>
		);
	}
}

export default Swiper;
