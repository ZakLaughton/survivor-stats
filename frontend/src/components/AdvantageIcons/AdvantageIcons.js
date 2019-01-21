import React from 'react';
import './AdvantageIcons.css';

const AdvantageIcons = ({castaway}) => {
  const iconLibrary = {
    'immunity idol': 'fas fa-shield-alt',
    'idol nullifier': 'fas fa-ban',
    'vote steal': 'fas fa-user-minus',
    'legacy advantage': 'fas fa-scroll',
    'extra vote': 'fas fa-plus-circle',
    'fake idol': 'fab fa-pagelines'
  };

  return(
    <div className="tribe-advantage-container">
      {castaway.advantages && castaway.advantages.map((advantage, index) => {
        return (
          <i key={index} className={`tooltip advantage ${iconLibrary[advantage.item]}`}>
            <span className="animated fadeIn tooltiptext">{advantage.item}</span>
          </i>
        )
      })}
    </div>
  )
}

export default AdvantageIcons;