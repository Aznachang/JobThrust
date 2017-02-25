import React from 'react';
import ReactDOM from 'react-dom';

class JobOfferForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // salary: 0,
      // signBonus: 0,
      // vacationDays: 0,
      // retireMatchPercent: 0,
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.getOffers} className='job-offer-form'>
          <h1>Job Offer Form</h1>

          <fieldset className='form-group'>
           <label> Company Name </label><br/>
           <input className='form-offer' name='company' type='text' required onChange={this.props.handleChange} />

            <label> Job Title </label><br/>
            <input  className='form-offer' name='title' type='email' required onChange={this.props.handleChange} />

            <label>Salary</label> <br/>
            <input className='form-offer' name='salary' type='text' required onChange={this.props.handleChange} />

            <label> Signing Bonus</label> <br/>
            <input className='form-offer' name='bonus' onChange={this.props.handleChange}></input>

            <label> Vacation Days </label> <br/>
            <input className='form-offer' name='vacation' required onChange={this.props.handleChange}></input>

            <label>401K Company Match </label> <br/>
            <input className='form-offer' name='retirement' onChange={this.props.handleChange}></input>
          </fieldset>

          <div className='form-group'>
            <input className='offer-btn' type='submit' value="Save Job Offer" />
          </div>
        </form>
      </div>
    )
  }
}

export default JobOfferForm;