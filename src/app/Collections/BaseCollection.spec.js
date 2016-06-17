import { expect } from 'chai';
import { isObservable } from 'mobx';
import BaseModel from 'Entities/BaseModel';
import BaseCollection from './BaseCollection';

class Entity extends BaseModel {}

class CollectionWithoutResource extends BaseCollection {}

class Collection extends BaseCollection {
	static Resource = Entity;
}

/**
 * Instance of collection to test.
 */
let instance;

/**
 * Test the base collection.
 */
describe('BaseCollection', () => {
	beforeEach(() => {
		instance = new Collection();
	});

	it('Should not be instantiable by itself', () => {
		expect(() => new BaseCollection())
			.to.throw(TypeError, /cannot be instantiated/i);
		expect(() => new Collection())
			.to.not.throw(TypeError, /cannot be instantiated/i);
	});

	it('Extender should have a static resource of BaseModel', () => {
		expect(() => new CollectionWithoutResource())
			.to.throw(TypeError, /resource should be extendable of BaseModel/i);
		expect(() => new Collection())
		.to.not.throw(TypeError, /resource should be extendable of BaseModel /i);
	});

	it('Should have observable data', () => {
		isObservable(instance.items).should.be.true;
	});

	it('Should add a single item', () => {
		instance.add({ id: '1' });
		instance.items.should.have.length(1);
	});

	it('Should replace an item by default', () => {
		instance.add({ id: '1', foo: 'bar' });
		instance.add({ id: '1', foo: 'baz' });
		instance.items[0].foo.should.equal('baz');
	});

	it('Should not replace if specified', () => {
		instance.add({ id: '1', foo: 'bar' }, false);
		instance.add({ id: '1', foo: 'baz' }, false);
		instance.items[0].foo.should.equal('bar');
	});

	it('Should add item of resource', () => {
		instance.add({ id: '1' });
		const item = instance.items[0];
		item.should.be.instanceOf(Entity);
	});

	it('Should add an array of items', () => {
		instance.add([{ id: '1' }, { id: '2' }]);
		instance.items.should.have.length(2);
	});

	it('Should replace an item if the ID already exists', () => {
		instance.add({ id: '1' });
		instance.items.should.have.length(1);
		instance.add({ id: '1' });
		instance.items.should.have.length(1);
	});

	it('Should return all the items in the collection', () => {
		instance.add({ id: '1' });
		const result = instance.all();
		result.should.have.length(1);
	});

	it('Should find an item by it\s id', () => {
		expect(instance.find('1')).to.be.null;
		instance.add({ id: '1' });
		instance.find('1').id.should.equal('1');
	});

	it('Should tell if an item exists by it\'s id', () => {
		instance.has('1').should.be.false;
		instance.add({ id: '1' });
		instance.has('1').should.be.true;
	});

	it('Should delete an item', () => {
		instance.items.should.have.length(0);
		instance.add({ id: '1' });
		instance.items.should.have.length(1);
		instance.delete('1');
		instance.items.should.have.length(0);
	});
});
