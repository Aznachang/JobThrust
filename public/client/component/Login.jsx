import React from 'react';

export default class SignUp extends React.Component {



  render() {
    return (
      <div className="login-container">
        <p>Welcome to HireGuide!</p>
        <p>Login or register with:</p>
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