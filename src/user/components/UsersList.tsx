import React from 'react';

import UserItem from './UserItem';

interface UsersListProps {
  items: {
    id: string;
    name: string;
    image: string;
    places: [];
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
    <ul
      className={`
                users-list
                list-none
                mx-auto
                p-0
                w-5/6
                max-w-3xl
                flex
                justify-center
                flex-wrap
        `}
    >
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
