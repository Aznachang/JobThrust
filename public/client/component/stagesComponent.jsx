import React from 'react';

var StageList = (props) => {
  return (
    <div>
      <div id="pipeline">
       {props.stages.map((stage, index) => 
        <div className="stage-box" key={index}>
          <span className="stage-name">{stage}</span>
          <div className="stage-value">{props.stageCounts[index]}</div>
        </div>
       )}
      </div>
    </div>
  )
}

export default StageList;