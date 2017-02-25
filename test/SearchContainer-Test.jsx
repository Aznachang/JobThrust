'use strict';
require("babel-core").transform("code", {
  presets: ["react"]
});
import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
// COMPONENTS
import SearchContainer from '../public/client/component/SearchView/SearchContainer.jsx';
import SearchBar from '../public/client/component/SearchView/SearchBar.jsx';
import SearchResultsContainer from '../public/client/component/SearchView/SearchResultsContainer.jsx';
import SearchResult from '../public/client/component/SearchView/SearchResult.jsx';
import SearchResultIcons from '../public/client/component/SearchView/SearchResultIcons.jsx';
import SearchRecommendations from '../public/client/component/SearchView/SearchRecommendations.jsx';


xdescribe('Component SearchContainer', function() {
  it('should have four children', function() {
    const wrapper = shallow(<SearchContainer />);
    expect(wrapper.children().length).to.equal(4)
  })
  it('should have a state called results equal to an array', function() {
    const wrapper = shallow(<SearchContainer />);
    expect(Array.isArray(wrapper.state('results'))).to.equal(true);
  })
  it('should have a state called info equal to an object', function() {
    const wrapper = shallow(<SearchContainer />);
    expect(typeof wrapper.state('info')).to.equal('object')
  })
})

xdescribe('Component SearchBar', function() {
  it('should receive passed down props', function() {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.props()).to.exist
  })
  it('should be a form with three inputs', function() {
    const wrapper = shallow(<SearchBar />);
  })
})

describe('Component SearchRecommendations', function() {
  it('should be a REACT component', function() {
    const wrapper = shallow(<SearchRecommendations />);
    expect(wrapper).to.exist
  })
  it('it should recommend 5 jobs related to past searches', function() {
    const wrapper = shallow(<SearchRecommendations />);
    expect(wrapper.children().length).to.equal(5);
  })
})

xdescribe('Component SearchResultsContainer', function() {
  it('it should contain SearchResult', function() {
    const wrapper = shallow(<SearchResultsContainer />);
    expect(wrapper.find('SearchResult')).to.have.length(1);
  })
})

xdescribe('Component SearchResult', function() {
  it('should recurssively render job results as list items', function() {
    const info = {};
    const getInfo = function() {};
    const results = [{title: 'Svey is a GOD at testing', company: 'Based Avocado', snippet: 'Test\'n it'}, {title: 'Svey is LEVIATHAN at testing', company: 'Based EVERYTHING', snippet: 'KILL\'N it'}, {title: 'SVEY', company: 'BASED', snippet: 'GOD'}];
    const wrapper = shallow(<SearchResult getInfo={getInfo} info={info} results={results} />);
    expect(wrapper.find('li')).to.have.length(3);
  })
})

xdescribe('Component SearchResultIcons', function() {
  it('it should contain an ℹ, ✔, and ✘ buttons', function() {
    const wrapper = shallow(<SearchResultIcons />);
    expect(wrapper.find('button')).to.have.length(3);
  })
})
