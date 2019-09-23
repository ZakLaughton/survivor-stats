/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/sort-comp */
import React, { useEffect, useState } from "react";
import "./App.css";
import ReactGA from "react-ga";
import { CloudinaryContext } from "cloudinary-react";
import NavBar from "./components/NavBar/NavBar";
import { PROD_BACKEND_URL } from "./constants";
// eslint-disable-next-line import/no-unresolved
import { TribeBoard } from "./components/TribeBoard/TribeBoard";
import SeasonInfoMessage from "./components/SeasonInfoMessage/SeasonInfoMessage";
import PreseasonStats from "./components/PreseasonStats/PreseasonStats";
import ArrowButtons from "./components/ArrowButtons/ArrowButtons";
import EpisodeEvents from "./components/EpisodeEvents/EpisodeEvents";

function initializeReactGA() {
  if (document.location.hostname.search(`survivorstats.com`) !== -1) {
    ReactGA.initialize(`UA-67511792-3`);
    ReactGA.pageview(`/`);
  }
}

export const App = ({ match }) => {
  const { activeSeasonNumber } = match.params;
  const [episodeId, setEpisodeId] = useState(``);
  const [activeSeasonData, setActiveSeasonData] = useState({});
  const [infoMessage, setInfoMessage] = useState(`Loading...`);
  const [seasonDirectory, setSeasonDirectory] = useState([]);

  useEffect(() => {
    initializeReactGA();
  }, []);

  useEffect(async () => {
    const response = await fetch(`${PROD_BACKEND_URL}/seasons`);
    const newSeasonDirectory = await response.json();
    const sortedActiveSeasons = newSeasonDirectory
      .filter(season => season.active === true)
      .sort((a, b) => b.season_no - a.season_no);
    setSeasonDirectory(sortedActiveSeasons);

    // this.setState({
    //   episodeId: this.state.,
    // });
  }, []);

  const isEpisodeActive = episode => episode.active === true;

  useEffect(async () => {
    const url = `${PROD_BACKEND_URL}/?season=${activeSeasonNumber}`;
    const response = await fetch(url);
    const newActiveSeasonData = await response.json();
    newActiveSeasonData.episodes = newActiveSeasonData.episodes.filter(isEpisodeActive);
    console.log(`>>>`, newActiveSeasonData);
    // setActiveSeasonData(newActiveSeasonData);
    // setEpisodeId(`s${activeSeasonNumber}e00`);
    // setInfoMessage(
    //   seasonDirectory.find(seasonData => seasonData.season_no === Number(activeSeasonNumber))
    //     .info_message,
    // );
    // Set to latest episode:
    // setEpisodeId(activeSeasonData.episodes.slice(-1)[0].id);
  }, [activeSeasonNumber]);

  const currentEpisodeHasTribalCouncils = () => {
    if (activeSeasonData.episodes) {
      const episodeData = activeSeasonData.episodes.find(episode => episode.id === episodeId);
      if (episodeData && episodeData.tribalCouncils) {
        return episodeData.tribalCouncils.length > 0;
      }
    }

    return false;
  };

  const atLatestEpisode = () => {
    if (activeSeasonData.episodes) {
      const numberOfEpisodes = activeSeasonData.episodes.length;
      const currentEpisode = Number(episodeId.slice(-2));
      return currentEpisode === numberOfEpisodes - 1;
    }

    return false;
  };

  const atEarliestEpisode = () => {
    const currentEpisode = Number(episodeId.slice(-2));
    return currentEpisode === 0;
  };

  const incrementEpisode = () => {
    if (!atLatestEpisode()) {
      const formattedSeasonNum = `0${activeSeasonNumber}`.slice(-2);
      const newEpisode = Number(episodeId.slice(-2)) + 1;
      const formattedEpisodeNum = `0${newEpisode}`.slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      // document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top
      setEpisodeId(newEpisodeId);
    }
  };

  const decrementEpisode = () => {
    if (!atEarliestEpisode()) {
      const formattedSeasonNum = `0${activeSeasonNumber}`.slice(-2);
      const newEpisode = Number(episodeId.slice(-2)) - 1;
      const formattedEpisodeNum = `0${newEpisode}`.slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      // document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top
      setEpisodeId(newEpisodeId);
    }
  };

  const onKeyPressed = (e) => {
    switch (e.keyCode) {
      case 37:
        decrementEpisode();
        break;
      case 39:
        incrementEpisode();
        break;
      default:
        break;
    }
  };

  return (
    <CloudinaryContext cloudName="survivorstats">
      <div className="App" onKeyDown={onKeyPressed} tabIndex="0">
        {seasonDirectory.length > 0 && (
          <NavBar
            seasonDirectory={seasonDirectory}
            activeSeasonData={activeSeasonData}
            seasonNum={Number(activeSeasonNumber)}
            episodeId={episodeId}
            atEarliestEpisode={atEarliestEpisode}
            atLatestEpisode={atLatestEpisode}
            incrementEpisode={incrementEpisode}
            decrementEpisode={decrementEpisode}
          />
        )}
        <div>
          <SeasonInfoMessage message={infoMessage} />
          <main>
            {activeSeasonData.episodes && (
              <TribeBoard
                activeSeasonData={activeSeasonData}
                episodeId={episodeId}
                tribeData={activeSeasonData.tribes}
                seasonNum={activeSeasonNumber}
              />
            )}
            {activeSeasonData.preseasonStats
              && activeSeasonData.preseasonStats.length > 0
              && episodeId === `s38e00` && (
                <PreseasonStats preseasonStats={activeSeasonData.preseasonStats} />
            )}
            {currentEpisodeHasTribalCouncils() && (
              <EpisodeEvents activeSeasonData={activeSeasonData} episodeId={episodeId} />
            )}
          </main>
          {/* <ArrowButtons
            incrementEpisode={incrementEpisode}
            decrementEpisode={decrementEpisode}
            downArrowAction={scrollToNextSection}
            currentEpisodeHasTribalCouncils={currentEpisodeHasTribalCouncils}
            atEarliestEpisode={atEarliestEpisode}
            atLatestEpisode={atLatestEpisode}
            episodeId={episodeId}
          /> */}
        </div>
      </div>
    </CloudinaryContext>
  );
};

//   setEpisode = episodeNum => {
//     const formattedEpisodeNum = `0${episodeNum}`.slice(-2);
//     const episodeId = `s${activeSeasonNumber}e${formattedEpisodeNum}`;
//     this.setState({
//       episodeId,
//     });
//   };

//

//   scrollToNextSection = () => {
//     const preseasonStats = document.querySelector(`.preseason-stats`);
//     const episodeEvents = document.querySelector(`.episode-events`);

//     const nextSection = episodeEvents || preseasonStats;

//     if (nextSection) {
//       nextSection.scrollIntoView({
//         behavior: `smooth`,
//         block: `start`,
//       });
//     }
//   };

// }
