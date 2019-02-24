import React from 'react';
import './Headshot.css';

const Headshot = ({ seasonNumber, castaway }) => {
  const headshotImage = require(`../../img/s${seasonNumber}_${castaway
    .replace(/\s/, '_')
    .toLowerCase()}_headthumb.png`);

  return <img className="headshot" alt={castaway} src={headshotImage} />;
};

export default Headshot;
