import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard'
import './Tribe.css'

const Tribe = ({ tribe, castaways }) => {

  const sectionStyle = {
    backgroundColor: tribe.tribe_color
  }

  return (
    <section
      className="tribe pa2 fl w-50 min-h-100"
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