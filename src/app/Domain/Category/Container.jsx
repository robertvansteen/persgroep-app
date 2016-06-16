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
		fetchCategories();
		this.fetchStories(this.props.params.id);
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

	onStoryClick = () => {
		StoryStore.context = categories.find(this.props.params.id).topStories_id;
	}

	/**
	 * Fetch the stories by the currently visisted category.
	 *
	 * @param  {String} categoryId
	 *
	 * @return {void}
	 */
	fetchStories(categoryId) {
		fetchStoriesByCategory(categoryId)
			.then(data => {
				const category = categories.find(categoryId);
				if (category) category.topStories_id = data.result.data;
			});
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
