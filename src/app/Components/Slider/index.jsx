import each from 'lodash/each';
import React, { Component, PropTypes } from 'react';

const Hammer = (typeof window !== 'undefined') ? require('hammerjs') : undefined;

const DIRECTION_LEFT = 2;
const DIRECTION_RIGHT = 4;

class Slider extends Component {

	/**
	 * Prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		children: PropTypes.node,
		initialPane: PropTypes.number,
		onSlideChange: PropTypes.func,
		transitionSpeed: PropTypes.number,
	}

	/**
	 * Default props of the component.
	 *
	 * @type {Object}
	 */
	static defaultProps = {
		transitionSpeed: 200,
		onSlideChange: () => {},
		initialPane: 0,
	}

	/**
	 * State of the component.
	 *
	 * @type {Object}
	 */
	state = {
		scrolling: false,
		panning: false,
		currentPane: this.props.initialPane,
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		this.calculateDimensions(this.refs.container);

		window.addEventListener('resize', this.onResize);
		this.horizontalRecognizer = this.createRecognizer(
			this.refs.container,
			Hammer.DIRECTION_HORIZONTAL,
			{ panmove: this.onHorizontalPan, panend: this.onHorizontalPanEnd }
		);
		this.bindRecognizers(this.refs.container.childNodes);
		this.moveTo(this.state.currentPane, false);
	}

	/**
	 * Invoked when the component did update.
	 * Here we re-calculate the widths & move the current pane in correct
	 * position.
	 *
	 * @param  {Object} prevProps
	 * @return {void}
	 */
	componentDidUpdate(prevProps) {
		if (prevProps.children.length !== this.props.children.length) {
			this.calculateDimensions(this.refs.container);
			this.moveTo(this.state.currentPane, false);
			this.bindRecognizers(this.refs.container.childNodes);
		}
	}

	/**
	 * Invoked when the component will unmount from the DOM.
	 *
	 * @return {void}
	 */
	componentWillUnmount() {
		window.removeEventListener('resize', this.onResize);
	}

	/**
	 * Invoked when panning starts, here we can determine the direction of the
	 * pan.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onPanStart = (event) => {
		this.angle = event.angle;
	}

	/**
	 * Invoked when the user pans. Depending on the direction when the panning
	 * starts we either allow default browser behaviour (vertical) or set the
	 * offset (horizontal).
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onHorizontalPan = (event) => {
		this.setContainerOffset(-this.state.currentPane * this.paneWidth + event.deltaX);
	}

	/**
	 * Invoked when panning ends. Here we check if the user moved the pane enough
	 * to move to the next or previous one. Otherwise we reset the current back
	 * in position.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onHorizontalPanEnd = (event) => {
		if (Math.abs(event.deltaX) > this.paneWidth * 0.25) {
			if (event.deltaX > 0) {
				this.prev();
			} else {
				this.next();
			}
		} else {
			this.moveTo(this.state.currentPane);
		}
	}

	onSwipe = (event) => {
		if (event.direction === DIRECTION_LEFT) this.next();
		if (event.direction === DIRECTION_RIGHT) this.prev();
	}

	/**
	 * Invoked when the browser resizes. When that happens we want to re-calculate
	 * positions & widths.
	 *
	 * @return {void}
	 */
	onResize = () => {
		this.calculateDimensions(this.refs.container);
		this.moveTo(this.state.currentPane, false);
	}

	/**
	 * Set the container offset.
	 *
	 * @param  {Number} offset
	 * @param  {Boolean} animate
	 * @return {void}
	 */
	setContainerOffset(offset, animate = false) {
		if (!animate) {
			this.refs.container.style.transform = `translateX(${offset}px)`;
			return true;
		}

		this.enableTransition();
		this.refs.container.style.transform = `translateX(${offset}px)`;
		setTimeout(() => this.disableTransition(), this.props.transitionSpeed);
	}

	/**
	 * Determine if panning is horizontal. We do this by checking the angle
	 * against pre-determined angles that we consider 'horizontal'.
	 *
	 * @param  {Number} angle
	 * @return {Boolean}
	 */
	isPanningHorizontal(angle) {
		const left = (angle > 150 || angle < -150);
		const right = (angle < 30 && angle > -30);
		return left || right;
	}

