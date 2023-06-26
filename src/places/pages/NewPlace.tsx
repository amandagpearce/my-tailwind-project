import React, { Fragment, useContext } from 'react';
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
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Add Place
        </Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
