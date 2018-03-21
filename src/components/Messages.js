import React from 'react';
import PropTypes from 'prop-types';
import MessagesItem from './MessagesItem';

const Messages = ({ data, currentUser }) => (
  <ul className="MessagesList">
    {data.map(item => (
      <MessagesItem key={item.id} item={item} currentUser={currentUser} />
    ))}
  </ul>
);

Messages.propTypes = {
  data: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default Messages;
