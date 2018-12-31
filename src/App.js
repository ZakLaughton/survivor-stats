import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';

const players = require('./database/players.json');
const tribes = require('./database/tribes.json');
const episodes = require('./database/episodes.json');

class App extends Component {
  render() {
    console.log(players);
    return (
      <div className="App">
        {tribes.map(tribe => (
            <Tribe
              name={tribe.name}
              color={tribe.tribeColor}
              tribeMembers={tribe.members}
              players={players} />
        ))}
      </div>
    );
  }
}

export default App;
