import React from 'react';

export default class SignUp extends React.Component {



  render() {
    return (
      <div className='screen-frame'>
        <div className="login-container">
          <p id="welcome">WELCOME TO JOBTHRUST</p>
          <p><i>Making your job search process just a little bit easier.</i></p>
          <br />
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