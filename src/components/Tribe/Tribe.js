import React from 'react';

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