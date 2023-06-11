import React, { ReactNode } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

import './Button.css';

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
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
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
        className={`button button--${props.size || 'default'} ${
          props.inverse && 'button--inverse'
        } ${props.danger && 'button--danger'}`}
      >
        {props.children}
      </RouterLink>
    );
  }
  return (
    <button
      className={`button button--${props.size || 'default'} ${
        props.inverse && 'button--inverse'
      } ${props.danger && 'button--danger'}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
