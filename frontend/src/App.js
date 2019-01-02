import React, { Component } from 'react';
import './App.css';
import Tribe from './components/Tribe/Tribe';

class App extends Component {
  constructor() {
    super();
    this.state = {
      season: 1,
      episode: 1,
      castaways: [],
      tribes: []
    }
  }

  getCastaways = () => {
    const that = this;
    fetch('http://localhost:3000')
      .then(response => response.json())
      .then((res) => {
        that.setState({
          castaways: res.castaways,
          tribes: res.tribes});
      })
  }

  componentDidMount() {
    this.getCastaways()
  }

  render() {
    const {castaways, tribes} = this.state;
    return (
      <div className="App">
        {tribes.map(tribe => (
            <Tribe
              key={tribe.name}
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
