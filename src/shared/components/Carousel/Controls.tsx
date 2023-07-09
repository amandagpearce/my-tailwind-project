import React from 'react';
import classNames from 'classnames';

type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};
const Controls = (props: Props) => {
  return (
    <div className="carousel__controls absolute top-1/2 flex w-full justify-between">
      <button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        className={classNames({
          'px-4 py-2 text-white rounded-md': true,
          'bg-transparent': true,
          'opacity-25': !props.canScrollPrev,
          'opacity-100': props.canScrollPrev,
          'mx-4': true,
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-12 h-12 text-white"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>
      <button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        className={classNames({
          'px-4 py-2 text-white rounded-md': true,
          'bg-transparent': true,
          'opacity-25': !props.canScrollNext,
          'opacity-100': props.canScrollNext,
          'mx-4': true,
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-12 h-12 text-white"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </div>
  );
};

export default Controls;
