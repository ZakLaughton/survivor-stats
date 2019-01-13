import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard'
import './Tribe.css'

const Tribe = ({ tribe, episodeData, tribeData }) => {
  //mycolor.space gradient. First color, then first color on "switch palette"
  const backgroundGradients = {
    'orange': 'linear-gradient(to bottom, #df940a, #be710e, #9b510e, #76340a, #511a00)',
    'purple': 'linear-gradient(to bottom, #740274, #963595, #b85bb7, #db80db, #ffa5ff)',
    'green': 'linear-gradient(to bottom, #007100, #328e24, #53ac41, #72ca5e, #91ea7b)',
    'blue': 'linear-gradient(to bottom, #0055f1, #5270f6, #7a8cfa, #9ca8fd, #bcc4ff)',
    'black': 'linear-gradient(to bottom, #363636, #575757, #7b7b7b, #a1a1a1, #c8c8c8)'
  }

  const sectionStyle = {
    background: backgroundGradients[tribe.tribe_color]
  }
  const {castaways} = episodeData;

  return (
    <section
      className="tribe pa2 fl min-h-100"
      style={sectionStyle}>
      <h1 className="mb1">{tribe.name}</h1>
      <div className="castawayList">
        {castaways && castaways.filter((castaway) => castaway.tribe.replace(/\d| /g, '') === tribe.name && castaway.currentBoot === false)
          .map(castaway => {
              return <CastawayCard
                        key={castaway.name}
                        castaway={castaway}
                        tribeData={tribeData}/>
            }
        )}
      </div>
    </section>
  )
}

export default Tribe;