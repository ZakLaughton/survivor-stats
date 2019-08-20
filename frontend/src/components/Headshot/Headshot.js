/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import './Headshot.css';

const Headshot = ({ seasonNumber, castaway }) => {
  const headshotImage = require(`../../img/s${seasonNumber}_${castaway
    .replace(/\s/, '_')
    .toLowerCase()}_headthumb.png`);

  return (
    <div className="headshot-container">
      <img className="headshot" alt={castaway} src={headshotImage} title={castaway} />
    </div>
  );
};

export default Headshot;
