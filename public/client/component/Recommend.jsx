import React from 'react';

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
