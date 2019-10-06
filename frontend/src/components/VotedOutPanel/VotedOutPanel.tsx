import React from 'react';
import styled from 'styled-components';
import Headshot from '../Headshot/Headshot';
import { Episode } from '../../types';

interface VotedOutPanelProps {
  episodeData: Episode;
  seasonNum: number;
}
const VotedOutPanel = ({ episodeData, seasonNum }: VotedOutPanelProps) => {
  const { castaways } = episodeData;
  const juryStarted = !!(castaways && castaways.some(castaway => castaway.juryMember));

  if (
    episodeData.castaways &&
    episodeData.castaways.some(castaway => castaway.tribe === `out` || castaway.currentBoot)
  ) {
    return (
      <StyledVotedOutPanel
        className='voted-out-panel animated slideInUp'
        data-testid='votedOutPanel'
      >
        <VotedOutList className='castawayList votedout'>
          <JuryTitle>OUT</JuryTitle>
          {castaways &&
            castaways
              .filter(
                castaway =>
                  (castaway.tribe === `out` || castaway.currentBoot) && !castaway.juryMember,
              )
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => (
                <Headshot
                  seasonNumber={seasonNum}
                  castaway={castaway.name}
                  key={castaway.name}
                  size={64}
                  padding={5}
                  grayScale
                />
              ))}
          {juryStarted && <JuryTitle>JURY</JuryTitle>}
          {juryStarted &&
            castaways
              .filter(castaway => castaway.juryMember)
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => (
                <Headshot
                  seasonNumber={seasonNum}
                  castaway={castaway.name}
                  key={castaway.name}
                  size={64}
                  padding={5}
                />
              ))}
        </VotedOutList>
      </StyledVotedOutPanel>
    );
  }
  return null;
};

const StyledVotedOutPanel = styled.section`
  border: #444343 1px solid;
  padding: 5px;
  width: auto;
  background: #666;
  margin: auto;
  border-radius: 6px;
  margin-bottom: 5px;
  position: sticky;
  bottom: 6px;
  max-width: 95%;
  z-index: 1;
  height: auto;
  display: inline-block;
`;

const Title = styled.h2`
  margin: 0;
`;

const VotedOutList = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  flex-flow: row;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 5px;
`;

const JuryTitle = styled.span`
  writing-mode: tb-rl;
  transform: rotate(-180deg);
  font-family: 'Londrina Solid', sans-serif;
  font-weight: 350;
  color: white;
`;

export default VotedOutPanel;
