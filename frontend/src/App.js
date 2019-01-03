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

  getCastaways = (episode) => {
    const that = this;
    const url = `http://localhost:3000/?episode=${episode}`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then((res) => {
        console.log(res);
        that.setState({
          castaways: res.castaways,
          tribes: res.tribes});
      })
  }

  updateEpisode = (event) => {
    const episode = event.target.value;
    this.setState({episode});
    this.getCastaways(episode);
  }

  componentDidMount() {
    this.getCastaways()
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
