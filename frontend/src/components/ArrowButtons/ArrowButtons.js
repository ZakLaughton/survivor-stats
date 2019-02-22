import React from 'react';
import './ArrowButtons.css';

const ArrowButtons = ({
  decrementEpisode, incrementEpisode, downArrowAction, showArrows,
}) => (
  <div>
    {showArrows.left && (
      <button type="button" className="arrow left" onClick={decrementEpisode}>
        <svg width="60px" height="80px" viewBox="0 0 50 80" xmlSpace="preserve">
          <polyline
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="45.63,75.8 0.375,38.087 45.63,0.375 "
          />
        </svg>
      </button>
    )}

    {showArrows.right && (
      <button type="button" className="arrow right" onClick={incrementEpisode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="60px"
          height="80px"
          viewBox="0 0 50 80"
          xmlSpace="preserve"
        >
          <polyline
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0.375,0.375 45.63,38.087 0.375,75.8 "
          />
        </svg>
      </button>
    )}
    {showArrows.down && (
      <button type="button" className="arrow down" onClick={downArrowAction}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="60px"
          height="80px"
          viewBox="0 0 50 80"
          xmlSpace="preserve"
        >
          <polyline
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0.375,0.375 45.63,38.087 0.375,75.8 "
          />
        </svg>
      </button>
    )}
  </div>
);

export default ArrowButtons;
