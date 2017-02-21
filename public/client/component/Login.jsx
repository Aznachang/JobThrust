import React from 'react';

export default class SignUp extends React.Component {



  render() {
    return (
      <div>
        <p>Login or Register with:</p>

        <a href="/auth/google" class="btn btn-danger"><span class="fa fa-google-plus"></span> Google</a>
      </div>
    )
  }
}