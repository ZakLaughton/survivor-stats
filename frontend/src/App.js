/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState } from 'react';
import './App.css';
import ReactGA from 'react-ga';
import { CloudinaryContext } from 'cloudinary-react';
import NavBar from './components/NavBar/NavBar';
import { PROD_BACKEND_URL } from './constants';
// eslint-disable-next-line import/no-unresolved
import { TribeBoard } from './components/TribeBoard/TribeBoard';
import SeasonInfoMessage from './components/SeasonInfoMessage/SeasonInfoMessage';
import PreseasonStats from './components/PreseasonStats/PreseasonStats';
import EpisodeEvents from './components/EpisodeEvents/EpisodeEvents';

function initializeReactGA() {
  if (document.location.hostname.search(`survivorstats.com`) !== -1) {
    ReactGA.initialize(`UA-67511792-3`);
    ReactGA.pageview(`/`);
  }
}

export const App = ({ match }) => {
  const { activeSeasonNumber } = match.params;
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState(0);
  const [activeSeasonData, setActiveSeasonData] = useState({});
  const [infoMessage, setInfoMessage] = useState(`Loading...`);
  useEffect(() => {
    initializeReactGA();
  }, []);

  const isEpisodeActive = episode => episode.active === true;

  useEffect(() => {
    const url = `${PROD_BACKEND_URL}/?season=${activeSeasonNumber}`;
    async function fetchData() {
      const response = await fetch(url);
      setInfoMessage(`Loading...`);
      const newActiveSeasonData = await response.json();
      newActiveSeasonData.episodes = newActiveSeasonData.episodes
        .filter(isEpisodeActive)
        .sort((a, b) => (a.id > b.id ? 1 : -1));
      setActiveSeasonData(newActiveSeasonData);
      setActiveEpisodeNumber(0);
      setInfoMessage('');
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

  const atEarliestEpisode = () => activeEpisodeNumber === 0;

  const atLatestEpisode = () => {
    if (activeSeasonData.episodes) {
      const numberOfEpisodes = activeSeasonData.episodes.length;
      const currentEpisode = Number(activeEpisodeNumber);

      return currentEpisode === numberOfEpisodes - 1;
    }
    return false;
  };

  const decrementEpisode = () => {
    if (!atEarliestEpisode()) {
      setActiveEpisodeNumber(activeEpisodeNumber - 1);
    }
  };
  const incrementEpisode = () => {
    if (!atLatestEpisode()) {
      setActiveEpisodeNumber(activeEpisodeNumber + 1);
    }
  };

  const onKeyPressed = e => {
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
    <CloudinaryContext cloudName='survivorstats'>
      <div className='App' onKeyDown={onKeyPressed} tabIndex='0'>
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
          {
            <main>
              {activeSeasonData.episodes && (
                <TribeBoard
                  activeSeasonData={activeSeasonData}
                  activeEpisodeNumber={activeEpisodeNumber}
                />
              )}
              {activeSeasonData.preseasonStats &&
                activeSeasonData.preseasonStats.length > 0 &&
                Number(activeSeasonNumber) === 38 &&
                activeEpisodeNumber === 0 && (
                  <PreseasonStats preseasonStats={activeSeasonData.preseasonStats} />
                )}
              {currentEpisodeHasTribalCouncils() && (
                <EpisodeEvents
                  activeSeasonData={activeSeasonData}
                  activeEpisodeNumber={activeEpisodeNumber}
                />
              )}
            </main>
          }
        </div>
      </div>
    </CloudinaryContext>
  );
};
