import React from 'react';

import Card from '../../shared/components/UI/Card';
import PlaceItem from './PlaceItem';
import Button from '../../shared/components/FormElements/Button';

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
  if (props.items?.length === 0) {
    return (
      <div
        className={`
            place-list
            list-none
            w-full
            m-4
            p-0
            max-w-2xl
            self-center
        `}
      >
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Add new Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list m-8">
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
