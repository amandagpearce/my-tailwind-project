import React from 'react';
import ReactDOM from 'react-dom';

interface BackdropProps {
  onClick: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
  return ReactDOM.createPortal(
    <div
      className="backdrop fixed w-full h-full z-10 bg-black/75 top-0 left-0"
      onClick={props.onClick}
    ></div>,
    document.getElementById('backdrop-portal') as Element
  );
};

export default Backdrop;
