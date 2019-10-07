/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
// @ts-ignore - Cloudinary TS support issues
import { Image, Transformation } from 'cloudinary-react';
import { Castaway } from '../../types';

interface HeadshotProps {
  seasonNumber: number;
  castaway: string;
  size?: number;
  padding?: number;
  borderRadius?: number;
  grayscale?: boolean;
}

const Headshot: FunctionComponent<HeadshotProps> = ({
  seasonNumber,
  castaway,
  size = 120,
  padding = 0,
  borderRadius = 0,
  grayscale = false,
}) => {
  const imageFileName = `s${seasonNumber}_${castaway
    .replace(/,|\./g, ``)
    .replace(/\s/g, `_`)
    .toLowerCase()}`;

  return (
    <StyledHeadshot size={size} padding={padding} grayscale={grayscale} borderRadius={borderRadius}>
      <StyledImage publicId={`castaways/${imageFileName}`} borderRadius={borderRadius}>
        {/* Keep height and width constant to minimize network calls and Cloudinary usage */}
        <Transformation gravity='face' height='120' width='120' crop='thumb' />
      </StyledImage>
    </StyledHeadshot>
  );
};

interface StyledHeadshotProps {
  size: number;
  padding: number;
  borderRadius: number;
  grayscale: boolean;
}

const StyledHeadshot = styled.div`
  max-width: ${(props: StyledHeadshotProps) => `${props.size}px`};
  width: ${(props: StyledHeadshotProps) => `${props.size}px`};
  height: ${(props: StyledHeadshotProps) => `${props.size}px`};
  padding: ${(props: StyledHeadshotProps) => `${props.padding}px`};
  border-radius: ${(props: StyledHeadshotProps) => `${props.borderRadius}px`};
  filter: ${(props: StyledHeadshotProps) => (props.grayscale ? `grayscale(100%)` : `default`)};
`;

const StyledImage = styled(Image)`
  border-radius: ${props => `${props.borderRadius}px`};
  object-fit: cover;
  object-position: 50% 0;
  width: 100%;
  height: 100%;
`;

export default Headshot;
