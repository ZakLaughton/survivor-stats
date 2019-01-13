import React from 'react';
import './CastawayCard.css';

const CastawayCard = ({castaway, tribeData}) => {
  const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';
  return(
    <article className="castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2">
      <div className="tribe-circle-container">
        {tribeData && castaway.formerTribes.map(formerTribe => {
          const circleColor = tribeData.find(tribe => formerTribe === tribe.name).tribe_color;
          return (
            <div 
              className={`tribe-circle`}
              style={{backgroundColor: circleColor}}
            />
          )
        })}
      </div>
      <img
        src={require(`../../img/${imageFileName}`)}
        className="db br2 br--top"
        alt="Kitten looking menacing." />
      <div className="card-nameplate" >
          <h2 className="card-name br2 mv0 center tc">
            {castaway.name}
          </h2>
      </div>
    </article>
  )
}

export default CastawayCard;