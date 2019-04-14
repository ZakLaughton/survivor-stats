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
      {
        <div className="dropdown" id="season-select">
          <button className="dropbtn">Season</button>
          <div className="dropdown-content">
            {allSeasons.map(season => (
              <a href="#" key={season.season_no} value={season.season_no}>
                {season.season_no.toString()}
                {': '}
                {season.title}
              </a>
            ))}
          </div>
        </div>
      }

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
