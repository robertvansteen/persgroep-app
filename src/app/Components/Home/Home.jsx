import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import StoryList from 'Components/StoryList/StoryList';

class Home extends Component {
	render() {
		return (
			<div>
				<DevTools />
				<StoryList />
			</div>
		);
	}
}

export default Home;
