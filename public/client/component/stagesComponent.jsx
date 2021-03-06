import React from 'react';

class StageList extends React.Component {

  constructor(props) {
    super(props);
    this.isSelected = this.isSelected.bind(this);
  }

  toggleFilter(stageNum) {
    if (this.props.filtered === stageNum) {
      this.props.filter();
    } else {
      this.props.filter(stageNum);
    }
  }

  isSelected(num) {
    if (num === this.props.filtered) {
      return "stage-box selected-box";
    } else {
      return "stage-box";
    }
  }

  render() {
    return (
      <div>
        <div id="pipeline">
         {this.props.stages.map((stage, index) => 
          <div className={this.props.boxClasses[index]} key={index} onClick={this.toggleFilter.bind(this, index)}>
            <span className="stage-name">{stage}</span>
            <div className="stage-value">{this.props.stageCounts[index]}</div>
          </div>
         )}
        </div>
      </div>
    )
  }
}

export default StageList;