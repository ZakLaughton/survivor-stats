/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from "react";
import styled from "styled-components";

const Headshot = ({ seasonNumber, castaway }) => {
  const headshotImage = require(`../../img/s${seasonNumber}_${castaway
    .replace(/\s/, `_`)
    .toLowerCase()}_headthumb.png`);

  return (
    <HeadshotContainer>
      <HeadshotImage alt={castaway} src={headshotImage} title={castaway} />
    </HeadshotContainer>
  );
};

const HeadshotContainer = styled.div`
  width: 70px;
  height: 70px;
`;

const HeadshotImage = styled.img`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
`;

export default Headshot;
