import React from 'react';
import Tribe from '../Tribe/Tribe';

class TribeBoard extends React.Component {
  state = {
    activeTribes: [],
    episodeData: {}
  }

  setActiveTribes = (seasonData, episodeId) => {
    const {tribes} = seasonData;
    const episodeData = seasonData.episodes.find((episode) => {
       return episode.id === episodeId;
    })
    const activeTribes = tribes.filter((tribe) => {
      return episodeData.castaways.some(castaway => castaway.tribe === tribe.name);
    })

    this.setState({activeTribes})
  }

  setEpisodeData = (seasonData, episodeId) => {
    const episodeData = seasonData.episodes.find(episode => episode.id === episodeId);
    this.setState({episodeData});
  }

  componentWillReceiveProps(nextProps) {
    const { seasonData, episodeId } = nextProps;
    if (seasonData.episodes) {
      this.setActiveTribes(seasonData, episodeId)
      this.setEpisodeData(seasonData, episodeId)
    } 
  }

  render() {
    const {activeTribes, episodeData} = this.state;
    return(
      <main>
      {activeTribes.length > 0 &&
        activeTribes.map(tribe => (
          <Tribe
            key={tribe.name}
            tribe={tribe}
            episodeData={episodeData} />
        ))
      }
      {activeTribes.length === 0 && 'loading...'}
    </main>
    )
  }
}

export default TribeBoard;