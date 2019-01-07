import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import TribeBoard from './components/TribeBoard/TribeBoard'

class App extends Component {
  constructor() {
    super();
    this.state = {
      season: 37,
      episode: 0,
      activeTribes: [],
      seasonData: []
    }
  }

  setSeason = async (season) => {
    const url = `http://localhost:3000/?season=${season}`;
    const response = await fetch(url);
    const seasonData = await response.json();
    this.setState({season, seasonData})
  }

  // updateCastaways = async (episode) => {
  //   const castawayData = await this.setSeason(this.state.season);
    
  //   this.setState({
  //     castaways: currentCastawaysTribes,
  //     allTribes: castawayData.tribes,
  //     activeTribes
  //   });
  // }

  setEpisode = (event) => {
    const episode = event.target.value;
    this.setState({episode});
    this.updateCastaways(episode);
  }

  async componentDidMount() {
    this.setSeason(37)
  }

  render() {
    const {setSeason, setEpisode, episode, season, seasonData} = this.state;
    return (
      <div className="App">
        <NavBar 
          season={season}
          episode={episode}
          setSeason={setSeason}
          setEpisode={setEpisode}
        />
        <TribeBoard seasonData={seasonData} />
      </div>
    );
  }
}

export default App;
