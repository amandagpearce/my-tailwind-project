import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import bgImage from '../../../src/img/place-list-bg.jpg';

interface Place {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  creator: string;
}

const UserPlaces: React.FC = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // extracting user id from the url
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_BACKEND_URL}/places/user/${userId}`,
          'GET'
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]); // setting sendRequest(which is wrapped with useCallback) as a dependency so the useEffect wont run again on rerenders

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <div
      className="px-8 h-full min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
      }}
    >
      {/* <ErrorModal error={error} onClear={clearError} /> */}

      {isLoading && (
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinner asOverlay />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}

      {!isLoading && !loadedPlaces && <PlaceList items={[]} />}
    </div>
  );
};

export default UserPlaces;
