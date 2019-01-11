import React from 'react';
import './NavBar.css';

const NavBar = ({setSeason, setEpisode, seasonNum}) => {
  return(
    <header className="navbar" id="myTopnav">
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
      <select value={seasonNum}>
        <option selected disabled>Season</option>
        <option value="37">Season 37</option>>
      </select>
      <select
        onChange={evt => setEpisode(evt.target.value)}
      >
        <option selected disabled value="0">Episode</option>
        <option value="1">Episode 1</option>
        <option value="2">Episode 2</option>
        <option value="3">Episode 3</option>
        <option value="4">Episode 4</option>
        <option value="5">Episode 5</option>
        <option value="6">Episode 6</option>
        <option value="7">Episode 7</option>
        <option value="8">Episode 8</option>
        <option value="9">Episode 9</option>
        <option value="10">Episode 10</option>
        <option value="11">Episode 11</option>
        <option value="12">Episode 12</option>
        <option value="13">Episode 13</option>
        <option value="14">Episode 14</option>
      </select>
    </header>
  )
}

export default NavBar;