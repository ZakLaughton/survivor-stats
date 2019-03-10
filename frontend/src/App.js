/* eslint-disable arrow-parens */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import './App.css';
import ReactGA from 'react-ga';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import TribeBoard from './components/TribeBoard/TribeBoard';
import SeasonInfoMessage from './components/SeasonInfoMessage/SeasonInfoMessage';
import PreseasonStats from './components/PreseasonStats/PreseasonStats';
import ArrowButtons from './components/ArrowButtons/ArrowButtons';
import EpisodeEvents from './components/EpisodeEvents/EpisodeEvents';

function initializeReactGA() {
  if (document.location.hostname.search('survivorstats.com') !== -1) {
    ReactGA.initialize('UA-67511792-3');
    ReactGA.pageview('/');
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      allSeasons: [],
      season: null,
      episodeId: '',
      seasonData: {},
      infoMessage: 'Loading...',
    };
  }

  fetchUrl = 'https://visual-survivor.herokuapp.com';
  // Swap line above for below TEST case
  // fetchUrl = 'http://localhost:5000';

  setSeason = async season => {
    const { allSeasons } = this.state;
    const url = `${this.fetchUrl}/?season=${season}`;
    const response = await fetch(url);
    const seasonData = await response.json();
    seasonData.episodes = seasonData.episodes.filter(episode => episode.active === true);
    // Swap line above for below TEST case
    // seasonData.episodes = seasonData.episodes.filter(episode => episode);
    const formattedSeasonNum = `0${season}`.slice(-2);
    this.setState({ season, seasonData, episodeId: `s${formattedSeasonNum}e00` });
    const infoMessage = allSeasons.find(seasonData => seasonData.season_no === Number(season))
      .info_message;
    this.setState({ infoMessage });
  };

  initializeSeasons = async () => {
    const response = await fetch(`${this.fetchUrl}/seasons`);
    const allSeasons = await response.json();
    const sortedActiveSeasons = allSeasons
      // Comment out below line to TEST new seasons
      .filter(season => season.active === true)
      .sort((a, b) => b.season_no - a.season_no);
    const lastSeasonNum = sortedActiveSeasons[0].season_no;
    this.setState({ allSeasons: sortedActiveSeasons });
    await this.setSeason(lastSeasonNum);
  };

  setEpisode = episodeNum => {
    const { season } = this.state;
    const formattedEpisodeNum = `0${episodeNum}`.slice(-2);
    const episodeId = `s${season}e${formattedEpisodeNum}`;
    this.setState({ episodeId });
  };

  atLatestEpisode = () => {
    const { seasonData, episodeId } = this.state;
    if (seasonData.episodes) {
      const numberOfEpisodes = seasonData.episodes.length;
      const currentEpisode = Number(episodeId.slice(-2));
      return currentEpisode === numberOfEpisodes - 1;
    } else {
      return;
    }
  };

  atEarliestEpisode = () => {
    const currentEpisode = Number(this.state.episodeId.slice(-2));
    return currentEpisode === 0;
  };

  incrementEpisode = () => {
    if (!this.atLatestEpisode()) {
      const formattedSeasonNum = ('0' + this.state.season).slice(-2);
      const newEpisode = Number(this.state.episodeId.slice(-2)) + 1;
      const formattedEpisodeNum = ('0' + newEpisode).slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top
      this.setState({ episodeId: newEpisodeId });
    }
  };

  decrementEpisode = () => {
    if (!this.atEarliestEpisode()) {
      const formattedSeasonNum = ('0' + this.state.season).slice(-2);
      const newEpisode = Number(this.state.episodeId.slice(-2)) - 1;
      const formattedEpisodeNum = ('0' + newEpisode).slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top
      this.setState({ episodeId: newEpisodeId });
    }
  };

  scrollToNextSection = () => {
    const preseasonStats = document.querySelector('.preseason-stats');
    const episodeEvents = document.querySelector('.episode-events');

    const nextSection = episodeEvents ? episodeEvents : preseasonStats;

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('clicked ', nextSection);
    }
  };

  currentEpisodeHasTribalCouncils = () => {
    const { episodeId, seasonData } = this.state;
    if (seasonData.episodes) {
      const episodeData = seasonData.episodes.find(episode => episode.id === episodeId);
      return episodeData.tribalCouncils.length > 0;
    } else {
      return;
    }
  };

  onKeyPressed = e => {
    switch (e.keyCode) {
      case 37:
        this.decrementEpisode();
        break;
      case 39:
        this.incrementEpisode();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    initializeReactGA();
    this.initializeSeasons();
  }

  render() {
    const { allSeasons, episodeId, season, seasonData, infoMessage } = this.state;
    const {
      setSeason,
      setEpisode,
      currentEpisodeHasTribalCouncils,
      incrementEpisode,
      decrementEpisode,
      scrollToNextSection,
      atEarliestEpisode,
      atLatestEpisode,
    } = this;
    return (
      <div className="App" onKeyDown={this.onKeyPressed} tabIndex="0">
        <NavBar
          allSeasons={allSeasons}
          seasonData={seasonData}
          seasonNum={season}
          episodeId={episodeId}
          setSeason={setSeason}
          setEpisode={setEpisode}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <SeasonInfoMessage message={infoMessage} />
              <main>
                {seasonData.episodes && (
                  <TribeBoard
                    seasonData={seasonData}
                    episodeId={episodeId}
                    tribeData={seasonData.tribes}
                  />
                )}
                {seasonData.preseasonStats &&
                  seasonData.preseasonStats.length > 0 &&
                  episodeId === 's38e00' && (
                    <PreseasonStats preseasonStats={seasonData.preseasonStats} />
                  )}
                {this.currentEpisodeHasTribalCouncils() && (
                  <EpisodeEvents seasonData={seasonData} episodeId={episodeId} />
                )}
              </main>
              <ArrowButtons
                incrementEpisode={incrementEpisode}
                decrementEpisode={decrementEpisode}
                downArrowAction={scrollToNextSection}
                currentEpisodeHasTribalCouncils={currentEpisodeHasTribalCouncils}
                atEarliestEpisode={atEarliestEpisode}
                atLatestEpisode={atLatestEpisode}
                episodeId={episodeId}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
