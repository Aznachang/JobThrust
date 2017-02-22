import React from 'react';

var StageList = (props) => {
  return (
    <div>
      <div id="pipeline">
       {props.stages.map((stage, index) => 
        <div className="stage-box" key={index}>{stage}</div>
       )}
      </div>
    </div>
  )
}

export default StageList;