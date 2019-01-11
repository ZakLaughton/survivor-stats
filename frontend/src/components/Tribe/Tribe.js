import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard'
import './Tribe.css'

const Tribe = ({ tribe, episodeData }) => {
  // Subtler tones to the default tribe colors (brightness -20 on paletton)
  // Palleton: "brightness" "-5"x1, "-1"x5
  const tribeColorMap = {
    'orange': '#DF940A',
    'purple': '#740274',
    'green': '#007100',
    'blue': '#0909B9',
    'black': '#363636'
  }
  const sectionStyle = {
    backgroundColor: tribeColorMap[tribe.tribe_color]
  }
  const {castaways} = episodeData

  return (
    <section
      className="tribe pa2 fl min-h-100"
      style={sectionStyle}>
      <h1 className="mb1">{tribe.name}</h1>
      <div className="castawayList">
        {castaways && castaways.filter((castaway) => castaway.tribe.replace(/\d| /g, '') === tribe.name )
          .map(castaway => {
              return <CastawayCard
                        key={castaway.name}
                        castaway={castaway}
                        color={tribe.tribe_color}/>
            }
        )}
      </div>
    </section>
  )
}

export default Tribe;