import { NavLink } from 'react-router-dom';
import css from './Header.module.css';

const Header = () => {
  return (
    <nav>
      <div className={css.container}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
