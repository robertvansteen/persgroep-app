import React, { Component, PropTypes } from 'react';

const isBrowser = typeof window !== 'undefined';
const Flickity = isBrowser ? require('flickity') : undefined;

if (Flickity) {
	Flickity.prototype.hasDragStarted = function(moveVector) {
		return !this.isTouchScrolling && Math.abs(moveVector.x) > 25;
	};
}

class Swiper extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		children: PropTypes.node,
		options: PropTypes.object,
		onSlideChange: PropTypes.func,
	}

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
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		this.initializeSwiper();
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

		if (!cell || !viewport) return false;

		viewport.style.height = `${cell.size.height}px`;
	}

	/**
	 * Slide to a certain cell.
	 *
	 * @param  {Integer} index
	 * @return {void}
	 */
	slide(index) {
		this.swiper.select(index);
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
