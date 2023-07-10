import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '../UI/Backdrop';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          onClick={openDrawerHandler}
          className="main-navigation__menu-btn w-6 h-6 bg-transparent flex flex-column justify-around mr-4 cursor-pointer border-none md:hidden"
        >
          <span className="block w-6 h-5 bg-white" />
          <span className="block w-6 h-5 bg-white" />
          <span className="block w-6 h-5 bg-white" />
        </button>
        <h1 className="main-navigation__title h-auto w-48 block relative">
          <Link to="/">
            <div>
              <img src="img/logo.png" className="App-logo" alt="Voyage Vault" />
            </div>
          </Link>
        </h1>
        <nav className="main-navigation__header-nav w-auto block hidden md:block">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
