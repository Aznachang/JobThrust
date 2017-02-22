'use strict';
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Foo from './public/client/component/Foo.jsx';

describe('Component Foo', function() {
 it ('should have a class named foo', function() {
 const wrapper = shallow(<Foo />);
 expect(wrapper.is('.foo')).to.equal(true);
 })
it('should have two children', function() {
 const wrapper = shallow(<Foo />);
 expect(wrapper.children().length).to.equal(2)
 })
it('should have children with a class named bar', function() {
 const wrapper = shallow(<Foo />);
 expect(wrapper.children('.bar').length).to.equal(2);
 })
})