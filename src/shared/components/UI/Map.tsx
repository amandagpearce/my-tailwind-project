import React, { useRef, useEffect } from 'react';

import './Map.css';

interface MapProps {
  center: { lat: number; lng: number };
  zoom: number;
  className?: string;
  style?: React.CSSProperties;
}

const Map: React.FC<MapProps> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const { center, zoom } = props; // destructuring the configs so they can be used as dependencies for the useEffect hook

  // without useEffect here the app would crash because we would try to populate the map content without the ref being connected to it yet
  // (it is only connected in the return statement)
  useEffect(() => {
    if (!window.google) {
      // Google Maps API is not loaded yet
      return;
    }

    // window.google.maps.Map is available from the script import in the index.html file
    const map = new window.google.maps.Map(mapRef.current, {
      // takes a pointer to the div where the map will be rendered
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map }); // rendering the maps marker
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
