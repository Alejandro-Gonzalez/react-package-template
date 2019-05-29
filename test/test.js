import React from 'react';
import Test from '../src';
const expect = require('expect.js');

// example tests
describe('Test utils', () => {
	it('shallow render', () => {
		const wrapper = shallow(<Test />);
		expect(wrapper.exists()).to.be(true);
	});
});
