import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const rootNode = document.getElementById('root');
// Get the Google API key from the environment variable
const googleApiKey = process.env.REACT_GOOGLE_KEY;

// Function to load the Google Maps script dynamically
const loadGoogleMapsScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

if (rootNode) {
  loadGoogleMapsScript().then(() => {
    createRoot(rootNode).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });
}
