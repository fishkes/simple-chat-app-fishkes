import React, { Component } from 'react';

class LoginForm extends Component {
  onSubmit = e => {
    e.preventDefault();
    const user = {
      username: this.refs.username.value
    };

    this.props.login(user);
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit} className="LoginForm">
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            ref="username"
            placeholder="user name for chat room"
          />
        </form>
      </div>
    );
  }
}

export default LoginForm;
