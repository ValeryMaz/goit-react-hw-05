import clsx from 'clsx';
import css from './Navigation.module.css';

import { NavLink } from 'react-router-dom';
export default function Navigation() {
  const setActiveClass = ({ isActive }) => {
    return clsx(css.navLink, isActive && css.active);
  };
  return (
    <>
      <header>
        <nav className={clsx(css.ul)}>
          <NavLink to="/" className={setActiveClass}>
            Home
          </NavLink>
          <NavLink to="/Movies" className={setActiveClass}>
            Movies
          </NavLink>
        </nav>
      </header>
    </>
  );
}
