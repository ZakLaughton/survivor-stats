import React from 'react';
import './AdvantageIcons.css';

const AdvantageIcons = ({castaway}) => {
  const iconLibrary = {
    'immunity idol': 'fa-shield-alt',
    'idol nullifier': 'fa-ban',
    'vote steal': 'fa-user-minus'
  };

  return(
    <div className="tribe-advantage-container">
      {castaway.advantages && castaway.advantages.map(advantage => {
        return (
          <i className={`tooltip advantage fas ${iconLibrary[advantage.item]}`}>
            <span className="animate fadeIn tooltiptext">{advantage.item}</span>
          </i>
        )
      })}
    </div>
  )
}

export default AdvantageIcons;