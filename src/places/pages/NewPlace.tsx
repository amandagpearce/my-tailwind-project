import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import AuthContext from '../../shared/context/auth-context';

const NewPlace = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    // formState and inputHandler are returned in the hook
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const searchInput = document.getElementById('address'); // Replace with the correct input field ID

    if (!window.google.maps.places) {
      // Google Maps API is not loaded yet, so add a listener for its load event
      window.addEventListener('load', initializeSearchBox);
    } else {
      // Google Maps API is already loaded, so initialize the SearchBox directly
      initializeSearchBox();
    }

    // Clean up the SearchBox when the component unmounts
    return () => {
      window.google?.maps.event.clearInstanceListeners(searchInput);
    };

    function initializeSearchBox() {
      const searchBox = new window.google.maps.places.SearchBox(searchInput);

      // Listen for place predictions
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places && places.length > 0) {
          const suggestions = places.map((place) => ({
            placeId: place.place_id,
            description: place.formatted_address,
          }));

          // Set the suggestions in state
          setSuggestions(suggestions);
        }
      });
    }
  }, []);

  const handleSuggestionClick = (suggestion) => {
    const addressInput = document.getElementById('address'); // Replace with the correct input field ID
    if (addressInput) {
      addressInput.value = suggestion.description;
    }
    setSuggestions([]); // Clear the suggestions
  };

  const placeSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log('ta dah', formState.inputs);
    try {
      await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: authContext.userId,
        }),
        { 'Content-Type': 'application/json' }
      );

      navigate('/');
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <h2 className="text-center text-2xl mt-8 mb-4">Add new place</h2>
      <form
        className={`
                    place-form
                    list-none
                    w-5/6
                    p-4
                    mx-auto
                    max-w-2xl
                    rounded-lg
                    bg-white
                    shadow-lg
                    mt-10
          `}
        onSubmit={placeSubmitHandler}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element="input"
          type="text"
          label="Title"
          id="title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />

        <Input
          element="textarea"
          label="Description"
          id="description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />

        <Input
          element="input"
          label="Address"
          id="address"
          autoComplete="off" // Disable default browser autocomplete
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />

        {suggestions && suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.placeId}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}

        <Button className="m-4" type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
