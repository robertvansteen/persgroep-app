import { Schema, valuesOf, arrayOf } from 'normalizr';

/**
 * Define schemas.
 */
const story = new Schema('stories', { meta: { overrideIds: { author: 'author_id' } } });
const category = new Schema('categories');
const user = new Schema('users');
const assignment = new Schema('assignments');

story.define({
	author: user,
	related: arrayOf(story),
	categories: arrayOf(category),
});

category.define({
	stories: arrayOf(story),
});

assignment.define({
	users: arrayOf(user),
});

export {
	story as storySchema,
	user as userSchema,
	category as categorySchema,
	assignment as assignmentSchema,
};
