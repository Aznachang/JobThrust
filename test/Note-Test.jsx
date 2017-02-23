'use strict';
require("babel-core").transform("code", {
  presets: ["react"]
});

import React from 'react';
import { expect } from 'chai';
import { sinon, spy } from 'sinon';

import { shallow, mount, render } from 'enzyme';
import NoteContainer from '../public/client/component/NoteContainer.jsx';
import Note from '../public/client/component/Note.jsx';
global.expect = expect;
global.sinon = sinon;
global.spy = spy;

global.mount = mount;
global.render = render;
global.shallow = shallow;

describe('NoteContainer', () => {
  it('should render an AddButton', () => {
    const wrapper = shallow(<NoteContainer/>);
    expect(wrapper.containsAllMatchingElements([
      <button>Add new</button>,
    ])).to.equal(true);
  })
  it('should have five children', () => {
    const wrapper = shallow(<NoteContainer />);
    expect(wrapper.children().length).to.equal(5);
  })
  it('should have a state with notes that is typeof array', function() {
    const wrapper = shallow(<NoteContainer />);
    expect(Array.isArray(wrapper.state('notes'))).to.equal(true);
  })
  it('should get a list of the 3 comments that are pushed!', function() {
    const wrapper = shallow(<NoteContainer />);
    wrapper.state('notes').push('company has 10k employees');
    wrapper.state('notes').push('need to work on algorithms');
    wrapper.state('notes').push('expected to do a simple app on personal computer');
    expect(wrapper.state('notes')).to.have.length(3);
  })
  // it('Comment Update', () => {
  //   const wrapper = mount(<NoteContainer />);
  //   wrapper.setState({ notes: ['hello'] });
  //   wrapper.find('button-info').simulate('click');
  //   expect(wrapper.state().notes[0]).to.equal('hello');
  // });
}) // end of NoteContainer

describe('Note Child Component Edit', () => {
  it('On initial Non-Editing mode, should render 4 children', function() {
    const wrapper = shallow(<Note />);
    var editing = wrapper.state('editing');
    editing = 'false';
    expect(wrapper.find('.noteContainer').children().length).to.equal(4);
  })
})
