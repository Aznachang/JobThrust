import React from 'react';
import ReactDOM from 'react-dom';

var SearchBar = (props) => (
  <form>
    <input type='text' placeholder="Search for a Job..." />
    <input type='submit' value='Search'/>
  </form>

)

module.exports = SearchBar