import React from 'react';
import Carousel from '../components/Carousel/Carousel';
import Button from '../components/FormElements/Button';

const Home: React.FC = () => {
  const slides = [
    {
      imageSrc: 'img/carousel/home.jpg',
      title: "Keep Track of all places you'll visit in that trip",
      ctaText: 'Get Started',
      ctaLink: '/auth',
    },
    {
      imageSrc: 'img/carousel/home-2.jpg',
      title: "View all places in a map add the info you'll need",
      ctaText: 'Get Started',
      ctaLink: '/auth',
    },
  ];

  return (
    <div className="w-full relative">
      <Carousel loop>
        {slides.map((currentSlide, i) => {
          return (
            // flex[0_0_100%]
            //   - shorthand for flex-grow:0; flex-shrink:0; flex-basis:100%
            <div
              className="relative h-full flex-[0_0_100%] overflow-hidden"
              key={i}
            >
              <div
                className="carousel__container"
                style={{ maxHeight: 'calc(100vh - 128px)' }}
              >
                <div style={{ animation: 'zoom-in-out 30s infinite' }}>
                  <img
                    src={currentSlide.imageSrc}
                    className="object-cover"
                    alt="alt"
                  />
                </div>
                <div className="carousel__info h-fit max-w-screen-lg absolute inset-x-0 inset-y-0 mx-auto my-auto flex flex-wrap items-center justify-center uppercase">
                  <h2 className="w-full text-center text-white text-8xl font-display leading-none drop-shadow-lg">
                    {currentSlide.title}
                  </h2>
                  <Button to={currentSlide.ctaLink} className="text-lg mt-4">
                    {currentSlide.ctaText}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Home;
