import React from 'react';
import './CastawayCard.css';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';
import FormerTribeIndicator from '../FormerTribeIndicator/FormerTribeIndicator';

const CastawayCard = ({castaway, tribeData, grayScale, formerTribeHighlight, setFormerTribeHighlight, removeFormerTribeHighlight}) => {
  const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';
  const formerTribeClassNames = castaway.formerTribes
    .map((formerTribe) => 'former-' + formerTribe.replace(/\s/g, '-').toLowerCase())
    .join(' ');

  if (formerTribeHighlight && castaway.formerTribes.find(tribe => tribe === formerTribeHighlight.tribeName)) {
    console.log('former tribe: ', formerTribeHighlight.tribeName);
  }

  return(
    <article className={`castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2 ${formerTribeClassNames}`}>
      <div className="tribe-circle-container">
        {tribeData && castaway.formerTribes.map(formerTribe => {
          const circleColor = tribeData.find(tribe => formerTribe.replace(/\d| /g, '') === tribe.name).tribe_color;
          return (
            <FormerTribeIndicator 
              circleColor={circleColor}
              formerTribe={formerTribe}
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