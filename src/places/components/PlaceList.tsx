import React, { useContext } from 'react';

import Card from '../../shared/components/UI/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

import AuthContext from '../../shared/context/auth-context';

interface Place {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface PlaceListProps {
  items: Place[] | undefined;
}

const PlaceList: React.FC<PlaceListProps> = (props) => {
  const authContext = useContext(AuthContext);

  if (props.items?.length === 0) {
    return (
      <div
        className={`
            place-list
            list-none
            w-full
            m-0
            p-4
            self-center
            bg-transparent
        `}
      >
        <Card className="rounded-none flex flex-wrap items-center justify-center w-full bg-transparent">
          <h2 className="text-2xl text-white text-center w-full mb-4">
            No places found. Maybe create one?
          </h2>
          {authContext.isLoggedIn && (
            <Button to="/places/new">Add new Place</Button>
          )}
          {!authContext.isLoggedIn && <Button to="/auth">Login</Button>}
        </Card>
      </div>
    );
  }

  return (
    <ul
      className={`
        place-list
        p-8
        list-none
        w-full
        grid
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        auto-cols-fr
        gap-4
    `}
    >
      {props.items?.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
