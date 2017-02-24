import React from 'react';

var StageList = (props) => {

  var toggleFilter = function(stageNum) {
    if (props.filtered === stageNum) {
      props.filter();
    } else {
      props.filter(stageNum);
    }
  }

  return (
    <div>
      <div id="pipeline">
       {props.stages.map((stage, index) => 
        <div className="stage-box" key={index} onClick={toggleFilter.bind(null, index)}>
          <span className="stage-name">{stage}</span>
          <div className="stage-value">{props.stageCounts[index]}</div>
        </div>
       )}
      </div>
    </div>
  )
}

export default StageList;