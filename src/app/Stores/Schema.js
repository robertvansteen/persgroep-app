import { Schema, valuesOf } from 'normalizr';

/**
 * Define schemas.
 */
const story = new Schema('stories', { meta: { overrideIds: { author: 'author_id' } } });
const user = new Schema('users');

story.define({
	author: user,
});

export {
	story as storySchema,
	user as userSchema,
};
