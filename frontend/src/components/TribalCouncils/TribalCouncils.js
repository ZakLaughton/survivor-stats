import React from 'react';

const TribalCouncils = ({ tribalCouncils }) => (
  <section className="tribal-councils-container">
    <h1>Tribal</h1>
    {tribalCouncils.map(tribalCouncil => (
      <div className="tribal-council">
        <h2>{`Day ${tribalCouncil.day}`}</h2>
      </div>
    ))}
  </section>
);

export default TribalCouncils;
