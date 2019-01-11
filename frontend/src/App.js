import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import TribeBoard from './components/TribeBoard/TribeBoard'

class App extends Component {
  constructor() {
    super();
    this.state = {
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

  setEpisode = (episodeNum) => {
    const formattedEpisodeNum = ("0" + episodeNum).slice(-2);
    const episodeId = `s${this.state.season}e${formattedEpisodeNum}`
    this.setState({episodeId});
  }

  async componentDidMount() {
    this.setSeason(37)
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
