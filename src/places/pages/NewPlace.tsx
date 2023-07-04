import React, {
  Fragment,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
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
import AutoComplete from './Autocomplete';

const NewPlace = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
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

  const autoCompleteRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!window.google.maps.places) {
      // Google Maps API is not loaded yet, so add a listener for its load event
      window.addEventListener('load', initializeSearchBox);
    } else {
      // Google Maps API is already loaded, so initialize the SearchBox directly
      initializeSearchBox();
    }

    function initializeSearchBox() {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autoCompleteRef.current.addListener('place_changed', async function () {
        const place = await autoCompleteRef.current.getPlace();
        console.log({ place });
        inputHandler('address', place.formatted_address, true);
      });
    }
  }, []);

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
    <div className="px-8">
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

        {/* <Input
          element="input"
          label="Address"
          id="address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          ref={inputRef}
        /> */}

        <div className="m-4">
          <input
            id="address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            placeholder="Enter the place name to locate the address"
            ref={inputRef}
            className="rounded border-2 border-purple mt-1 p-2 focus:border-darkCyan focus:outline-none w-full"
          />
        </div>

        {/* <AutoComplete /> */}

        <Button className="m-4" type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </div>
  );
};

export default NewPlace;
