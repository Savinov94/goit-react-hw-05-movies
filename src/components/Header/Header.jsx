import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <nav>
      <div className={css.container}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={location.pathname === '/' ? css.activeLink : ''}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={
                location.pathname.startsWith('/movies') ? css.activeLink : ''
              }
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
