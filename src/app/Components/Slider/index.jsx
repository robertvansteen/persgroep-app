import each from 'lodash/each';
import React, { Component, PropTypes } from 'react';

const Hammer = (typeof window !== 'undefined') ? require('hammerjs') : undefined;

class Slider extends Component {

	/**
	 * Prop types of the component.
	 *
	 * @type {Object}
	 */
	static propTypes = {
		children: PropTypes.node,
		currentPane: PropTypes.number,
		onSlideChange: PropTypes.func,
		transitionSpeed: PropTypes.number,
	}

	/**
	 * Default props of the component.
	 *
	 * @type {Object}
	 */
	static defaultProps = {
		currentPane: 0,
		transitionSpeed: 150,
		onSlideChange: () => {},
	}

	/**
	 * Construct a new component.
	 *
	 * @param  {Object} props
	 * @param  {Object} context
	 *
	 * @return {void}
	 */
	constructor(props, context) {
		super(props, context);
	}

	/**
	 * State of the component.
	 *
	 * @type {Object}
	 */
	state = {
		scrolling: false,
		panning: false,
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
			{ panmove: this.onHorizontalPan,
				panend: this.onHorizontalPanEnd },
		);
		this.bindRecognizers(this.refs.container.childNodes);
		this.moveTo(this.props.currentPane, false);

		requestAnimationFrame(this.updateContainerOffset.bind(this));
	}

	/**
	 * Invoked when the component receives new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.currentPane !== this.props.currentPane) {
			this.moveTo(nextProps.currentPane);
		}
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
	onHorizontalPan = event => {
		let delta = event.deltaX;
		const pane = this.props.currentPane;

		if (this.isFirst(pane) && delta > 0 || this.isLast(pane) && delta < 0) {
			delta = delta * 0.4;
		}

		this.setContainerOffset(-this.props.currentPane * this.paneWidth + delta);
	}

	/**
	 * Invoked when panning ends.
	 *
	 * Here we check if either the panning distance or the velocity is enough to
	 * go to the next or previous pane. Otherwise we snap the pane back to
	 * it's original position.
	 *
	 * @param  {Event} event
	 * @return {void}
	 */
	onHorizontalPanEnd = (event) => {
		const distance = Math.abs(event.deltaX) > this.paneWidth * 0.25;
		const velocity = event.velocityX > 0.3 || event.velocityX < -0.3;

		if (distance || velocity) {
			const nextPane = (event.deltaX > 0) ? this.getPrevious() : this.getNext();
			if (nextPane !== this.props.currentPane) return this.props.onSlideChange(nextPane);
		}

		return this.moveTo(this.props.currentPane);
	}

	/**
	 * Invoked when the browser resizes. When that happens we want to re-calculate
	 * positions & widths.
	 *
	 * @return {void}
	 */
	onResize = () => {
		this.calculateDimensions(this.refs.container);
		this.moveTo(this.props.currentPane, false);
	}

	/**
	 * Set the container offset.
	 * Here we set the container offset on the this context. We do this to increase
	 * the performance of the animations with a 'game loop approach'. Meaning
	 * we call a seperate function to set the actual container offset by using
	 * the browsers' request animation frame, this reads from our latest offset.
	 *
	 * If the animation flag is set to false we just set the offset and be
	 * done with it, otherwise we enable transitions, start the animations &
	 * disable the transitions after the animation is done.
	 *
	 * @param  {Number} offset
	 * @param  {Boolean} animate
	 * @return {void}
	 */
	setContainerOffset(offset, animate = false) {
		this.offset = offset;

		if (animate) {
			this.enableTransition();
			setTimeout(() => this.disableTransition(), this.props.transitionSpeed);
		}
	}

	/**
	 * Get the previous pane.
	 *
	 * @return {void}
	 */
	getPrevious() {
		return this.props.currentPane < 1
			? 0
			: this.props.currentPane - 1;
	}

	/**
	 * Get the next pane.
	 *
	 * @return {void}
	 */
	getNext() {
		const currentPane = this.props.currentPane;
		return currentPane === this.props.children.length - 1
			? currentPane
			: currentPane + 1;
	}

	/**
	 * Update the container offset by reading the latest offset value on the
	 * component & calling request animation frame for a nice and steady 60 fps.
	 *
	 * @return {void}
	 */
	updateContainerOffset() {
		const el = this.refs.container;
		const offset = this.offset;
		el.style.transform = `translateX(${offset}px)`;
		requestAnimationFrame(this.updateContainerOffset.bind(this));
	}

	/**
	 * Check if a pane index is the first.
	 * Which essentialy just checks if it's 0. It's just to provide a consistent
	 * API with checking the dyanmic 'isLast'.
	 *
	 * @param  {Integer} pane
	 * @return {Boolean}
	 */
	isFirst(pane) {
		return pane === 0;
	}

	/**
	 * Check if the pane is the last one.
	 *
	 * @param  {String} pane
	 * @return {Boolean}
	 */
	isLast(pane) {
		return pane === this.props.children.length - 1;
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
		this.refs.container.style.transition = `transform ${speed}s ease-out`;
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
		const panning = new Hammer.Pan({ direction, treshold: 10 });
		hammer.add(panning);
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
	 * The offset for the slider.
	 * This is internally used by requestAnimationFrame for a smooth 60 fps.
	 *
	 * @type {Boolean}
	 */
	offset: 0

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div style={{ overflow: 'hidden' }}>
				<div ref="container" style={{ position: 'relative', willChange: 'transform' }}>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default Slider;
