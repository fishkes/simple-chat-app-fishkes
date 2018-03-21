import React from 'react';
import PropTypes from 'prop-types';

const MessagesItem = ({ item, currentUser }) => {
  const classes =
    'MessageItem' + (item.username === currentUser.username ? ' Current' : '');
  return (
    <li className={classes}>
      <div className="User">
        <img src={item.avatar} alt="avatar" className="Avatar" />
        {item.username}
      </div>
      <span className="Message">{item.message}</span>
    </li>
  );
};

MessagesItem.propTypes = {
  item: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
};

export default MessagesItem;
