import React from 'react';
import Avatar from '../../shared/components/UI/Avatar';
import Card from '../../shared/components/UI/Card';
import './UserItem.css';
import { Link } from 'react-router-dom';

interface UserItemProps {
  id: string;
  image: string;
  name: string;
  placeCount: number;
}

const UserItem: React.FC<UserItemProps> = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} width="14" />
          </div>

          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
