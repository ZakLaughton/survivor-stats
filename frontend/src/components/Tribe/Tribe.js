import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard'
import './Tribe.css'

const Tribe = ({ color, name, tribeMembers, castaways }) => {

  const sectionStyle = {
    backgroundColor: color
  }

  return (
    <section
      className="tribe pa2 fl w-50 min-h-100"
      style={sectionStyle}>
      <h1 className="f1 lh-title mb1">{name}</h1>
      <div className="castawayList">
        {tribeMembers.map(member => {
          if(castaways) {
            const castawayData = castaways.find(castaway => (castaway.fullName === member));
            return <CastawayCard castaway={castawayData}/>
          } else {
            return `Loading image for ${member}`
          }
        })}
      </div>
    </section>
  )
}

export default Tribe;