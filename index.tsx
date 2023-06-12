import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App';
import { BrowserRouter } from 'react-router-dom';

const rootNode = document.getElementById('root');

if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
