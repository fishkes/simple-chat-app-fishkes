import React from 'react';
import MessagesItem from './MessagesItem';

const Messages = ({ data, currentUser }) => (
  <ul>
    {data.map(item => (
      <MessagesItem key={item.id} item={item} currentUser={currentUser} />
    ))}
  </ul>
);

export default Messages;
