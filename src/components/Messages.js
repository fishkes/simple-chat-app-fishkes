import React from 'react';
import MessagesItem from './MessagesItem';

const Messages = ({ data }) => (
  <ul>{data.map(item => <MessagesItem key={item.id} item={item} />)}</ul>
);

export default Messages;
