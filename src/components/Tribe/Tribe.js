import React from 'react';
import './Tribe.css'

const Tribe = ({ color, name }) => {

  const sectionStyle = {
    backgroundColor: color
  }

  return (
    <section
      className="tribe fl w-50 vh-100"
      style={sectionStyle}>
      <h1>{name}</h1>
    </section>
  )
}

export default Tribe;