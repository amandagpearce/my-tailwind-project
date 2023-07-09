import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import AuthContext from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Home from './shared/pages/Home';

import useAuth from './shared/hooks/auth-hook';

import './App.css';

const App: React.FC = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  console.log('token', token);

  const UserPlacesWrapper = () => {
    const { userId } = useParams();
    console.log('userId', userId);
    return <UserPlaces userId={userId} />;
  };

  if (token) {
    routes = (
      <Routes>
        <Route path=":userId/places" element={<UserPlacesWrapper />} />
        <Route path="places/new" element={<NewPlace />} />
        <Route path="places/:placeId" element={<UpdatePlace />} />
        <Route path="users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path=":userId/places" element={<UserPlacesWrapper />} />
        <Route path="auth" element={<Auth />} />
        <Route path="users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login,
          logout,
        }}
      >
        <MainNavigation />
        <main className="mx-auto">{routes}</main>
      </AuthContext.Provider>
    </>
  );
};

export default App;
