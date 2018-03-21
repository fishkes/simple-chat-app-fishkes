import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';

import Messages from './Messages';
import Users from './Users';
import socket from '../socket';
import CONSTANTS from '../../common/const';

class ChatRoom extends Component {
  state = {
    messages: []
  };

  componentWillMount() {
    socket.register(CONSTANTS.CLIENT_MESSAGE, data => {
      // const {messages} = this.state;
      // if (messages[messages.length - 1].id !== data[data.length - 1].id){

      // }
      this.setState({ messages: data });
    });
  }

  addMessage = e => {
    e.preventDefault();
    const { user } = this.props;
    const text = this.refs.message.value;
    const messageId = uniqid();

    if (!text) return;

    //I would like to add the message immidiatley as the user enters it
    const newMessage = {
      avatar: user.avatar,
      username: user.username,
      message: text,
      id: messageId
    };
    this.setState({ messages: [...this.state.messages, newMessage] });

    //send the message to the rest of the clients
    socket.send(CONSTANTS.SERVER_MESSAGE, newMessage);

    this.refs.message.value = '';
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Chat Rooom</h1>
        <div className="ChatRoom">
          <Users
            users={this.props.connectedUsers}
            currentUserName={user.username}
          />
          <div>
            <Messages data={this.state.messages} currentUser={user} />
            <form onSubmit={this.addMessage}>
              <input type="text" ref="message" />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
  connectedUsers: PropTypes.array.isRequired
};
export default ChatRoom;
