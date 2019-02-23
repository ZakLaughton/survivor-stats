import React from 'react';
import './NavBar.css';

const NavBar = ({
  allSeasons, setSeason, setEpisode, seasonNum, episodeId, seasonData,
}) => (
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
    <h1>Survivor Stats</h1>
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
    <select value={Number(episodeId.slice(-2))} onChange={evt => setEpisode(evt.target.value)}>
      <option value="0">Start</option>
      {seasonData.episodes
        && seasonData.episodes
          .filter(episode => episode.id.slice(-2) !== '00')
          .sort((a, b) => (a.id < b.id ? -1 : 1))
          .map(episode => (
            <option key={episode.id} value={Number(episode.id.slice(-2))}>
              {'Episode '}
              {Number(episode.id.slice(-2))}
            </option>
          ))}
    </select>
  </header>
);

export default NavBar;
