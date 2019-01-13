import React from 'react';
import './AdvantageIcons.css';

const AdvantageIcons = ({castaway, tribeData}) => {
  const iconLibrary = {
    'immunity idol': 'fa-shield-alt',
    'idol nullifier': 'fa-ban',
    'vote steal': 'fa-user-minus'
  };

  return(
    <div className="tribe-advantage-container">
      {castaway.advantages && castaway.advantages.map(advantage => {
        return (<i className={`advantage fas ${iconLibrary[advantage.item]}`} title={`${advantage.item}`}></i>)
      })}
    </div>
  )
}

export default AdvantageIcons;