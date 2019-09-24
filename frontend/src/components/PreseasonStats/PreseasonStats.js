import React from 'react';
import './PreseasonStats.css';

const PreseasonStats = ({ preseasonStats }) => (
  <article className='preseason-stats'>
    <h1>Preseason Stats</h1>
    <div className='stats-list'>
      <p>
        <Stat stat='Total castaways' preseasonStats={preseasonStats} />
        <br />
        <Stat stat='Men' preseasonStats={preseasonStats} />
        <Stat stat='Women' preseasonStats={preseasonStats} />
        <br />
        <Stat stat='Returning castaways' preseasonStats={preseasonStats} />
      </p>
      <p>
        <Stat stat='Average age' preseasonStats={preseasonStats} />
        <br />
        <Stat stat='Youngest' preseasonStats={preseasonStats} />
        <br />
        <Stat stat='Oldest' preseasonStats={preseasonStats} />
      </p>
      <p>
        <Stat
          stat='Most names mentioned in a self-comparison to former castaways'
          preseasonStats={preseasonStats}
        />
      </p>
      <p className='quote'>
        {'"The Wardog is his own blend – I’m not Tony'}
        <sup>1</sup>
        {', I’m not the Specialist'}
        <sup>2</sup>
        {', I’m not Boston Rob'}
        <sup>3</sup>
        {'. Whose game did I respect the most? That’s a better question. I thought Yul'}
        <sup>4</sup>
        {' played great, I thought Mike'}
        <sup>5</sup>
        {' was a great winner, I loved Parvati’s'}
        <sup>6</sup>
        {' game, Earl'}
        <sup>7</sup>
        {' dominated, 3rd version of Tyson'}
        <sup>8</sup>
        {', 1st version of County Bumpkin (J.T)'}
        <sup>9</sup>
        {'."'}
      </p>
    </div>
  </article>
);

const Stat = ({ stat, preseasonStats }) => {
  const getStatValue = statName => {
    const returnStat = preseasonStats.find(currentStat => currentStat.stat === statName).value;
    return returnStat;
  };

  return (
    <span className='stat-value-pair'>
      <span className='stat-name'>{`${stat}: `}</span>
      <span className='stat-value'>{getStatValue(stat)}</span>
    </span>
  );
};

export default PreseasonStats;
