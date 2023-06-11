import React from 'react';

import UserItem from './UserItem';
import './UsersList.css';

interface UsersListProps {
  items: {
    id: string;
    name: string;
    image: string;
    places: number;
  }[];
}

const UsersList: React.FC<UsersListProps> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
