import fetch from 'axios';
import { observer } from 'mobx-react';
import categories from 'Collections/Categories';
import React, { Component, PropTypes } from 'react';
import Category from 'Components/Category/Component';
import CategoryList from 'Components/CategoryList/Component';
import { fetchStoriesByCategory } from 'Sources/Stories';

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
		fetch.get('categories')
			.then(response => {
				categories.addCollection(response.data.categories);
			});
		fetchStoriesByCategory(this.props.params.id)
			.then(data => {
				const category = categories.find(this.props.params.id);
				if (category) category.topStories_id = data.results.data;
			});
	}

	/**
	 * Invoked when the component is receiving new props.
	 *
	 * @param  {Object} nextProps
	 * @return {void}
	 */
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			fetchStoriesByCategory(nextProps.params.id);
		}
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
				<Category category={categories.find(this.props.params.id)} />
			</div>
		);
	}
}

export default observer(CategoryContainer);
