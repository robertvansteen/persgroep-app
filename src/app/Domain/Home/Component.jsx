import React, { Component } from 'react';
import CategoryList from 'Components/CategoryList/Component';

const categories = [
	{ id: '1', name: 'Wereld' },
	{ id: '2', name: 'Sport' },
	{ id: '3', name: 'Media' },
	{ id: '4', name: 'Cultuur' },
	{ id: '5', name: 'Technologie' },
	{ id: '6', name: 'Lifestyle' },
];

class Home extends Component {
	render() {
		return (
			<CategoryList categories={categories} />
		);
	}
}

export default Home;
