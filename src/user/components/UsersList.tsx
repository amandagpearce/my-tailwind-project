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
                pl-0
                w-full
                grid
                lg:grid-cols-4
                gap-8
                md:grid-cols-3
                sm:grid-cols-2
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