	/**
	 * Move to a specified pane (index).
	 * We do this by setting the offset based on the pane index times the width.
	 * You can flag if you want the transition to be animated, true by default.
	 *
	 * @param  {Number} pane
	 * @param  {Boolean} animate
	 * @return {void}
	 */
	moveTo(pane, animate = true) {
		this.setContainerOffset(-pane * this.paneWidth, animate);

		if (pane !== this.state.currentPane) {
			this.setState({ currentPane: pane });
		}

		setTimeout(
			() => this.props.onSlideChange(pane),
			animate ? this.props.transitionSpeed : 0
		);
	}

	/**
	 * Go to the previous pane.
	 *
	 * @return {void}
	 */
	prev() {
		const previousPane = this.state.currentPane < 1
			? 0
			: this.state.currentPane - 1;

		this.moveTo(previousPane, true);
	}

	/**
	 * Go to the next pane.
	 *
	 * @return {void}
	 */
	next() {
		const currentPane = this.state.currentPane;
		const nextPane = currentPane === this.props.children.length - 1
			? currentPane
			: currentPane + 1;

		this.moveTo(nextPane, true);
	}

	/**
	 * Calculate the dimensions of the panes & container and set the width
	 * of the container accordingly.
	 *
	 * @param  {DOMElement} container
	 * @return {void}
	 */
	calculateDimensions(container) {
		this.width = this.calculateWidth(container);
		this.paneWidth = this.calculatePaneWidth(container);
		this.refs.container.style.width = `${this.width}px`;
	}

	/**
	 * Calculate the width of the pane.
	 * Right now we only support panes of the same width so we just grab the first
	 * one and determine it's width.
	 *
	 * @param  {DOMElement} container
	 * @return {Number}
	 */
	calculatePaneWidth(container) {
		const nodes = [].slice.call(container.childNodes);
		if (nodes.length < 1) return 0;
		return nodes[0].offsetWidth;
	}

	/**
	 * Calculate the width of the container.
	 *
	 * @param  {DOMElement} container
	 * @return {Number}
	 */
	calculateWidth(container) {
		const nodes = [].slice.call(container.childNodes);
		return nodes.reduce((prev, current) => prev + current.offsetWidth, 0);
	}

	/**
	 * Enable transitions by adding CSS property to the container.
	 *
	 * @return {void}
	 */
	enableTransition() {
		const speed = this.props.transitionSpeed / 1000;
		this.refs.container.style.transition = `transform ${speed}s ease-in`;
	}

	/**
	 * Disable transitions by removing CSS property from the container.
	 *
	 * @return {void}
	 */
	disableTransition() {
		this.refs.container.style.transition = '';
	}

	/**
	* Create a touch recognizer.
	*
	* @param  {DOMElement} element
	* @param  {Number} direction
	* @param  {Events} events
	* @return {Object}
	*/
	createRecognizer(element, direction, events = {}) {
		const hammer = new Hammer.Manager(element, { touchAction: 'pan-y' });
		hammer.add(new Hammer.Pan({ direction, treshold: 10 }));
		each(events, (cb, event) => hammer.on(event, cb));
		return hammer;
	}

	/**
	 * Bind the recognizers for the children.
	 *
	 * @param  {Nodelist} nodeList
	 * @return {void}
	 */
	bindRecognizers(nodeList = []) {
		const nodes = [].slice.call(nodeList);
		nodes.forEach(node => {
			const recognizer = this.createRecognizer(node, Hammer.DIRECTION_VERTICAL);
			this.horizontalRecognizer.get('pan').requireFailure(recognizer.get('pan'));
		});
	}

	/**
	 * Width of a pane.
	 *
	 * @type {Number}
	 */
	paneWidth: 0

	/**
	 * Total width of the slider.
	 *
	 * @type {Number}
	 */
	width: 0

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div style={{ overflow: 'hidden' }}>
				<div ref="container" style={{ position: 'relative' }}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Slider;
