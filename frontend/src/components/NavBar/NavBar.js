import React, {useState, useEffect} from "react";
import { PROD_BACKEND_URL } from "../../constants";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({
  incrementEpisode,
  decrementEpisode,
  seasonNumber,
  episodeNumber,
  atEarliestEpisode,
  atLatestEpisode,
  history,
}) => {
  const [seasonDirectory, setSeasonDirectory] = useState([])
  console.log(`HIST>>>`, history);
  console.log('SD>>>', seasonDirectory);
  let seasonTitle = `Loading...`;
  
    seasonTitle = seasonNumber && seasonDirectory.length > 0
    ? seasonDirectory.find(season => seasonNumber === season.season_no).title
    : `Loading...`;

  const closeDropdown = () => {
    document.querySelector(`.dropdown`).classList.remove(`active`);
  };

const updateSeasonDirectory = async () => {
    const response = await fetch(`${PROD_BACKEND_URL}/seasons`);
    const newSeasonDirectory = await response.json();
    const sortedActiveSeasons = newSeasonDirectory
      .filter(season => season.active === true)
      .sort((a, b) => b.season_no - a.season_no);
    setSeasonDirectory(sortedActiveSeasons);
  };

  useEffect(() => {
    async function fetchData() {
      await updateSeasonDirectory()
    };
    fetchData();
  } , [])

  const openDropdown = () => {
    document.querySelector(`.dropdown`).classList.add(`active`);
  };
  console.log('!>>', seasonDirectory);
  return (
    <header className="navbar" id="myTopnav">
      {
        <div
          className="dropdown"
          id="season-select"
          onMouseLeave={closeDropdown}
          onTouchEnd={openDropdown}
        >
          {(
            <div className="dropbtn" onMouseEnter={openDropdown}>
              <div className="season-title">{seasonTitle}</div>
              <div className="season-title-icon">
                <i className="fas fa-caret-down" />
              </div>
            </div>
          )}
          <div className="dropdown-content">
            {seasonDirectory.map(season => (
              <Link to={`/${season.season_no}`} key={season.season_no}>
                <div
                  key={season.season_no}
                  value={season.season_no}
                  className={`season-option ${season.season_no === seasonNumber && `selected`}`}
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
