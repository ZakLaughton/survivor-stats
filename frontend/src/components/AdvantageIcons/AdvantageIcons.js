import React from 'react';
import './AdvantageIcons.css';

const AdvantageIcons = ({ castaway }) => {
  const iconLibrary = {
    'immunity idol': 'fas fa-shield-alt',
    'idol nullifier': 'fas fa-ban',
    'vote steal': 'fas fa-user-minus',
    'legacy advantage': 'fas fa-scroll',
    'extra vote': 'fas fa-plus-circle',
    'fake idol': 'fab fa-pagelines',
  };

  /**
   * Takes an advantage name and returns the HTML element to render the icon.
   * NOTE: All icons use fontawesome EXCEPT the fake idol, which uses a .png
   * @param {string} advantageName
   * @return {element}
   */
  const getAdvantageIconElement = (advantageName) => {
    if (advantageName === 'fake idol') {
      return (
        <div className="tooltip advantage">
          <img alt="Fake Immunity Idol" src={require('../../img/fake_immunity_idol.png')} />
          <span className="animated fadeIn tooltiptext">{advantageName}</span>
        </div>
      );
    }
    return (
      <i className={`tooltip advantage ${iconLibrary[advantageName]}`}>
        <span className="animated fadeIn tooltiptext">{advantageName}</span>
      </i>
    );
  };

  return (
    <div className="tribe-advantage-container">
      {castaway.advantages
        && castaway.advantages.map((advantage, index) => (
          <div key={index}>{getAdvantageIconElement(advantage.item)}</div>
        ))}
    </div>
  );
};

export default AdvantageIcons;
