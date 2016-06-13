import Store from 'Stores/StoryStore';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import Category from 'Components/Category/Component';
import CategoryList from 'Components/CategoryList/Component';

const categories = [
	{ id: '1', name: 'Wereld' },
	{ id: '2', name: 'Sport' },
	{ id: '3', name: 'Media' },
	{ id: '4', name: 'Cultuur' },
	{ id: '5', name: 'Technologie' },
	{ id: '6', name: 'Lifestyle' },
];

const headlines = {
	id: '0', name: 'Headlines',
};

export class HomeContainer extends Component {

	/**
	 * Invoked when the component is mounted.
	 *
	 * @return {void}
	 */
	componentDidMount() {
		Store.fetchStories();
	}

	/**
	 * Render the component.
	 *
	 * @return {ReactElement}
	 */
	render() {
		return (
			<div>
				<CategoryList categories={categories} />
				<Category category={headlines} stories={Store.featuredStories} />
			</div>
		);
	}
}

export default observer(HomeContainer);
