import React from 'react';
import './NavBar.css';

const NavBar = ({season, episode}) => {
  return(
    <header class="navbar" id="myTopnav">
      <div class="dropdown">
        <button class="dropbtn">Season</button>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn">Episode</button>
        <div class="dropdown-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
    </header>
  )
}

export default NavBar;