import React from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

const Users = ({ users, currentUserName }) => {
  return (
    <div className="UsersList">
      <h3>Connected users</h3>
      <ul>
        {users.map(user => (
          <UserItem
            user={user}
            key={user.id}
            currentUserName={currentUserName}
          />
        ))}
      </ul>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
