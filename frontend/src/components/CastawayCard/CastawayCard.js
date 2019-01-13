import React from 'react';
import './CastawayCard.css';

const CastawayCard = ({castaway, color}) => {
  const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';
  return(
    <article className="castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2">
      <div className="tribe-circle-container">
        {castaway.formerTribes.map(tribe => <div className='tribe-circle'></div>)}
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