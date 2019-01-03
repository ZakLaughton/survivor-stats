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
      tribes: []
    }
  }

  getCastaways = async (episode) => {
    const url = `http://localhost:3000/?episode=${episode}`
    const response = await fetch(url)
    const jsonResponse = await response.json()
    this.setState({
          castaways: jsonResponse.castaways,
          tribes: jsonResponse.tribes});
  }

  setTribes = () => {
    const currentCastaways = this.state.castaways
    const currentTribes = currentCastaways
      .filter(castaway => castaway.tribe !== 'out')
      .map(castaway => castaway.tribe)
    const uniqueTribes = new Set(currentTribes);
  }

  updateEpisode = async (event) => {
    const episode = event.target.value;
    this.setState({episode});
    await this.getCastaways(episode);
    await this.setTribes();
  }

  async componentDidMount() {
    // await this.getCastaways()
    // await this.setTribes()
  }

  render() {
    const {castaways, tribes, season, episode} = this.state;
    console.log(castaways)
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
