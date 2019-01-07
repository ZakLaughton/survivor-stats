import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard';
import ('./VotedOutPanel.css');

const VotedOutPanel = ({ episodeData }) => {
  // Subtler tones to the default tribe colors (brightness -20 on paletton)
  // Palleton: "brightness" "-5"x1, "-1"x5
  const tribeColorMap = {
    'orange': '#DF940A',
    'purple': '#740274',
    'green': '#007100',
    'blue': '#0909B9'
  }

  const {castaways} = episodeData

  return (
    <section className="voted-out-panel">
      <div className="castawayList votedout">
        {castaways && castaways.filter((castaway) => castaway.tribe === 'out')
          .map(castaway => {
            if(castaways) {
              return <CastawayCard
                        key={castaway.name}
                        castaway={castaway}
                      />
            } else {
              return `Loading image for ${castaway.name}`
            }
        })}
      </div>
    </section>
  )
}

export default VotedOutPanel;