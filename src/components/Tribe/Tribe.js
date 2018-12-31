import React from 'react';
import './Tribe.css'

const Tribe = ({ color, name, tribeMembers, players }) => {

  const sectionStyle = {
    backgroundColor: color
  }

  return (
    <section
      className="tribe fl w-50 vh-100"
      style={sectionStyle}>
      <h1>{name}</h1>
      {tribeMembers.map(member => {
        const playerData = players.find(player => (player.fullName === member));
        return playerData.fullName + ' ';
      })}
    </section>
  )
}

export default Tribe;