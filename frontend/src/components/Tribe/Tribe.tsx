import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import CastawayCard from '../CastawayCard/CastawayCard';
import Headshot from '../Headshot/Headshot';
import { Tribe as TribeType, Episode } from '../../types';

interface TribeProps {
  tribe: TribeType;
  episodeData: Episode;
  tribeData: TribeType[];
  formerTribeHighlight: string;
  setFormerTribeHighlight: any;
  removeFormerTribeHighlight: any;
  seasonNumber: number;
}
const Tribe: FunctionComponent<TribeProps> = ({
  tribe,
  episodeData,
  tribeData,
  formerTribeHighlight = ``,
  setFormerTribeHighlight = {},
  removeFormerTribeHighlight = {},
  seasonNumber,
}) => {
  const { castaways } = episodeData;

  const getTribeTitle = (tribeName: string) => {
    if (tribeName === `Extinction Island`) {
      return <i className='fas fa-skull-crossbones' />;
    }
    return tribeName;
  };

  const tribeClass =
    tribe.name === `Extinction Island` ? `extinction-island` : tribe.name.toLowerCase();

  return (
    <StyledTribe tribe={tribe.name} className={`tribe pa2 fl ${tribeClass}`} data-testid='tribe'>
      <TribeName>{getTribeTitle(tribe.name)}</TribeName>
      <CastawayList tribeName={tribe.name}>
        {castaways &&
          tribe.name !== `Extinction Island` &&
          castaways
            .filter(
              castaway =>
                castaway.tribe.replace(/ \d/g, ``) === tribe.name && castaway.currentBoot === false,
            )
            .map(castaway => (
              <CastawayCard
                tribeColor={tribe.tribe_color}
                key={castaway.name}
                castaway={castaway}
                tribeData={tribeData}
                episodeId={episodeData.id}
              />
            ))}
        {castaways &&
          tribe.name === `Extinction Island` &&
          castaways
            .filter(
              castaway =>
                castaway.tribe.replace(/ \d/g, ``) === tribe.name && castaway.currentBoot === false,
            )
            .map(castaway => (
              <Headshot
                key={castaway.name}
                castaway={castaway.name}
                seasonNumber={seasonNumber}
                size={90}
                padding={5}
              />
            ))}
      </CastawayList>
    </StyledTribe>
  );
};

interface StyledTribeProps {
  tribe: string;
}

const StyledTribe = styled.section`
  flex: ${(props: StyledTribeProps) => (props.tribe === `Extinction Island` ? `0.1` : `1 1`)};
`;

const TribeName = styled.h2`
  margin: 0px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.8rem;
`;

interface CastawayListProps {
  tribeName: string;
}

const CastawayList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 800px;
  /* Give padding to Extinction Island, center single tribes */
  margin: ${(props: CastawayListProps) => (props.tribeName === `Extinction Island` ? `5px` : `auto`)};
`;

export default Tribe;
