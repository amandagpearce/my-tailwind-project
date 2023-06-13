import React, { ReactNode } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  to?: LinkProps['to'];
  size?: 'default' | 'small' | 'large';
  inverse?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  if (props.href) {
    return (
      <a
        className={`text-white p-3 rounded border-1 bg-lightPurple ${
          props.inverse && 'bg-white'
        } ${props.danger && 'border-rose-500'} ${
          props.disabled && 'disabled:opacity-75 cursor-not-allowed'
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <RouterLink
        to={props.to}
        className={`text-white p-3 rounded border-1 bg-lightPurple ${
          props.inverse && 'bg-white'
        } ${props.danger && 'border-rose-500'} ${
          props.disabled && 'disabled:opacity-75 cursor-not-allowed'
        }`}
      >
        {props.children}
      </RouterLink>
    );
  }
  return (
    <button
      className={`text-white p-3 rounded border-1 bg-lightPurple ${
        props.inverse && 'bg-white'
      } ${props.danger && 'border-rose-500'} ${
        props.disabled && 'disabled:opacity-75 cursor-not-allowed'
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
