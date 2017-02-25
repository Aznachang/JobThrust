import React from 'react';

export default class CompanyListComponent extends React.Component {
	constructor(props) {
    console.log('props',props)
    super(props);
  }
  render() {
    if (this.props.companyInfo[0]) {

    return (
      <div> 
        {
          this.props.companyInfo.map((job, i) =>
            <div key={i} className="search-result">
              <div>
                <img src={job.squareLogo} style={{'height':'150px', 'width':'150px'}}/>
                <img src={job.ceo.image.src} style={{'height':'150px', 'width':'150px', 'float': 'right'}}/>
              </div>
              <h3>{job.name}</h3>
              <br></br>
              <br></br>
              <button>Comment</button>
              <button>Edit</button>

            </div>
          )
        }
      </div>
    )
  } else {
    return (
     <div></div>
    )
  }
  } 
}