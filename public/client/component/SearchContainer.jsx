import React from 'react';
import { browserHistory } from 'react-router';
import SearchBar from './SearchBar.jsx';
import Recommend from './Recommend.jsx';
import SearchResultsContainer from './SearchResultsContainer.jsx';

export default class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return(
      <div>
       <SearchBar />
       <Recommend recItems={['Software Engineering - Google', 'FrontEnd - Yahoo']}/>
       <SearchResultsContainer/>
      </div>
    )
  };
};