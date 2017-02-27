import React from 'react';

export default class SignUp extends React.Component {



  render() {
    return (
      <div className="login-container">
        <img src='../favicon.ico' />
        <p>WELCOME TO JOBTHRUST</p>
        <br />
        <p>LOGIN OR REGISTER WITH:</p>
        <br />
        <div className="button-container">
          <div className="google-button">
            <a href="/auth/google">Google</a>
          </div>
        </div>
      </div>
    )
  }
}