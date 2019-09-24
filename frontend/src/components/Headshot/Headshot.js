/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
import { Image, Transformation } from 'cloudinary-react';

const Headshot = ({
  seasonNumber,
  castaway,
  size = 120,
  padding = 0,
  borderRadius = 5,
  grayScale = false,
}) => {
  const imageFileName = `s${seasonNumber}_${castaway
    .replace(/,|\./g, ``)
    .replace(/\s/g, `_`)
    .toLowerCase()}`;

  return (
    <StyledHeadshot size={size} padding={padding} grayScale={grayScale}>
      <StyledImage publicId={`castaways/${imageFileName}`} borderRadius={borderRadius}>
        {/* Keep height and width constant to minimize network calls and Cloudinary usage */}
        <Transformation gravity='face' height='120' width='120' crop='thumb' />
      </StyledImage>
    </StyledHeadshot>
  );
};

const StyledHeadshot = styled.div`
  max-width: ${props => `${props.size}px`};
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  padding: ${props => `${props.padding}px`};
  border-radius: ${props => `${props.borderRadius}px`};
  filter: ${props => (props.grayScale ? `grayscale(100%)` : `default`)};
`;

const StyledImage = styled(Image)`
  border-radius: ${props => `${props.borderRadius}px`};
  object-fit: cover;
  object-position: 50% 0;
  width: 100%;
  height: 100%;
`;

export default Headshot;
