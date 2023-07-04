import React, { CSSProperties, ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  style?: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`card ${props.style} mx-auto h-full overflow-hidden rounded-lg m-0 shadow-black/25 ${props.className}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
