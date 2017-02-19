import React from 'react';
import ReactDOM from 'react-dom';
var Recommend = (props) => (
  <div>
    <ul>
      {props.recItems.map(function(recItem, i) {
        return (
          <li key={i}>{recItem}</li>
        )
      })}
    </ul>
  </div>
)

export default Recommend;
