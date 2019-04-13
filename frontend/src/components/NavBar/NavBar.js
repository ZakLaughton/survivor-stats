import React from 'react';
import './NavBar.css';

const NavBar = ({
  incrementEpisode,
  decrementEpisode,
  allSeasons,
  setSeason,
  setEpisode,
  seasonNum,
  episodeId,
  seasonData,
  atEarliestEpisode,
  atLatestEpisode,
}) => {
  const episodeNumber = Number(episodeId.slice(-2));
  return (
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
      <select
        value={seasonNum || ''}
        onChange={evt => setSeason(evt.target.value)}
        id="season-select"
      >
        {allSeasons.map(season => (
          <option key={season.season_no} value={season.season_no}>
            {'s'}
            {season.season_no.toString()}
            {': '}
            {season.title}
          </option>
        ))}
      </select>
      <div className="episode-selector">
        <i
          className={`fas fa-caret-left episode-arrow left ${atEarliestEpisode() && 'hidden'}`}
          onClick={decrementEpisode}
        />
        <h2>{episodeNumber === 0 ? 'START' : `EPISODE ${episodeNumber}`}</h2>
        <i
          className={`fas fa-caret-right episode-arrow right ${atLatestEpisode() && 'hidden'}`}
          onClick={incrementEpisode}
        />
      </div>
      <h1>Survivor Stats</h1>
    </header>
  );
};

export default NavBar;
