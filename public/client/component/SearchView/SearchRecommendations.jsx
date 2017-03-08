import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';


class SearchRecommendations extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    var recommendations = this.props.recommendations;
    var recommendationsList = recommendations.map((result, index) => {
      var infoWindow = null;
      if (this.props.info[index]) {
        infoWindow = <p>{this.props.info[index]}</p>
      } else {
        infoWindow = <br />
      }
      return (
        <li className="recommendation" key={index} >
            <SearchResultIcons index={index} addJob={this.props.addRecommendation} removeJob={this.props.removeRecommendation} result={result} getInfo={this.props.getInfo.bind(null, result.jobkey, index)} />
            <p>{result.jobtitle}</p>
            <p>{result.company}</p>
            <p>{result.formattedLocation}</p>
            {infoWindow}
        </li>
      );
    })
    return (
      <div className='recommend-container'>
        <div className='recommend-header'>Jobs You Might Be Interested In</div>
        <ul className="recommendation">{recommendationsList}</ul>
      </div>
    )
  }
}

export default SearchRecommendations;
