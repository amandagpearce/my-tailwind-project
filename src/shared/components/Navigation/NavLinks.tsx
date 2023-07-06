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
            isActive
              ? 'bg-hoverPurple p-3 text-sm'
              : 'hover:bg-hoverPurple p-3 text-sm'
          }
          to="/"
        >
          Home
        </NavLink>
      </li>

      <li className="p-3">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'bg-hoverPurple p-3 text-sm'
              : 'hover:bg-hoverPurple p-3 text-sm'
          }
          to="/users"
        >
          All Users
        </NavLink>
      </li>

      {authContext.isLoggedIn && (
        <li className="p-3">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'bg-hoverPurple p-3 text-sm'
                : 'hover:bg-hoverPurple p-3 text-sm'
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
              isActive
                ? 'bg-hoverPurple p-3 text-sm'
                : 'hover:bg-hoverPurple p-3 text-sm'
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
          <button
            className="p-3 text-sm mt-1 underline"
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
