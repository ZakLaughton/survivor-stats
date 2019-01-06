import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';
import NavBar from './components/NavBar/NavBar';

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

  getSeasonData = async (season) => {
    const url = `http://localhost:3000/?season=${season}`;
    const response = await fetch(url);
    const seasonData = await response.json();
    return seasonData;
  }

  getActiveTribes = (tribes, episodeData) => {
    if (tribes.some(tribe => castaway.tribe === tribe.name)) {
      return true;
    } else {return false;}
  }

  updateCastaways = async (episode) => {
    const castawayData = await getSeasonData(this.state.season);
    
    this.setState({
      castaways: currentCastawaysTribes,
      allTribes: castawayData.tribes,
      activeTribes
    });
  }

  updateEpisode = (event) => {
    const episode = event.target.value;
    this.setState({episode});
    this.updateCastaways(episode);
  }

  async componentDidMount() {
    this.updateCastaways(0)
  }

  render() {
    const {seasonData, season, episode} = this.state;
    return (
      <div className="App">
        <NavBar 
          season={season}
          episode={episode}
          updateEpisode={this.updateEpisode}
        />
        <main>
          {activeTribes.length > 0 &&
            activeTribes.map(tribe => (
              <Tribe
                key={tribe.name}
                tribe={seasonData.tribes}
                episodes={seasonData.episodes} />
            ))
          }
          {activeTribes.length === 0 && 'loading...'}
        </main>
      </div>
    );
  }
}

export default App;
