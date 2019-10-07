import React, { FunctionComponent } from 'react';
import './AdvantageIcons.css';
import styled from 'styled-components';
import { Advantage } from '../../types';

export interface AdvantageIconsProps {
  advantages: Advantage[];
}

interface AdvantagePng {
  alt: string;
  fileName: string;
}

interface PngLibrary {[key: string]: AdvantagePng}
interface IconLibrary {[key: string]: string}

const AdvantageIcons: FunctionComponent<AdvantageIconsProps> = ({ advantages }) => {
  const iconLibrary: IconLibrary = {
    'immunity idol': `fas fa-shield-alt`,
    'idol nullifier': `fas fa-ban`,
    'vote steal': `fas fa-user-minus`,
    'legacy advantage': `fas fa-scroll`,
    'extra vote': `fas fa-plus-circle`,
    'fake idol': `fab fa-pagelines`,
    'multi-choice advantage': `fas fa-arrows-alt`,
  };

  const pngLibrary: PngLibrary = {
    'immunity idol': {
      alt: `Immunity Idol`,
      fileName: `immunity_idol.png`,
    },
    'fake immunity idol': {
      alt: `Fake Immunity Idol`,
      fileName: `fake_immunity_idol.png`,
    },
    'half immunity idol 1': {
      alt: `Half Immunity Idol`,
      fileName: `half_immunity_idol_1.png`,
    },
    'half immunity idol 2': {
      alt: `Half Immunity Idol`,
      fileName: `half_immunity_idol_2.png`,
    },
  };

  /**
   * Takes an advantage name and returns the HTML element to render the icon.
   * NOTE: All icons use fontawesome EXCEPT the fake idol, which uses a .png
   * @param {string} advantageName
   * @return {element}
   */
  const getAdvantageIconElement = (advantageName: string) => {
    if (pngLibrary[advantageName]) {
      const advantage = pngLibrary[advantageName];
      return (
        <div className='tooltip advantage'>
          <img alt={advantage.alt} src={require(`../../img/${advantage.fileName}`)} />
          <span className='animated fadeIn tooltip-text'>{advantage.alt}</span>
        </div>
      );
    }
    return (
      <StyledFontAwesome className={`tooltip advantage ${iconLibrary[advantageName]}`}>
        <span className='animated fadeIn tooltip-text'>{advantageName}</span>
      </StyledFontAwesome>
    );
  };

  return (
    <div className='tribe-advantage-container'>
      {advantages &&
        advantages.map((advantage, index) => (
          <div key={index}>{getAdvantageIconElement(advantage.item)}</div>
        ))}
    </div>
  );
};

const StyledFontAwesome = styled.i`
  text-shadow: -1px 0 black, 0 2px black, 2px 0 black, 0 -1px black;
`;

export default AdvantageIcons;
