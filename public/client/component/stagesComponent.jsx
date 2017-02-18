import React from 'react';

var StageList = (props) => {
  return (
    <div>
      <ul>
       {props.stages.map((stage, index) => 
        <li key={index}>{stage}</li>
       )}
      </ul>
    </div>
  )
}

export default StageList;