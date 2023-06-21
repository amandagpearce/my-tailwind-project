import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

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
      // using an IIFE to not make the use effect function async which would be a bad practice
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`,
          'GET'
        );

        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]); // setting sendRequest(which is wrapped with useCallback) as a dependency so the useEffect wont run again on rerenders

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinner asOverlay />
        </div>
      )}

      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </Fragment>
  );
};

export default UserPlaces;
