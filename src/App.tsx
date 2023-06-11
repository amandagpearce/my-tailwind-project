import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom';

import Users from './user/pages/Users';

const App: React.FC = () => {
  return (
    <main className="bg-black">
      <h1 className="text-secondary text-4xl font-bold">Yay</h1>
    </main>
  );
};

export default App;
