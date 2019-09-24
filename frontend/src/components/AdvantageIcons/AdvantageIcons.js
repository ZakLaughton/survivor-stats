/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import './AdvantageIcons.css';
import styled from 'styled-components';

const AdvantageIcons = ({ castaway }) => {
  const iconLibrary = {
    'immunity idol': `fas fa-shield-alt`,
    'idol nullifier': `fas fa-ban`,
    'vote steal': `fas fa-user-minus`,
    'legacy advantage': `fas fa-scroll`,
    'extra vote': `fas fa-plus-circle`,
    'fake idol': `fab fa-pagelines`,
    'multi-choice advantage': `fas fa-arrows-alt`,
  };

  const pngLibrary = {
    'immunity idol': {
      alt: `Immunity Idol`,
      filename: `immunity_idol.png`,
    },
    'fake immunity idol': {
      alt: `Fake Immunity Idol`,
      filename: `fake_immunity_idol.png`,
    },
    'half immunity idol 1': {
      alt: `Half Immunity Idol`,
      filename: `half_immunity_idol_1.png`,
    },
    'half immunity idol 2': {
      alt: `Half Immunity Idol`,
      filename: `half_immunity_idol_2.png`,
    },
  };

  /**
   * Takes an advantage name and returns the HTML element to render the icon.
   * NOTE: All icons use fontawesome EXCEPT the fake idol, which uses a .png
   * @param {string} advantageName
   * @return {element}
   */
  const getAdvantageIconElement = advantageName => {
    if (pngLibrary[advantageName]) {
      const advantage = pngLibrary[advantageName];
      return (
        <div className='tooltip advantage'>
          <img alt={advantage.alt} src={require(`../../img/${advantage.filename}`)} />
          <span className='animated fadeIn tooltiptext'>{advantage.alt}</span>
        </div>
      );
    }
    return (
      <StyledFontAwesome className={`tooltip advantage ${iconLibrary[advantageName]}`}>
        <span className='animated fadeIn tooltiptext'>{advantageName}</span>
      </StyledFontAwesome>
    );
  };

  return (
    <div className='tribe-advantage-container'>
      {castaway.advantages &&
        castaway.advantages.map((advantage, index) => (
          <div key={index}>{getAdvantageIconElement(advantage.item)}</div>
        ))}
    </div>
  );
};

const StyledFontAwesome = styled.i`
  text-shadow: -1px 0 black, 0 2px black, 2px 0 black, 0 -1px black;
`;

export default AdvantageIcons;
