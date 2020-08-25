import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> UserApplication
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='!#'>Utilsateurs</Link>
        </li>
        <li>
          <Link to='/register'>Inscription</Link>
        </li>
        <li>
          <Link to='/login'>Connexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
