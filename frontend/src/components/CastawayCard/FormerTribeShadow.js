import React, { useContext } from 'react';
import styled from 'styled-components';
import { FormerTribeHighlightContext } from '../TribeBoard/FormerTribeHighlightContext';

export const FormerTribeShadow = ({ formerTribes }) => {
  const { highlightedFormerTribe } = useContext(FormerTribeHighlightContext);
  let shadowColor = '';
  if (formerTribes.some(tribe => tribe === highlightedFormerTribe.tribeName)) {
    shadowColor = highlightedFormerTribe.color;
  }
  const Wrapper = styled.div`
    display: ${shadowColor ? 'block' : 'none'}
    box-shadow: inset 0px 0px 20px 10px ${shadowColor}
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  `;
  return <Wrapper />;
};
