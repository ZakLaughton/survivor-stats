import React from 'react';
import './CastawayCard.css';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';

const CastawayCard = ({castaway, tribeData, grayScale}) => {
const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';
const formerTribeClassNames = castaway.formerTribes
  .map((formerTribe) => 'former-' + formerTribe.replace(/\s/g, '-').toLowerCase())
  .join(' ');

  return(
    <article className={`castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2 ${formerTribeClassNames}`}>
      <div className="tribe-circle-container">
        {tribeData && castaway.formerTribes.map(formerTribe => {
          const circleColor = tribeData.find(tribe => formerTribe.replace(/\d| /g, '') === tribe.name).tribe_color;
          return (
            <div 
              className={`tribe-circle`}
              style={{backgroundColor: circleColor}}
            />
          )
        })}
      </div>
      <AdvantageIcons castaway={castaway}/>
      <img
        src={require(`../../img/${imageFileName}`)}
        className={`db br2 br--top ${grayScale}`}
        alt={castaway.name} />
      <div className="card-nameplate" >
          <h2 className="card-name br2 mv0 center tc">
            {castaway.name}
          </h2>
      </div>
    </article>
  )
}

export default CastawayCard;