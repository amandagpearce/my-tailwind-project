import React from 'react';
import Avatar from '../../shared/components/UI/Avatar';
import Card from '../../shared/components/UI/Card';
import { Link } from 'react-router-dom';

interface UserItemProps {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}

const UserItem: React.FC<UserItemProps> = (props) => {
  return (
    <li className="user-item h-full mt-4 w-full">
      <Card className="user-item__content p-0">
        <Link
          to={`/${props.id}/places`}
          className="
          flex
          h-full
          items-center
          p-4
          text-white
          rounded-sm
          bg-cyan
          decoration-none
          hover:bg-lightCyan
          "
        >
          <div className="user-item__image w-1/4 mr-4">
            <Avatar image={props.image} alt={props.name} width="14" />
          </div>

          <div className="user-item__info w-2/4 m-l-2">
            <h2 className="text-black text-lg mb-1 ">{props.name}</h2>
            <h3 className="text-darkCyan">
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
