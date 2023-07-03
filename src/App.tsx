import React, { Fragment, useCallback, useState } from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import AuthContext from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Home from './shared/pages/home';

import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
  const [userId, setUserId] = useState();

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const navigate = useNavigate();
  let routes;
  console.log('isLoggedIn', isLoggedIn);

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    );
  }

  return (
    <Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn ?? false,
          userId: userId,
          login,
          logout,
        }}
      >
        <MainNavigation />
        <main className="mx-auto px-8">{routes}</main>
      </AuthContext.Provider>
    </Fragment>
  );
};

export default App;
