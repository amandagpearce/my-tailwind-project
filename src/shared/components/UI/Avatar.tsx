import React, { CSSProperties } from 'react';

interface AvatarProps {
  className?: string;
  image: string;
  alt: string;
  style?: CSSProperties;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div
      className={`avatar flex justify-center rounded-full overflow-hidden items-center ${props.className}`}
      style={props.style}
    >
      <img
        src={props.image}
        alt={props.alt}
        className={`inline-block object-cover scale-110`}
      />
    </div>
  );
};

export default Avatar;
