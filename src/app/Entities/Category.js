import compact from 'lodash/compact';
import Stories from 'Collections/Stories';
import BaseModel from 'Entities/BaseModel';
import { computed, observable } from 'mobx';

export default class Category extends BaseModel {

	static relationships = ['stories'];

	@observable topStories_id = [];

	@computed get topStories() {
		return compact(this.topStories_id.map((id) => {
			return Stories.find(id);
		}));
	}
}
