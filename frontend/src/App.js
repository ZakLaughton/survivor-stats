import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import TribeBoard from './components/TribeBoard/TribeBoard';
import ReactGA from 'react-ga';
import SeasonInfoMessage from './components/SeasonInfoMessage/SeasonInfoMessage';
import PreseasonStats from './components/PreseasonStats/PreseasonStats';
import { Switch, Route } from 'react-router-dom';

function initializeReactGA() {
  if (document.location.hostname.search('visualsurvivor.com') !== -1) {
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
      activeTribes: [],
      seasonData: {},
      infoMessage: 'Loading...',
    };
  }

  fetchUrl = 'https://visual-survivor.herokuapp.com';
  // fetchUrl = 'http://localhost:5000'

  setSeason = async season => {
    const url = `${this.fetchUrl}/?season=${season}`;
    const response = await fetch(url);
    const seasonData = await response.json();
    const formattedSeasonNum = ('0' + season).slice(-2);
    this.setState({ season, seasonData, episodeId: `s${formattedSeasonNum}e00` });
    const infoMessage = this.state.allSeasons.find(
      seasonData => seasonData.season_no === Number(season),
    ).info_message;
    this.setState({ infoMessage });
  };

  initializeSeasons = async () => {
    const response = await fetch(`${this.fetchUrl}/seasons`);
    const allSeasons = await response.json();
    const sortedSeasons = allSeasons.sort((a, b) => b.season_no - a.season_no);
    const lastSeasonNum = sortedSeasons[0].season_no;
    this.setState({ allSeasons: sortedSeasons });
    await this.setSeason(lastSeasonNum);
  };

  setEpisode = episodeNum => {
    const formattedEpisodeNum = ('0' + episodeNum).slice(-2);
    const episodeId = `s${this.state.season}e${formattedEpisodeNum}`;
    this.setState({ episodeId });
  };

  incrementEpisode = () => {
    const numberOfEpisodes = this.state.seasonData.episodes.length;
    const currentEpisode = Number(this.state.episodeId.slice(-2));
    if (currentEpisode < numberOfEpisodes - 1) {
      const formattedSeasonNum = ('0' + this.state.season).slice(-2);
      const newEpisode = currentEpisode + 1;
      const formattedEpisodeNum = ('0' + newEpisode).slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      this.setState({ episodeId: newEpisodeId });
    }
  };

  decrementEpisode = () => {
    const currentEpisode = Number(this.state.episodeId.slice(-2));
    if (currentEpisode > 0) {
      const formattedSeasonNum = ('0' + this.state.season).slice(-2);
      const newEpisode = currentEpisode - 1;
      const formattedEpisodeNum = ('0' + newEpisode).slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      this.setState({ episodeId: newEpisodeId });
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
    const { setSeason, setEpisode, incrementEpisode, decrementEpisode } = this;
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
              {seasonData.episodes && (
                <TribeBoard
                  seasonData={seasonData}
                  episodeId={episodeId}
                  tribeData={seasonData.tribes}
                  incrementEpisode={incrementEpisode}
                  decrementEpisode={decrementEpisode}
                />
              )}
              <PreseasonStats />
            </div>
          )}
        />
      </div>
    );
  }
}

export default App;
