import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      season: null,
      episode: 0,
      castaways: [],
      allTribes: [],
      activeTribes: []
    }
  }

  updateCastaways = async (episode) => {
    // Fetch data
    const url = `http://localhost:3000/?episode=${episode}`;
    const response = await fetch(url);
    const castawayData = await response.json();

    const formattedEpisode = ("0" + episode).slice(-2);


    // Pull unique players
    const allCastaways = castawayData.seasonTribeChanges.map(item => item.castaway);
    const uniqueCastawayStrings = [...new Set(allCastaways)];
    const uniqueCastaways = uniqueCastawayStrings.map(castaway => {return {'name': castaway};})

    // Pull current tribes
    // filter out changes from later episodes
    const currentTribeChanges = castawayData.seasonTribeChanges.filter(change => change.start_episode <= `s37e${formattedEpisode}`)
    // find largest start_episode for each castaway most recent change for each castaway
    const currentCastawaysTribes = uniqueCastaways.map((castaway) => {
      // Find the tribe changes for a given castaway, return the most recent
      const latestCastawayRecord = currentTribeChanges
        .filter(record => record.castaway === castaway.name)
        .reduce((prev, current) => (prev.start_episode > current.start_episode) ? prev : current);

      return {
        name: latestCastawayRecord.castaway,
        tribe: latestCastawayRecord.field_value
      }
    })

    const activeTribes = castawayData.tribes.filter((tribe) => {
      if (currentCastawaysTribes.some(castaway => castaway.tribe === tribe.name)) {
        return true;
      } else {
        return false;
      }
      // return tribe/color object
    })
    
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
