import React from 'react';
import './header.css';
import Logo from './Logo.jsx';
import SearchBar from './SearchBar.jsx';
import Nav from './Nav.jsx';

function Header() {
  return (
    <header id='header' className='header fixed-top d-flex align-item-center'>
        <Logo/>
        <SearchBar/>
        <Nav/>
    </header>
  )
}

export default Header
