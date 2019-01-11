import React from 'react';
import Tribe from '../Tribe/Tribe';
import VotedOutPanel from '../VotedOutPanel/VotedOutPanel';

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
      return episodeData.castaways.some(castaway => castaway.tribe.replace(/\d| /g, '') === tribe.name);
    })

    this.setState({activeTribes})
  }

  setEpisodeData = (seasonData, episodeId) => {
    const episodeData = seasonData.episodes.find(episode => episode.id === episodeId);
    this.setState({episodeData});
  }

  componentDidMount() {
    const { seasonData, episodeId } = this.props;
    this.setActiveTribes(seasonData, episodeId)
    this.setEpisodeData(seasonData, episodeId)
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
      <VotedOutPanel episodeData={episodeData}/>
    </main>
    )
  }
}

export default TribeBoard;