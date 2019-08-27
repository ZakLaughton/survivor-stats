import React, { useContext } from 'react';
import { FormerTribeHighlightContext } from '../TribeBoard/FormerTribeHighlightContext';
import './FormerTribeIndicator.css';

const FormerTribeIndicator = ({ circleColor, formerTribe, semanticTribes }) => {
  const { updateTribeHighlight } = useContext(FormerTribeHighlightContext);

  const handleHoverOn = () => {
    updateTribeHighlight({ tribeName: formerTribe, color: circleColor });
  };

  const handleHoverOff = () => {
    updateTribeHighlight({ tribeName: '', color: '' });
  };

  const getSemanticTribeName = (tribeName) => {
    if (Object.keys(semanticTribes).indexOf(tribeName) > -1) {
      return semanticTribes[tribeName];
    }
    return tribeName;
  };

  const semanticTribeName = getSemanticTribeName(formerTribe);

  return (
    <div
      className="tribe-circle"
      style={{ backgroundColor: circleColor }}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
    >
      <span className="tooltiptext">{`Former ${semanticTribeName}`}</span>
    </div>
  );
};

export default FormerTribeIndicator;
