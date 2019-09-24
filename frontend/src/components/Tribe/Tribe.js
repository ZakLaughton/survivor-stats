import React from "react";
import styled from "styled-components";
import CastawayCard from "../CastawayCard/CastawayCard";
import Headshot from "../Headshot/Headshot";

const Tribe = ({
  tribe,
  episodeData,
  tribeData,
  formerTribeHighlight = ``,
  setFormerTribeHighlight = {},
  removeFormerTribeHighlight = {},
  seasonNumber,
}) => {
  const { castaways } = episodeData;

  const getTribeTitle = (tribeName) => {
    if (tribeName === `Extinction Island`) {
      return <i className="fas fa-skull-crossbones" />;
    }
    return tribeName;
  };

  const tribeClass = tribe.name === `Extinction Island` ? `extinction-island` : tribe.name.toLowerCase();

  return (
    <StyledTribe tribe={tribe.name} className={`tribe pa2 fl ${tribeClass}`}>
      <h1>{getTribeTitle(tribe.name)}</h1>
      <CastawayList tribeName={tribe.name}>
        {castaways
          && tribe.name !== `Extinction Island`
          && castaways
            .filter(
              castaway => castaway.tribe.replace(/ \d/g, ``) === tribe.name && castaway.currentBoot === false,
            )
            .map(castaway => (
              <CastawayCard
                tribeName={tribe.name}
                tribeColor={tribe.tribe_color}
                key={castaway.name}
                castaway={castaway}
                tribeData={tribeData}
                formerTribeHighlight={formerTribeHighlight}
                setFormerTribeHighlight={setFormerTribeHighlight}
                removeFormerTribeHighlight={removeFormerTribeHighlight}
                episodeId={episodeData.id}
              />
            ))}
        {castaways
          && tribe.name === `Extinction Island`
          && castaways
            .filter(
              castaway => castaway.tribe.replace(/ \d/g, ``) === tribe.name && castaway.currentBoot === false,
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

const StyledTribe = styled.section`
  flex: ${props => (props.tribe === `Extinction Island` ? `0.1` : `1 1`)};
`;

const CastawayList = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  max-width: 800px;
  /* Give padding to Extinction Island, center single tribes */
  margin: ${props => (props.tribeName === `Extinction Island` ? `5px` : `auto`)};
`;

export default Tribe;
