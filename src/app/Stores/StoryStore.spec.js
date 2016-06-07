import 'Utils/TestSetup';
import factory from 'fixture-factory';
import StoryStore from './StoryStore';

/**
 * The instance of the store.
 * This will be reset for every single test.
 */
let store;

/**
 * Test the story store.
 */
describe('Storystore', () => {
	beforeEach(() => {
		store = new StoryStore();
	});

	it('should have a empty stories array by default', () => {
		store.stories.should.have.property('size').equal(0);
	});

	it('should add a single story to the collection', () => {
		store.addStory({ id: '1', title: 'foo', body: 'baz' });
		store.stories.has('1').should.equal(true);
		store.stories.get('1').should.have.property('title').equal('foo');
		store.stories.should.have.property('size').equal(1);
	});

	it('should add an array of stories to the collection', () => {
		const stories = factory.generate('story', 3);
		store.addStories(stories);
		store.stories.should.have.property('size').equal(3);
	});

	it('should accept multiple additions of stories to the collection', () => {
		const stories1 = factory.generate('story', 3);
		const stories2 = factory.generate('story', 3);
		store.addStories(stories1);
		store.addStories(stories2);
		store.stories.should.have.property('size').equal(6);
	});

	it('should remove a story', () => {
		store.addStory({ id: '1', title: 'foo', body: 'baz' });
		store.stories.should.have.property('size').equal(1);
		store.stories.delete('1');
		store.stories.should.have.property('size').equal(0);
	});

	// it('should like a story', () => {
	// 	const story = factory.generateOne('story');
	// 	store.addStory(story);
	// 	store.stories.get(story.id).liked.should.be.false();
	// 	store.likeStory(story);
	// 	store.stories.get(story.id).liked.should.be.true();
	// });
	//
	// it('should unlike a story', () => {
	// 	const story = factory.generateOne('story');
	// 	store.addStory(story);
	// 	store.likeStory(story);
	// 	store.stories.get(story.id).liked.should.be.true();
	// 	store.unlikeStory(story);
	// 	store.stories.get(story.id).liked.should.be.false();
	// });
});
