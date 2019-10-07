/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
import './PreseasonStats.css';

interface SuperscriptProps {
  text: string;
}

const Superscript: FunctionComponent<SuperscriptProps> = ({ text }) => <sup>{text}</sup>;

const renderWardogQuote = () => (
  <p className='quote'>
    &quot;The Wardog is his own blend – I’m not Tony
    <Superscript text='1' />
    , I’m not the Specialist
    <Superscript text='2' />
    , I’m not Boston Rob
    <Superscript text='3' />
    . Whose game did I respect the most? That’s a better question. I thought Yul
    <Superscript text='4' />
    played great, I thought Mike
    <sup>5</sup>
    was a great winner, I loved Parvati’s
    <sup>6</sup>
    game, Earl
    <sup>7</sup>
    dominated, 3rd version of Tyson
    <sup>8</sup>, 1st version of County Bumpkin (J.T)
    <sup>9</sup>
    .&quot;
  </p>
);

interface PreseasonStatsProps {
  preseasonStats: any;
}

const PreseasonStats: FunctionComponent<PreseasonStatsProps> = ({ preseasonStats }) => (
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
      {renderWardogQuote()}
    </div>
  </article>
);

interface StatProps {
  stat: string;
  preseasonStats: any;
}

const Stat: FunctionComponent<StatProps> = ({ stat, preseasonStats }) => {
  const getStatValue = (statName: string) => {
    const returnStat = preseasonStats.find((currentStat: any) => currentStat.stat === statName).value;
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
