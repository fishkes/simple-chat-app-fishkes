import React, { Component } from 'react';
import uniqid from 'uniqid';
import Messages from './Messages';
import socket from '../../common/socket';
const CONSTANTS = require('../../common/const');

class ChatRoom extends Component {
  state = {
    messages: []
  };

  componentWillMount() {
    socket.init();
    socket.register(CONSTANTS.CLIENT_MESSAGE, data => {
      this.setState({ messages: data });
    });
  }

  addMessage = e => {
    e.preventDefault();
    const { user } = this.props;
    const text = this.refs.message.value;
    const messageId = uniqid();

    //I would like to add the message immidiatley as the user enters it
    //Later on the messages would be updated
    const newMessage = {
      avatar: user.avatar,
      user: user.username,
      message: text,
      id: messageId
    };
    this.setState({ messages: [...this.state.messages, newMessage] });

    //send the message to the rest of the clients
    socket.send(CONSTANTS.SERVER_MESSAGE, {
      user,
      message: text,
      id: messageId
    });

    this.refs.message.value = '';
  };

  render() {
    return (
      <div>
        <h1>Chat Rooom</h1>
        <div className="ChatBox">
          <Messages data={this.state.messages} />
          <form onSubmit={this.addMessage}>
            <input type="text" ref="message" />
          </form>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
