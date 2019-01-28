import React from 'react';
import './ArrowButton.css';

const ArrowButton = ({direction}) => {
  return(
    {direction === 'left' && <a href="#" class="previous round">&#8249;</a>}
    {direction === 'right' && <a href="#" class="next round">&#8250;</a>}
  )
};

export default ArrowButton;
