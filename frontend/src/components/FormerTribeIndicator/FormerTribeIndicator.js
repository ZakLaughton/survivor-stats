import React from 'react';
import './FormerTribeIndicator.css'

const FormerTribeIndicator = ({circleColor, formerTribe, formerTribeHighlight,
                               setFormerTribeHighlight, removeFormerTribeHighlight,
                               semanticTribes}) => {
  const handleHover = () => {
    if (!formerTribeHighlight.active) {
      setFormerTribeHighlight(formerTribe);
    }
  }

  const getSemanticTribeName = (tribeName) => {
    if (Object.keys(semanticTribes).indexOf(tribeName) > -1) {
      return semanticTribes[tribeName];
    } else {
      return tribeName;
    }
  }

  const semanticTribeName = getSemanticTribeName(formerTribe);

  return(
    <div 
      className={`tribe-circle tooltip`}
      style={{backgroundColor: circleColor}}
      onMouseEnter={handleHover}
      onMouseLeave={removeFormerTribeHighlight}
    >
      <span className="animated fadeIn tooltiptext">{semanticTribeName}</span>
    </div>
  )
}

export default FormerTribeIndicator;