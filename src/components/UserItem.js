import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({ user, currentUserName }) => {
  const className = user.username === currentUserName ? 'Current' : '';
  return (
    <li className={className}>
      <img src={user.avatar} alt="avatar" className="Avatar" />
      <span>{user.username}</span>
    </li>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};
export default UserItem;
