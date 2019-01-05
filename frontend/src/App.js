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
      tribes: [],
      activeTribes: []
    }
  }

  updateCastaways = async (episode) => {
    const url = `http://localhost:3000/?episode=${episode}`
    const response = await fetch(url)
    const jsonResponse = await response.json()
    // this.setActiveTribes(jsonResponse.castaways)
    const allActiveTribes = jsonResponse.castaways.map(castaway => castaway.tribe);
    const uniqueActiveTribes = [...new Set(allActiveTribes)]
    this.setState({
          castaways: jsonResponse.castaways,
          tribes: jsonResponse.tribes,
          activeTribes: uniqueActiveTribes});
  }

  updateEpisode = (episode) => {
    this.setState({episode});
    this.updateCastaways(episode);
  }

  async componentDidMount() {
    // await this.updateCastaways()
  }

  render() {
    const {castaways, tribes, season, episode} = this.state;
    return (
      <div className="App">
        <NavBar 
          season={season}
          episode={episode}
          updateEpisode={this.updateEpisode}
        />
        <main>
          {tribes.length > 0 &&
            tribes.map(tribe => (
              <Tribe
                key={tribe.name}
                tribe={tribe}
                castaways={castaways} />
            ))
          }
          {tribes.length === 0 && 'loading'}
        </main>
      </div>
    );
  }
}

export default App;
