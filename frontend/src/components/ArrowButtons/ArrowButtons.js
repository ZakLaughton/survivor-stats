import React from 'react';
import './ArrowButtons.css';

const ArrowButtons = ({ downArrowAction, currentEpisodeHasTribalCouncils, episodeId }) => (
  <div>
    {(currentEpisodeHasTribalCouncils() || episodeId === 's38e00') && (
      <button type='button' className='arrow down' onClick={downArrowAction}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          width='60px'
          height='80px'
          viewBox='0 0 50 80'
          xmlSpace='preserve'
        >
          <polyline
            fill='none'
            stroke='#FFFFFF'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            points='0.375,0.375 45.63,38.087 0.375,75.8 '
          />
        </svg>
      </button>
    )}
  </div>
);

export default ArrowButtons;
