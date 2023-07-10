import React, { Suspense } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import Home from './shared/pages/Home';
const Users = React.lazy(() => import('./user/pages/Users'));
const NewPlace = React.lazy(() => import('./places/pages/NewPlace'));
const UpdatePlace = React.lazy(() => import('./places/pages/UpdatePlace'));
const UserPlaces = React.lazy(() => import('./places/pages/UserPlaces'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

import AuthContext from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import LoadingSpinner from './shared/components/UI/LoadingSpinner';

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
        <main className="mx-auto">
          <Suspense
            fallback={
              <div className="mx-auto">
                <LoadingSpinner asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </AuthContext.Provider>
    </>
  );
};

export default App;
