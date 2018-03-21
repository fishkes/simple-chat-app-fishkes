import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import ChatRoom from './components/ChatRoom';
import LoginForm from './components/LoginForm';
const CONSTANTS = require('../common/const');

class App extends Component {
  state = {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  };

  login = user => {
    axios.post(CONSTANTS.URL + '/login', user).then(response => {
      this.setState({ user: response.data });
      //save user so it will auto login next time
      localStorage.setItem('user', JSON.stringify(response.data));
    });
  };

  render() {
    let componentToRender = this.state.user ? (
      <ChatRoom user={this.state.user} />
    ) : (
      <LoginForm login={this.login} />
    );

    return (
      <div className="App">
        <div className="Container">{componentToRender}</div>
      </div>
    );
  }
}

export default App;
