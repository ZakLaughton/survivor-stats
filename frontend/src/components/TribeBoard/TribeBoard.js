import React from 'react';
import Tribe from '../Tribe/Tribe';
import VotedOutPanel from '../VotedOutPanel/VotedOutPanel';
import './TribeBoard.css'

class TribeBoard extends React.Component {
  state = {
    activeTribes: [],
    episodeData: {},
    formerTribeHighlight: {
      active: false,
      tribeName: null
    }
  }

  setActiveTribes = (seasonData, episodeId) => {
    const {tribes} = seasonData;
    const episodeData = seasonData.episodes.find((episode) => {
       return episode.id === episodeId;
    })
    const activeTribes = tribes.filter((tribe) => {
      return episodeData.castaways
        // Don't show current boots (to be removed in future)
        .filter(castaway => castaway.currentBoot === false)
        .some(castaway => castaway.tribe.replace(/\d| /g, '') === tribe.name);
    })

    this.setState({activeTribes})
  }

  setEpisodeData = (seasonData, episodeId) => {
    const episodeData = seasonData.episodes.find(episode => episode.id === episodeId);
    this.setState({episodeData});
  }

  setFormerTribeHighlight = (formerTribe) => {
    const updatedTribeHighlight = this.state.formerTribeHighlight;
    updatedTribeHighlight.active = true;
    updatedTribeHighlight.tribeName = formerTribe;
    this.setState({formerTribeHighlight: updatedTribeHighlight});
  }

  removeFormerTribeHighlight = () => {
    console.log('removing...')
    const updatedTribeHighlight = this.state.formerTribeHighlight;
    updatedTribeHighlight.active = false;
    updatedTribeHighlight.tribeName = null;
    this.setState({formerTribeHighlight: updatedTribeHighlight});
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
    const {activeTribes, episodeData, formerTribeHighlight} = this.state;
    const {tribeData} = this.props;
    const {setFormerTribeHighlight, removeFormerTribeHighlight} = this;
    return(
      <main>
        <div className="active-tribes">
          {activeTribes.length > 0 &&
            activeTribes.map(tribe => (
              <Tribe
                key={tribe.name}
                tribe={tribe}
                episodeData={episodeData}
                tribeData={tribeData}
                formerTribeHighlight={formerTribeHighlight}
                setFormerTribeHighlight={setFormerTribeHighlight}
                removeFormerTribeHighlight={removeFormerTribeHighlight}  
              />
            ))
          }
          {activeTribes.length === 0 && 'loading...'}
        </div>
        <VotedOutPanel episodeData={episodeData}/>
      </main>
    )
  }
}

export default TribeBoard;