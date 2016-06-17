import { observer } from 'mobx-react';
import StoryStore from 'Domain/Story/Store';
import categories from 'Collections/Categories';
import React, { Component, PropTypes } from 'react';
import Category from 'Components/Category/Component';
import { fetchCategories } from 'Sources/Categories';
import { fetchStoriesByCategory } from 'Sources/Stories';
import CategoryList from 'Components/CategoryList/Component';

class CategoryContainer extends Component {

	/**
	 * Define the prop types for the component.
	 *
	 * @type {Object}
	*/
	static propTypes = {
		params: PropTypes.object,
	}

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		fetchCategories()
			.then(() => this.fetchStories(this.props.params.id));
	}

	/**
	 * Invoked when the component is receiving new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			this.fetchStories(nextProps.params.id);
		}
	}

	/**
	 * Invoked when clicked on a story.
	 *
	 * @return {void}
	 */
	onStoryClick = () => {
		StoryStore.context = categories.find(this.props.params.id).topStories_id;
	}

	/**
	 * Fetch the stories by the currently visisted category.
	 * Only fetch it if we don't have topstories for said category.
	 *
	 * @param  {String} categoryId
	 *
	 * @return {void}
	 */
	fetchStories(categoryId) {
		const category = categories.find(categoryId);
		if (category.topStories_id.length > 0) return false;

		return fetchStoriesByCategory(categoryId)
			.then(data => category.topStories_id = data.result.data);
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		if (!categories.find(this.props.params.id)) {
			return (<div>Loading...</div>);
		}

		return (
			<div>
				<CategoryList categories={categories.all()} />
				<Category
					onClick={this.onStoryClick}
					category={categories.find(this.props.params.id)}
				/>
			</div>
		);
	}
}

export default observer(CategoryContainer);
