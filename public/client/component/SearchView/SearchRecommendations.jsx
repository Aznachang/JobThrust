// import React from 'react';
// import ReactDOM from 'react-dom';
// var Recommend = (props) => (
//   <div>
//     <h3></h3>
//     <ul>
//     </ul>
//   </div>
// )

// export default Recommend;

import React from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import SearchResultIcons from './SearchResultIcons.jsx';


class SearchRecommendations extends React.Component {
  constructor(props){
    super(props) 
  }

  render() {
    console.log('SearchResults in recommendations: ', this.props.recommendations);
    var recommendations = this.props.recommendations;
    var recommendationsList = recommendations.map((result, index) => {
      var infoWindow = null;
      if (this.props.info[index]) {
        infoWindow = <p>{this.props.info[index]}</p>
      } else {
        infoWindow = <br />
      }

      return (
        <li key={index} className="search-result">
            <p>{result.jobtitle}-{result.formattedLocation}-{result.company}<SearchResultIcons index={index} addJob={this.props.addRecommendation} removeJob={this.props.removeRecommendation} result={result} getInfo={this.props.getInfo.bind(null, result.jobkey, index)} /></p>
            {infoWindow}
        </li>
      );
    })
    return (
      <ul>{recommendationsList}</ul>
    )  
  }
}

export default SearchRecommendations;
