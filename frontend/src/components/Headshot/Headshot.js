/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";

const Headshot = ({ seasonNumber, castaway, imageSize }) => {
  const imageFileName = `s${seasonNumber}_${castaway
    .replace(/,|\./g, ``)
    .replace(/\s/g, `_`)
    .toLowerCase()}`;

  return (
    <StyledHeadshot>
      <Image publicId={`castaways/${imageFileName}`}>
        <Transformation gravity="face" height={imageSize} width={imageSize} crop="thumb" />
      </Image>
    </StyledHeadshot>
  );
};

const StyledHeadshot = styled.div`
  max-width: 90px;
  width: 90px;
  height: 90px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
`;

export default Headshot;
