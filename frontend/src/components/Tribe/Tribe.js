import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard'
import './Tribe.css'

const Tribe = ({ tribe, castaways }) => {
  // Subtler tones to the default tribe colors (brightness -3000 on paletton)
  const tribeColorMap = {
    'orange': '#A26F0F',
    'purple': '#4F004F',
    'green': '#003300'
  }
  const sectionStyle = {
    backgroundColor: tribeColorMap[tribe.tribe_color]
  }

  return (
    <section
      className="tribe pa2 fl min-h-100"
      style={sectionStyle}>
      <h1 className="f1 lh-title mb1">{tribe.name}</h1>
      <div className="castawayList">
        {castaways.filter((castaway) => castaway.tribe === tribe.name )
          .map(castaway => {
            if(castaways) {
              return <CastawayCard key={castaway.name} castaway={castaway}/>
            } else {
              return `Loading image for ${castaway.name}`
            }
        })}
      </div>
    </section>
  )
}

export default Tribe;