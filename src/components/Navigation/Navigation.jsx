import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <NavLink
        to="/"
        exact
        className={styles.link}
        activeClassName="active-link"
      >
        Home page
      </NavLink>
      <NavLink
        to="/movies"
        className={styles.link}
        activeClassName="active-link"
      >
        Movie page
      </NavLink>
    </nav>
  </header>
);

export default Navigation;
