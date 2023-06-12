import React, { Fragment, useCallback, useState } from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import AuthContext from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const navigate = useNavigate();
  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/" element={<Users />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn ?? false, login, logout }}
      >
        <MainNavigation />
        <main>{routes}</main>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;