import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import socket from './socket';
import ChatRoom from './components/ChatRoom';
import LoginForm from './components/LoginForm';
const CONSTANTS = require('../common/const');

class App extends Component {
  state = {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    connectedUsers: []
  };

  componentWillMount() {
    socket.init();
    socket.subscribe(CONSTANTS.CONNECTED_USERS, connectedUsers => {
      this.setState({ connectedUsers });
    });

    if (this.state.user) {
      this.login(this.state.user);
    }
  }

  login = user => {
    axios.post(CONSTANTS.URL + '/login', user).then(response => {
      this.setState({ user: response.data });
      //save user so it will auto login next time
      localStorage.setItem('user', JSON.stringify(response.data));
    });
  };

  render() {
    //if the user is logged in show the chat room, else - show login page
    let componentToRender = this.state.user ? (
      <ChatRoom
        user={this.state.user}
        connectedUsers={this.state.connectedUsers}
      />
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
