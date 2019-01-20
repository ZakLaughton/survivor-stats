import React from 'react';

const FormerTribeIndicator = ({circleColor, formerTribe, setFormerTribeHighlight, removeFormerTribeHighlight}) => {
  const handleHover = () => {
    setFormerTribeHighlight(formerTribe);
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