import React from 'react';

/** Demonstrates the use of inline styles */
const styles = {
  borderRadius: '50%',
  position: 'relative',
  top: '5px',
  marginRight: '5px'
};

const MessagesItem = ({ item }) => (
  <li>
    <span className="User">
      <img src={item.avatar} alt="avatar" width="20px" style={styles} />
      {item.user}:
    </span>
    <span className="Message">{item.message}</span>
  </li>
);

export default MessagesItem;
