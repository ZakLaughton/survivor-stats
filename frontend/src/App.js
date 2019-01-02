import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';

const tribes = require('./database/tribes.json');
// const episodes = require('./database/episodes.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      season: 1,
      episode: 1,
      castaways: []
    }
  }

  getCastaways = () => {
    const that = this;
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((res) => {
        that.setState({castaways: res});
        console.log('res: ', res);
        console.log('state casts: ', this.state.castaways);
      })
  }

  componentDidMount() {
    this.getCastaways()
  }

  render() {
    const {castaways} = this.state;
    return (
      <div className="App">
        {tribes.map(tribe => (
            <Tribe
              name={tribe.name}
              color={tribe.tribeColor}
              tribeMembers={tribe.members}
              castaways={castaways} />
        ))}
      </div>
    );
  }
}

export default App;
