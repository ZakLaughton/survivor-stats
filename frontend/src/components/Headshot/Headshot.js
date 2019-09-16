/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";

const Headshot = ({ seasonNumber, castaway }) => {
  const imageFileName = `s${seasonNumber}_${castaway
    .replace(/,|\./g, ``)
    .replace(/\s/g, `_`)
    .toLowerCase()}`;

  return (
    <HeadshotContainer>
      <Image publicId={`castaways/${imageFileName}`}>
        <Transformation gravity="face" height="70" width="70" crop="thumb" />
      </Image>
    </HeadshotContainer>
  );
};

const HeadshotContainer = styled.div`
  width: 70px;
  height: 70px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
`;

export default Headshot;
