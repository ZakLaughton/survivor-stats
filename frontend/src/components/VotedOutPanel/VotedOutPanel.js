import React from "react";
import styled from "styled-components";
import Headshot from "../Headshot/Headshot";

const VotedOutPanel = ({ episodeData, seasonNum }) => {
  const { castaways } = episodeData;
  const juryStarted = !!(castaways && castaways.some(castaway => castaway.juryMember));

  if (
    episodeData.castaways
    && episodeData.castaways.some(castaway => castaway.tribe === `out` || castaway.currentBoot)
  ) {
    return (
      <StyledVotedOutPanel className="voted-out-panel animated slideInUp">
        <VotedOutList className="castawayList votedout">
          {castaways
            && castaways
              .filter(
                castaway => (castaway.tribe === `out` || castaway.currentBoot) && !castaway.juryMember,
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
          {juryStarted
            && castaways
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
  background-color: #333;
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 1;
  height: 80px;
`;

const VotedOutList = styled.div`
  display: flex;
  height: 100%;
  justify-content: flex-start;
  flex-flow: row;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 5px;
`;

const JuryTitle = styled.span`
  writing-mode: tb-rl;
  transform: rotate(-180deg);
  font-family: "Londrina Solid", sans-serif;
  font-weight: 350;
  color: white;
`;

export default VotedOutPanel;
