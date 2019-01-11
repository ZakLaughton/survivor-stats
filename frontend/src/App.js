import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import TribeBoard from './components/TribeBoard/TribeBoard'

class App extends Component {
  constructor() {
    super();
    this.state = {
      allSeasons: [],
      season: null,
      episodeId: '',
      activeTribes: [],
      seasonData: {}
    }
  }

  setSeason = async (season) => {
    const url = `http://localhost:3000/?season=${season}`;
    const response = await fetch(url);
    const seasonData = await response.json();
    this.setState({season, seasonData})
  }

  getAllSeasons = async () => {
    const response = await fetch('http://localhost:3000/seasons');
    const allSeasons = await response.json();
    return allSeasons;
  }

  getLastSeasonNum = (allSeasons) => {
    const sortedSeasons = allSeasons.sort((a, b) => b.season_no - a.season_no)
    const lastSeasonNum = sortedSeasons[0].season_no
    return lastSeasonNum;
  }

  setLastSeason = async () => {
    const lastSeason = this.getLastSeasonNum(await this.getAllSeasons());
    this.setState({season: lastSeason});
  }

  setEpisode = (episodeNum) => {
    const formattedEpisodeNum = ("0" + episodeNum).slice(-2);
    const episodeId = `s${this.state.season}e${formattedEpisodeNum}`
    this.setState({episodeId});
  }

  componentDidMount() {
    this.setLastSeason();
  }

  render() {
    const {episodeId, season, seasonData} = this.state;
    const {setSeason, setEpisode} = this;
    return (
      <div className="App">
        <NavBar 
          seasonNum={season}
          episodeId={episodeId}
          setSeason={setSeason}
          setEpisode={setEpisode}
        />
        <TribeBoard seasonData={seasonData} episodeId={episodeId}/>
      </div>
    );
  }
}

export default App;
