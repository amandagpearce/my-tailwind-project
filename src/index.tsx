import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootNode = document.getElementById('root');
// Get the Google API key from the environment variable
const googleApiKey = process.env.REACT_GOOGLE_KEY;

if (rootNode) {
  const mapsScriptTag = document.querySelector(
    `script[src*="maps.googleapis.com/maps/api/"]`
  );

  if (!mapsScriptTag) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    document.body.appendChild(script);
  }

  createRoot(rootNode).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
