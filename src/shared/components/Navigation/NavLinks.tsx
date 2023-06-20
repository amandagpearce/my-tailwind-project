import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

const NavLinks = () => {
  const authContext = useContext(AuthContext);

  return (
    <ul className="nav-links flex justify-between text-white">
      <li className="p-3">
        <Link className="hover:bg-hoverPurple p-3" to="/">
          All Users
        </Link>
      </li>

      {authContext.isLoggedIn && (
        <li className="p-3">
          <Link className="hover:bg-hoverPurple p-3" to="/u1/places">
            My Places
          </Link>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li className="p-3">
          <Link className="hover:bg-hoverPurple p-3" to="/places/new">
            Add Place
          </Link>
        </li>
      )}

      {!authContext.isLoggedIn && (
        <li className="p-3">
          <Link className="hover:bg-hoverPurple p-3" to="/auth">
            Login
          </Link>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li>
          <button
            className="hover:bg-hoverPurple p-3"
            onClick={authContext.logout}
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
