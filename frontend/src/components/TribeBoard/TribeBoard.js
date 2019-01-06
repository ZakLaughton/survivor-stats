import React from 'react';
import Tribe from '../Tribe/Tribe';

class TribeBoard extends React.Component {
  state = {
    activeTribes: []
  }

  // const episodes = this.props.seasonData.episodes;
  // const tribes  = this.props.seasonData.tribes;

  // getActiveTribes = (tribes, episodeData) => {
  //   if (tribes.some(tribe => castaway.tribe === tribe.name)) {
  //     return true;
  //   } else {return false;}
  // }

  render() {
    const {activeTribes} = this.state;
    const {seasonData} = this.props;

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