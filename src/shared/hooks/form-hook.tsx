import { useCallback, useReducer } from 'react';

interface FormState {
  inputs: {
    [key: string]: {
      value?: string;
      isValid: boolean;
    };
  };
  isValid: boolean;
}

interface Action {
  type: string;
  value?: string;
  isValid?: boolean;
  inputId?: string;
  inputs?: FormState['inputs'];
  formIsValid?: boolean;
}

const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid!;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId!]: { value: action.value!, isValid: action.isValid! },
        },
        isValid: formIsValid,
      };
    case 'SET_DATA':
      return {
        inputs: action.inputs!,
        isValid: action.formIsValid!,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: FormState['inputs'],
  initialFormValidity: boolean
): [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (
    inputs: FormState['inputs'],
    formValidity: boolean,
    isLoginMode: boolean
  ) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback(
    (
      inputData: FormState['inputs'],
      formValidity: boolean,
      isLoginMode: boolean
    ) => {
      const updatedInputs = {
        ...formState.inputs,
        ...inputData,
      };

      if (!isLoginMode) {
        updatedInputs.name = {
          value: '',
          isValid: false,
        };
      } else {
        delete updatedInputs.name;
      }

      dispatch({
        type: 'SET_DATA',
        inputs: updatedInputs,
        formIsValid: formValidity,
      });
    },
    [formState.inputs, dispatch]
  );

  return [formState, inputHandler, setFormData];
};
