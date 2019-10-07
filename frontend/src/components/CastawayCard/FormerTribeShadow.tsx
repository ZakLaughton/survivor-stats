import React, { useContext, FunctionComponent } from 'react';
import styled from 'styled-components';
import { FormerTribeHighlightContext } from '../TribeBoard/FormerTribeHighlightContext';

interface FormerTribeShadowProps {
  formerTribes: string[];
} 

export const FormerTribeShadow: FunctionComponent<FormerTribeShadowProps> = ({ formerTribes }) => {
  const { highlightedFormerTribe } = useContext(FormerTribeHighlightContext);
  let shadowColor = ``;
  if (formerTribes.some(tribe => tribe === highlightedFormerTribe.tribeName)) {
    shadowColor = highlightedFormerTribe.color;
  }

  if (shadowColor) {
    return <StyledFormerTribeShadow shadowColor={shadowColor} />;
  }

  return null;
};

interface StyledFormerTribeShadowProps {
  shadowColor: string;
}

const StyledFormerTribeShadow = styled.div`
  display: ${(props: StyledFormerTribeShadowProps) => (props.shadowColor ? `block` : `none`)};
  box-shadow: inset 0px 0px 20px 10px ${props => props.shadowColor};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  pointer-events: none;
`;
