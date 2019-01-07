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
    const activeTribes = tribes.filter((tribe) => {
      return episodeData.castaways.some(castaway => castaway.tribe === tribe.name);
    })

    this.setState({activeTribes})
  }

  componentWillReceiveProps(nextProps) {
    const {seasonData} = nextProps;
    if (seasonData.episodes) {
      debugger;
      this.setActiveTribes(seasonData, 's37e01')
    } 
  }

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