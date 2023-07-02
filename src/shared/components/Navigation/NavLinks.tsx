import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

const NavLinks = () => {
  const authContext = useContext(AuthContext);

  return (
    <ul className="nav-links flex justify-between text-white">
      <li className="p-3">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'bg-hoverPurple p-3' : 'hover:bg-hoverPurple p-3'
          }
          to="/"
        >
          All Users
        </NavLink>
      </li>

      {authContext.isLoggedIn && (
        <li className="p-3">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-hoverPurple p-3' : 'hover:bg-hoverPurple p-3'
            }
            to={`/${authContext.userId}/places`}
          >
            My Places
          </NavLink>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li className="p-3">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-hoverPurple p-3' : 'hover:bg-hoverPurple p-3'
            }
            to="/places/new"
          >
            Add Place
          </NavLink>
        </li>
      )}

      {!authContext.isLoggedIn && (
        <li className="p-3">
          <NavLink
            className={({ isActive }) =>
              isActive ? 'bg-hoverPurple p-3' : 'hover:bg-hoverPurple p-3'
            }
            to="/auth"
          >
            Login
          </NavLink>
        </li>
      )}

      {authContext.isLoggedIn && (
        <li>
          <button className="p-3" onClick={authContext.logout}>
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
