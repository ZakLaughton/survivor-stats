import React from 'react';
import PlayerCard from '../PlayerCard/PlayerCard'
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
        return <PlayerCard player={playerData}/>
      })}
    </section>
  )
}

export default Tribe;