import _ from 'lodash';
import { observable, action, asMap } from 'mobx';

class StoryStore {
	@observable stories = asMap([])

	@action addStory(story) {
		this.stories.set(story.id, story);
	}

	@action addStories(stories) {
		this.stories.merge(_.keyBy(stories, 'id'));
	}
}

export default StoryStore;
