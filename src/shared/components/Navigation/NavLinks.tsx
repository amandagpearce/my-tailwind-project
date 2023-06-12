import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth-context';
import './NavLinks.css';

const NavLinks = () => {
  const authContext = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <Link to="/">All Users</Link>
      </li>

      {authContext.isLoggedIn && (
        <li>
          <Link to="/u1/places">My Places</Link>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li>
          <Link to="/places/new">Add Place</Link>
        </li>
      )}

      {!authContext.isLoggedIn && (
        <li>
          <Link to="/auth">Login</Link>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li>
          <button onClick={authContext.logout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
