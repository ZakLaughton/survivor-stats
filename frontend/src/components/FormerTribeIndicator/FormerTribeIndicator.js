import React, { useContext } from "react";
import styled from "styled-components";
import { FormerTribeHighlightContext } from "../TribeBoard/FormerTribeHighlightContext";
import "./FormerTribeIndicator.css";

const FormerTribeIndicator = ({ circleColor, formerTribe, semanticTribes }) => {
  const { updateTribeHighlight } = useContext(FormerTribeHighlightContext);

  const handleHoverOn = () => {
    updateTribeHighlight({ tribeName: formerTribe, color: circleColor });
  };

  const handleHoverOff = () => {
    updateTribeHighlight({ tribeName: ``, color: `` });
  };

  const getSemanticTribeName = (tribeName) => {
    if (Object.keys(semanticTribes).indexOf(tribeName) > -1) {
      return semanticTribes[tribeName];
    }
    return tribeName;
  };

  const semanticTribeName = getSemanticTribeName(formerTribe);

  return (
    <TribeCircle
      className="tribe-circle"
      style={{ backgroundColor: circleColor }}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
    >
      <span className="tooltiptext">{`Former ${semanticTribeName}`}</span>
    </TribeCircle>
  );
};

const TribeCircle = styled.div`
  border: solid #333 1.2px;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin: 2px;
  display: inline-block;
  position: relative;
`;

export default FormerTribeIndicator;
