import React, { CSSProperties, ReactNode } from 'react';

import './Card.css';

interface CardProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
