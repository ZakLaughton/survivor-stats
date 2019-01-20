import React from 'react';

const FormerTribeIndicator = ({circleColor, formerTribe}) => {
  return(
    <div 
      className={`tribe-circle`}
      style={{backgroundColor: circleColor}}
      // onMouseEnter={setFormerTribeHighlight.bind(this, formerTribe)}
      // onMouseLeave={removeFormerTribeHighlight}
    />
  )
}

export default FormerTribeIndicator;