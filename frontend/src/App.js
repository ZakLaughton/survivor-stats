/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import "./App.css";
import ReactGA from "react-ga";
import { Route } from "react-router-dom";
import { CloudinaryContext } from "cloudinary-react";
import NavBar from "./components/NavBar/NavBar";
import TribeBoard from "./components/TribeBoard/TribeBoard";
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      seasonDirectory: [],
      season: null,
      episodeId: ``,
      activeSeasonData: {},
      infoMessage: `Loading...`,
    };
  }

  fetchUrl = `https://visual-survivor.herokuapp.com`;
  // Swap line above for below TEST case
  // fetchUrl = `http://localhost:5000`;

  setSeason = async (season) => {
    const { seasonDirectory } = this.state;
    const url = `${this.fetchUrl}/?season=${season}`;
    const response = await fetch(url);
    const activeSeasonData = await response.json();
    activeSeasonData.episodes = activeSeasonData.episodes.filter(
      episode => episode.active === true,
    );
    // Swap line above for below TEST case
    // activeSeasonData.episodes = activeSeasonData.episodes.filter(episode => episode);
    const formattedSeasonNum = `0${season}`.slice(-2);
    this.setState({
      season,
      activeSeasonData,
      episodeId: `s${formattedSeasonNum}e00`,
    });
    const infoMessage = seasonDirectory.find(seasonData => seasonData.season_no === Number(season))
      .info_message;
    this.setState({
      infoMessage,
    });
  };

  initializeSeasons = async () => {
    const response = await fetch(`${this.fetchUrl}/seasons`);
    const seasonDirectory = await response.json();
    const sortedActiveSeasons = seasonDirectory
      // Comment out below line to TEST new seasons
      .filter(season => season.active === true)
      .sort((a, b) => b.season_no - a.season_no);
    const lastSeasonNum = sortedActiveSeasons[0].season_no;
    this.setState({
      seasonDirectory: sortedActiveSeasons,
    });
    await this.setSeason(lastSeasonNum);

    // Set to latest episode
    this.setState({
      episodeId: this.state.activeSeasonData.episodes.slice(-1)[0].id,
    });
  };

  setEpisode = (episodeNum) => {
    const { season } = this.state;
    const formattedEpisodeNum = `0${episodeNum}`.slice(-2);
    const episodeId = `s${season}e${formattedEpisodeNum}`;
    this.setState({
      episodeId,
    });
  };

  atLatestEpisode = () => {
    const { activeSeasonData, episodeId } = this.state;
    if (activeSeasonData.episodes) {
      const numberOfEpisodes = activeSeasonData.episodes.length;
      const currentEpisode = Number(episodeId.slice(-2));
      return currentEpisode === numberOfEpisodes - 1;
    }

    return false;
  };

  atEarliestEpisode = () => {
    const { episodeId } = this.state;
    const currentEpisode = Number(episodeId.slice(-2));
    return currentEpisode === 0;
  };

  incrementEpisode = () => {
    const { season, episodeId } = this.state;
    if (!this.atLatestEpisode()) {
      const formattedSeasonNum = `0${season}`.slice(-2);
      const newEpisode = Number(episodeId.slice(-2)) + 1;
      const formattedEpisodeNum = `0${newEpisode}`.slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top
      this.setState({
        episodeId: newEpisodeId,
      });
    }
  };

  decrementEpisode = () => {
    const { season, episodeId } = this.state;
    if (!this.atEarliestEpisode()) {
      const formattedSeasonNum = `0${season}`.slice(-2);
      const newEpisode = Number(episodeId.slice(-2)) - 1;
      const formattedEpisodeNum = `0${newEpisode}`.slice(-2);
      const newEpisodeId = `s${formattedSeasonNum}e${formattedEpisodeNum}`;
      document.body.scrollTop = document.documentElement.scrollTop = 0; // scroll to top
      this.setState({
        episodeId: newEpisodeId,
      });
    }
  };

  scrollToNextSection = () => {
    const preseasonStats = document.querySelector(`.preseason-stats`);
    const episodeEvents = document.querySelector(`.episode-events`);

    const nextSection = episodeEvents || preseasonStats;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: `smooth`,
        block: `start`,
      });
    }
  };

  currentEpisodeHasTribalCouncils = () => {
    const { episodeId, activeSeasonData } = this.state;
    if (activeSeasonData.episodes) {
      const episodeData = activeSeasonData.episodes.find(episode => episode.id === episodeId);
      return episodeData.tribalCouncils.length > 0;
    }

    return false;
  };

  onKeyPressed = (e) => {
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
    const {
      seasonDirectory, episodeId, season, activeSeasonData, infoMessage,
    } = this.state;
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
      <CloudinaryContext cloudName="survivorstats">
        <div className="App" onKeyDown={this.onKeyPressed} tabIndex="0">
          <NavBar
            seasonDirectory={seasonDirectory}
            activeSeasonData={activeSeasonData}
            seasonNum={season}
            episodeId={episodeId}
            setSeason={setSeason}
            setEpisode={setEpisode}
            atEarliestEpisode={atEarliestEpisode}
            atLatestEpisode={atLatestEpisode}
            incrementEpisode={incrementEpisode}
            decrementEpisode={decrementEpisode}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <SeasonInfoMessage message={infoMessage} />
                <main>
                  {activeSeasonData.episodes && (
                    <TribeBoard
                      activeSeasonData={activeSeasonData}
                      episodeId={episodeId}
                      tribeData={activeSeasonData.tribes}
                      seasonNum={season}
                    />
                  )}
                  {activeSeasonData.preseasonStats
                    && activeSeasonData.preseasonStats.length > 0
                    && episodeId === `s38e00` && (
                      <PreseasonStats preseasonStats={activeSeasonData.preseasonStats} />
                  )}
                  {this.currentEpisodeHasTribalCouncils() && (
                    <EpisodeEvents activeSeasonData={activeSeasonData} episodeId={episodeId} />
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
      </CloudinaryContext>
    );
  }
}

export default App;
