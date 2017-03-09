import React from 'react';

export default class SignUp extends React.Component {



  render() {
    return (
      <div className='screen-frame'>
        <div className="login-container">
          <img src='../rocket.png' />
          <p>WELCOME TO JOBTHRUST</p>
          <br />
          <p>LOGIN OR REGISTER WITH:</p>
          <br />
          <div className="button-container">
            <a href="/auth/google"><div className="google-button">
              Google
            </div></a>
          </div>
        </div>
      </div>
    )
  }
}