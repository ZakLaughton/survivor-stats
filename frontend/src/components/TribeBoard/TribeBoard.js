import React from 'react';
import Tribe from '../Tribe/Tribe';

class TribeBoard extends React.Component {
  state = {
    activeTribes: []
  }


  // const episodes = this.props.seasonData.episodes;
  // const tribes  = this.props.seasonData.tribes;
  setActiveTribes = (seasonData, episode) => {
    const {tribes} = seasonData;
    const episodeData = seasonData.episodes.find((episodex) => {
       return episodex.id === episode;
    })

    console.log('ed: ', episodeData)
  }

  // getActiveTribes = (tribes, episodeData) => {
  //   if (tribes.some(tribe => castaway.tribe === tribe.name)) {
  //     return true;
  //   } else {return false;}
  // }

  render() {
    const {activeTribes} = this.state;
    const {seasonData} = this.props;
    // debugger;
    console.log('sd: ', seasonData);
    if (seasonData.episode) {
      this.setActiveTribes(seasonData, 1)
    } 
    return(
      <main>
      {activeTribes.length > 0 &&
        activeTribes.map(tribe => (
          <Tribe
            key={tribe.name}
            tribe={tribe}
            seasonData={seasonData} />
        ))
      }
      {activeTribes.length === 0 && 'loading...'}
    </main>
    )
  }
}

export default TribeBoard;