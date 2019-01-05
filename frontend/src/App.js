import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      season: null,
      episode: null,
      castaways: [],
      allTribes: [],
      activeTribes: []
    }
  }

  updateCastaways = async (episode) => {
    // Fetch data
    console.log('Beginning fetch...')
    const url = `http://localhost:3000/?episode=${episode}`
    const response = await fetch(url)
    console.log(response)
    const castawayData = await response.json()

    // Pull unique active tribes
    const allActiveTribeNames = castawayData.castaways.map(castaway => castaway.tribe);
    const uniqueActiveTribeNames = [...new Set(allActiveTribeNames)]
    const activeTribes = castawayData.tribes
      .filter((tribe) => uniqueActiveTribeNames.indexOf(tribe.name) > -1);
    
    this.setState({
          castaways: castawayData.castaways,
          allTribes: castawayData.tribes,
          activeTribes});
  }

  updateEpisode = (event) => {
    const episode = event.target.value;
    this.setState({episode});
    this.updateCastaways(episode);
  }

  async componentDidMount() {
    // await this.updateCastaways()
  }

  render() {
    const {castaways, allTribes, activeTribes, season, episode} = this.state;
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
                tribe={tribe}
                castaways={castaways} />
            ))
          }
          {activeTribes.length === 0 && 'loading...'}
        </main>
      </div>
    );
  }
}

export default App;
