import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
const { Image, Transformation } = require('cloudinary-react');

interface HeadshotProps {
  seasonNumber: number;
  castaway: string;
  size?: number;
  padding?: number;
  borderradius?: number;
  grayscale?: boolean;
}

const DEFAULT_HEADSHOT_SIZE = 120;
const DEFAULT_PADDING = 0;
const DEFAULT_BORDER_RADIUS = 0;

const Headshot: FunctionComponent<HeadshotProps> = ({
  seasonNumber,
  castaway,
  size = DEFAULT_HEADSHOT_SIZE,
  padding = DEFAULT_PADDING,
  borderradius = DEFAULT_BORDER_RADIUS,
  grayscale = false,
}) => {
  const imageFileName = `s${seasonNumber}_${castaway
    .replace(/,|\./g, ``)
    .replace(/\s/g, `_`)
    .toLowerCase()}`;

  return (
    <StyledHeadshot size={size} padding={padding} grayscale={grayscale} borderradius={borderradius}>
      <StyledImage publicId={`castaways/${imageFileName}`} borderradius={borderradius}>
        {/* Keep height and width constant to minimize network calls and Cloudinary usage */}
        <Transformation gravity='face' height='120' width='120' crop='thumb' />
      </StyledImage>
    </StyledHeadshot>
  );
};

interface StyledHeadshotProps {
  size: number;
  padding: number;
  borderradius: number;
  grayscale: boolean;
}

const StyledHeadshot = styled.div`
  max-width: ${(props: StyledHeadshotProps) => `${props.size}px`};
  width: ${(props: StyledHeadshotProps) => `${props.size}px`};
  height: ${(props: StyledHeadshotProps) => `${props.size}px`};
  padding: ${(props: StyledHeadshotProps) => `${props.padding}px`};
  border-radius: ${(props: StyledHeadshotProps) => `${props.borderradius}px`};
  filter: ${(props: StyledHeadshotProps) => (props.grayscale ? `grayscale(100%)` : `default`)};
`;

const StyledImage = styled(Image)`
  border-radius: ${props => `${props.borderradius}px`};
  object-fit: cover;
  object-position: 50% 0;
  width: 100%;
  height: 100%;
`;

export default Headshot;
