import React from 'react';
import './FormerTribeIndicator.css'

const FormerTribeIndicator = ({circleColor, formerTribe, formerTribeHighlight, setFormerTribeHighlight, removeFormerTribeHighlight}) => {
  const handleHover = () => {
    if (!formerTribeHighlight.active) {
      setFormerTribeHighlight(formerTribe);
    }
  }

  return(
    <div 
      className={`tribe-circle`}
      style={{backgroundColor: circleColor}}
      onMouseEnter={handleHover}
      onMouseLeave={removeFormerTribeHighlight}
    />
  )
}

export default FormerTribeIndicator;