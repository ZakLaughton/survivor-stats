import React from 'react';
import './NavBar.css';

const NavBar = ({season, episode}) => {
  return(
    <header class="navbar" id="myTopnav">
      {/* <div class="dropdown">
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
      </div> */}
      <select>
        <option selected disabled>Season</option>
        <option value="season37">Season 37</option>>
      </select>
      <select>
        <option selected disabled>Episode</option>
        <option value="episode1">Episode 1</option>
        <option value="episode2">Episode 2</option>
        <option value="episode3">Episode 3</option>
        <option value="episode4">Episode 4</option>
        <option value="episode5">Episode 5</option>
        <option value="episode6">Episode 6</option>
        <option value="episode7">Episode 7</option>
        <option value="episode8">Episode 8</option>
        <option value="episode9">Episode 9</option>
        <option value="episode10">Episode 10</option>
        <option value="episode11">Episode 11</option>
        <option value="episode12">Episode 12</option>
        <option value="episode13">Episode 13</option>
      </select>
    </header>
  )
}

export default NavBar;