import React from 'react';
import classNames from 'classnames';

type Props = {
  itemsLength: number;
  selectedIndex: number;
};

const Dots = ({ itemsLength, selectedIndex }: Props) => {
  const arr = new Array(itemsLength).fill(0);
  return (
    <div className="carousel__dots flex gap-2 my-2 justify-center -translate-y-5 mx-auto inset-x-0 bottom-6 absolute">
      {arr.map((_, index) => {
        const selected = index === selectedIndex;
        return (
          <div
            className={classNames({
              'h-4 w-4 rounded-full transition-all duration-300 bg-white': true,
              // tune down the opacity if slide is not selected
              'opacity-25': !selected,
            })}
            key={index}
          ></div>
        );
      })}
    </div>
  );
};

export default Dots;
