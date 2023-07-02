import React, { useReducer, useEffect, ChangeEvent } from 'react';
import { validate } from '../../util/validators';

interface InputProps {
  id: string;
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  valid?: boolean;
  rows?: number;
  validators?: any[];
  errorText?: string;
  element?: 'input' | 'textarea';
  onInput: (id: string, value: string, isValid: boolean) => void;
}

interface InputState {
  value: string;
  isTouched: boolean;
  isValid: boolean;
}

type InputAction =
  | { type: 'CHANGE'; val: string; validators: any[] }
  | { type: 'TOUCH' };

const inputReducer = (state: InputState, action: InputAction): InputState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false,
  });

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators ?? [],
    });
  };

  const touchHandler = () => {
    dispatch({ type: 'TOUCH' });
  };

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className="rounded border-2 border-purple mt-1 p-2 focus:border-darkCyan focus:outline-none w-full"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        className="rounded border-2 border-purple mt-1 focus:border-darkCyan p-2 focus:outline-none w-full"
      />
    );

  return (
    <div
      className={`form-control m-4 ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label className="mt-2 block text-left" htmlFor={props.id}>
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-red-700">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
