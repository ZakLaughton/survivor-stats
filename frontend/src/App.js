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
  console.log('ASN>>>', activeSeasonNumber)
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState(0);
  const [activeSeasonData, setActiveSeasonData] = useState({});
  const [infoMessage, setInfoMessage] = useState(`Loading...`);
  console.log('IM>>>', infoMessage)
  console.log('EN>>>', activeEpisodeNumber);
  useEffect(() => {
    initializeReactGA();
  }, []);

  const isEpisodeActive = episode => episode.active === true;

  useEffect(() => {
    const url = `${PROD_BACKEND_URL}/?season=${activeSeasonNumber}`;
    async function fetchData() {
      const response = await fetch(url);
      setInfoMessage('Loading...')
      const newActiveSeasonData = await response.json();
      newActiveSeasonData.episodes = newActiveSeasonData.episodes
        .filter(isEpisodeActive)
        .sort((a, b) => a.id > b.id ? 1 : -1);
      console.dir(newActiveSeasonData);
      console.log(`>>>`, newActiveSeasonData);
      setActiveSeasonData(newActiveSeasonData);
      setActiveEpisodeNumber(0)
      setInfoMessage('')
    }
      fetchData();
  }, [activeSeasonNumber]);

  const currentEpisodeHasTribalCouncils = () => {
    if (activeSeasonData.episodes) {
      const episodeData = activeSeasonData.episodes[activeEpisodeNumber];
      if (episodeData && episodeData.tribalCouncils) {
        return episodeData.tribalCouncils.length > 0;
      }
    }

    return false;
  };

  const atLatestEpisode = () => {
    console.log('ale...>>>')
    console.log('ASD>>>', activeSeasonData)
    if (activeSeasonData.episodes) {
      const numberOfEpisodes = activeSeasonData.episodes.length;
      console.log('numberOfEpisodes>>>', numberOfEpisodes);
      const currentEpisode = Number(activeEpisodeNumber);
      console.log('currentEpisode>>>', currentEpisode);
      
      return currentEpisode === numberOfEpisodes - 1;
    }
    console.log('Not At Latest>>>')
    return false;
  };

  const decrementEpisode = () => { if (!atEarliestEpisode()) {setActiveEpisodeNumber(activeEpisodeNumber - 1);}};
  const incrementEpisode = () => { if (!atLatestEpisode()) {setActiveEpisodeNumber(activeEpisodeNumber + 1); }};

  const atEarliestEpisode = () => activeEpisodeNumber === 0;


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
        <NavBar
          seasonNumber={Number(activeSeasonNumber)}
          episodeNumber={activeEpisodeNumber}
          atEarliestEpisode={atEarliestEpisode}
          atLatestEpisode={atLatestEpisode}
          incrementEpisode={incrementEpisode}
          decrementEpisode={decrementEpisode}
        />
        <div>
          <SeasonInfoMessage message={infoMessage} />
          { <main>
            { activeSeasonData.episodes && (
              <TribeBoard
                activeSeasonData={activeSeasonData}
                activeEpisodeNumber={activeEpisodeNumber}
              />
            ) }
            { activeSeasonData.preseasonStats
              && activeSeasonData.preseasonStats.length > 0
              && Number(activeSeasonNumber) === 38
              && activeEpisodeNumber === 0 && (
                <PreseasonStats preseasonStats={activeSeasonData.preseasonStats} />
              ) }
            {currentEpisodeHasTribalCouncils() && (
              <EpisodeEvents activeSeasonData={activeSeasonData} activeEpisodeNumber={activeEpisodeNumber} />
            ) }
            </main> }
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
