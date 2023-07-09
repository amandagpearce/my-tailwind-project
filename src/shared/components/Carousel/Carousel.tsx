import React from 'react';
import Dots from './Dots';
import Controls from './Controls';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import { PropsWithChildren, useEffect, useState } from 'react';

// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
  // useEmblaCarousel returns a emblaRef that must be attached to a container
  // EmblaCarousel will use that ref as basis for swipe and other functionalities
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    function selectHandler() {
      // selectedScrollSnap gives us the current selected index.
      const index = emblaApi?.selectedScrollSnap();
      setSelectedIndex(index || 0);
    }

    emblaApi?.on('select', selectHandler);

    // cleanup
    return () => {
      emblaApi?.off('select', selectHandler);
    };
  }, [emblaApi]);

  const length = React.Children.count(children);
  const canScrollNext = !!emblaApi?.canScrollNext();
  const canScrollPrev = !!emblaApi?.canScrollPrev();

  return (
    <div className="overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      <Dots itemsLength={length} selectedIndex={selectedIndex} />

      <Controls
        canScrollNext={canScrollNext}
        canScrollPrev={canScrollPrev}
        onNext={() => emblaApi?.scrollNext()}
        onPrev={() => emblaApi?.scrollPrev()}
      />
    </div>
  );
};

export default Carousel;
