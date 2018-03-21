import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import uniqid from 'uniqid';
import axios from 'axios';
import './App.css';

const CONSTANTS = require('../common/const');

const styles = {
  img: {
    borderRadius: '50%',
    position: 'relative',
    top: '5px',
    marginRight: '5px'
  }
};
class App extends Component {
  state = {
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    messages: [],
    endpoint: 'http://127.0.0.1:4000'
  };

  static socket;

  componentWillMount() {
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on(CONSTANTS.CLIENT_MESSAGE, data => {
      let newMessages = [...this.state.messages];
      newMessages.push(data);
      this.setState({ messages: newMessages });
    });
  }

  messagesList = () => {
    return this.state.messages.map(item => {
      return (
        <li key={item.id}>
          <span className="User">
            <img
              src={item.avatar}
              alt="avatar"
              width="20px"
              style={styles.img}
            />
            {item.user}:
          </span>
          <span className="Message">{item.message}</span>
        </li>
      );
    });
  };

  addMessage = e => {
    e.preventDefault();
    const { user } = this.state;
    this.socket.emit(CONSTANTS.SERVER_MESSAGE, {
      user,
      message: this.refs.message.value
    });

    this.refs.message.value = '';
  };

  login = e => {
    e.preventDefault();
    const user = {
      username: this.refs.username.value
    };

    axios.post('/login', user).then(response => {
      this.setState({ user: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
    });
    // this.setState({ user });
  };

  render() {
    let componentToRender = (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.login} className="LoginForm">
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

    if (this.state.user) {
      componentToRender = (
        <div>
          <h1>Chat Rooom</h1>
          <div className="ChatBox">
            <ul>{this.messagesList()}</ul>
            <form onSubmit={this.addMessage}>
              <input type="text" ref="message" />
            </form>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="Container">{componentToRender}</div>
      </div>
    );
  }
}

export default App;
