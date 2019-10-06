/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useState, FunctionComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import './App.css';
import ReactGA from 'react-ga';
// @ts-ignore Could not find a declaration file for module 'cloudinary-react'.
import { CloudinaryContext } from 'cloudinary-react';
import NavBar from './components/NavBar/NavBar';
// TODO: Set up better prod/dev environment variable strategy
// eslint-disable-next-line no-unused-vars
import { PROD_BACKEND_URL, DEV_BACKEND_URL } from './constants';
// eslint-disable-next-line import/no-unresolved
import { TribeBoard } from './components/TribeBoard/TribeBoard';
import { Episode, ActiveSeasonData, TribalCouncil } from './types';
import SeasonInfoMessage from './components/SeasonInfoMessage/SeasonInfoMessage';
import PreseasonStats from './components/PreseasonStats/PreseasonStats';
import TribalCouncils from './components/TribalCouncils/TribalCouncils';
import { KeyboardEvent } from 'react-native';

const ARRAY_SEARCH_RESULT_NOT_FOUND = -1;
const ARRAY_SORT_KEEP_ORDER = -1;
const ARRAY_SORT_SWAP_ORDER = 1;
const DEFAULT_EPISODE_NUMBER = 0;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;
const SEASON_NUMBER_WITH_PRESEASON_STATS = 38;
const EPISODE_NUMBER_TO_SHOW_PRESEASON_STATS = 0;

interface MatchParams {
  activeSeasonNumber: string;
  activeEpisodeNumber: string;
}

function initializeReactGA() {
  if (document.location.hostname.search(`survivorstats.com`) !== ARRAY_SEARCH_RESULT_NOT_FOUND) {
    ReactGA.initialize(`UA-67511792-3`);
    ReactGA.pageview(`/`);
  }
}

const App: FunctionComponent<RouteComponentProps<MatchParams>> = ({ match, history }) => {
  const activeSeasonNumber = Number(match.params.activeSeasonNumber);
  const activeEpisodeNumber = Number(match.params.activeEpisodeNumber);
  const [activeSeasonData, setActiveSeasonData] = useState<ActiveSeasonData | null>(null);
  const [infoMessage, setInfoMessage] = useState(``);
  useEffect(() => {
    initializeReactGA();
  }, []);

  const isEpisodeActive = (episode: Episode) => episode.active === true;

  useEffect(() => {
    const url = `${PROD_BACKEND_URL}/?season=${activeSeasonNumber}`;
    async function fetchData() {
      const response = await fetch(url);
      setInfoMessage(`Loading...`);
      const newActiveSeasonData: ActiveSeasonData = await response.json();
      newActiveSeasonData.episodes = newActiveSeasonData.episodes
        .filter(isEpisodeActive)
        .sort((a, b) => (a.id > b.id ? ARRAY_SORT_SWAP_ORDER : ARRAY_SORT_KEEP_ORDER));
      setActiveSeasonData(newActiveSeasonData);
      setInfoMessage('');
    }
    fetchData();
  }, [activeSeasonNumber]);

  const currentEpisodeHasTribalCouncils = () => {
    if (activeSeasonData && activeSeasonData.episodes) {
      const episodeData = activeSeasonData.episodes[activeEpisodeNumber];
      if (episodeData && episodeData.tribalCouncils) {
        return !!episodeData.tribalCouncils.length;
      }
    }

    return false;
  };

  const atEarliestEpisode = () => activeEpisodeNumber === DEFAULT_EPISODE_NUMBER;

  const atLatestEpisode = () => {
    if (activeSeasonData && activeSeasonData.episodes) {
      const numberOfEpisodes = activeSeasonData.episodes.length;
      const currentEpisode = Number(activeEpisodeNumber);

      return currentEpisode === numberOfEpisodes - 1;
    }
    return false;
  };

  const decrementEpisode = () => {
    if (!atEarliestEpisode()) {
      const newEpisodeNumber = Number(activeEpisodeNumber) - 1;
      history.push(`/${activeSeasonNumber}/${newEpisodeNumber}`);
    }
  };
  const incrementEpisode = () => {
    if (!atLatestEpisode()) {
      const newEpisodeNumber = Number(activeEpisodeNumber) + 1;
      history.push(`/${activeSeasonNumber}/${newEpisodeNumber}`);
    }
  };

  const onKeyPressed = (e: React.KeyboardEvent) => {
    switch (e.keyCode) {
      case LEFT_ARROW_KEY_CODE:
        decrementEpisode();
        break;
      case RIGHT_ARROW_KEY_CODE:
        incrementEpisode();
        break;
      default:
        break;
    }
  };

  let tribalCouncils: TribalCouncil[] = [];

  if (activeSeasonData && activeSeasonData.episodes) {
    const episodeData = activeSeasonData.episodes[activeEpisodeNumber];
    // eslint-disable-next-line prefer-destructuring
    tribalCouncils = episodeData.tribalCouncils;
  }
  return (
    <CloudinaryContext cloudName='survivorstats'>
      <div className='App' onKeyDown={onKeyPressed} tabIndex={0}>
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
              {activeSeasonData && activeSeasonData.episodes && (
                <TribeBoard
                  activeSeasonData={activeSeasonData}
                  activeEpisodeNumber={activeEpisodeNumber}
                />
              )}
              {activeSeasonData &&
                activeSeasonData.preseasonStats &&
                !!activeSeasonData.preseasonStats.length &&
                Number(activeSeasonNumber) === SEASON_NUMBER_WITH_PRESEASON_STATS &&
                Number(activeEpisodeNumber) === EPISODE_NUMBER_TO_SHOW_PRESEASON_STATS && (
                  <PreseasonStats preseasonStats={activeSeasonData.preseasonStats} />
                )}
              {currentEpisodeHasTribalCouncils() && (
                <TribalCouncils seasonNumber={activeSeasonNumber} tribalCouncils={tribalCouncils} />
              )}
            </main>
          }
        </div>
      </div>
    </CloudinaryContext>
  );
};

export default withRouter(App);
