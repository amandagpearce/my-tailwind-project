import React, { CSSProperties } from 'react';

interface AvatarProps {
  className?: string;
  image: string;
  alt: string;
  width: string;
  style?: CSSProperties;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div
      className={`avatar w-full h-full flex justify-center items-center ${props.className}`}
      style={props.style}
    >
      <img
        src={props.image}
        alt={props.alt}
        className={`inline-block rounded-full aspect-square`}
      />
    </div>
  );
};

export default Avatar;
