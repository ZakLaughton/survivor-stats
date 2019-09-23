import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({
  incrementEpisode,
  decrementEpisode,
  seasonDirectory,
  setSeason,
  seasonNum,
  episodeId,
  activeSeasonData,
  atEarliestEpisode,
  atLatestEpisode,
  history,
}) => {
  console.log(`HIST>>>`, history);
  const episodeNumber = Number(episodeId.slice(-2));
  const seasonTitle = activeSeasonData && seasonDirectory && seasonNum
    ? seasonDirectory.find(season => seasonNum === season.season_no).title
    : `Season`;
  const closeDropdown = () => {
    document.querySelector(`.dropdown`).classList.remove(`active`);
  };
  const selectSeasonOption = (season) => {
    setSeason(season);
    closeDropdown();
  };
  const openDropdown = () => {
    document.querySelector(`.dropdown`).classList.add(`active`);
  };
  console.log('!>>', seasonDirectory)
  return (
    <header className="navbar" id="myTopnav">
      {
        <div
          className="dropdown"
          id="season-select"
          onMouseLeave={closeDropdown}
          onTouchEnd={openDropdown}
        >
          {seasonTitle && (
            <div className="dropbtn" onMouseEnter={openDropdown}>
              <div className="season-title">{`${seasonTitle} `}</div>
              <div className="season-title-icon">
                <i className="fas fa-caret-down" />
              </div>
            </div>
          )}
          <div className="dropdown-content">
            {seasonDirectory.map(season => (
              <Link to={`/${season.season_no}`}>
                <div
                  key={season.season_no}
                  value={season.season_no}
                  className={`season-option ${season.season_no === seasonNum && `selected`}`}
                >
                  {season.season_no.toString()}
                  {`: `}
                  {season.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      }

      <div className="episode-selector">
        <i
          className={`fas fa-caret-left episode-arrow left ${atEarliestEpisode() && `hidden`}`}
          onClick={decrementEpisode}
        />
        <h2>{episodeNumber === 0 ? `START` : `EPISODE ${episodeNumber}`}</h2>
        <i
          className={`fas fa-caret-right episode-arrow right ${atLatestEpisode() && `hidden`}`}
          onClick={incrementEpisode}
        />
      </div>
      <h1>Survivor Stats</h1>
    </header>
  );
};

export default NavBar;
