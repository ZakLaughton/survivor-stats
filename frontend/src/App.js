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

  getCastaways = () => {
    const that = this;
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((res) => {
        console.log(res);
        that.setState({
          castaways: res.castaways,
          tribes: res.tribes});
      })
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
