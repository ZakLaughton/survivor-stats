import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tribe name="David" color="orange"/>
        <Tribe name="Goliath" color="purple"/>
      </div>
    );
  }
}

export default App;
