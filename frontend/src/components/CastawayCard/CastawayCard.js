/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from "react";
import styled from "styled-components";
import { Image, Transformation } from "cloudinary-react";
import AdvantageIcons from "../AdvantageIcons/AdvantageIcons";
import FormerTribeIndicator from "../FormerTribeIndicator/FormerTribeIndicator";
import { FormerTribeShadow } from "./FormerTribeShadow";

const CastawayCard = ({
  castaway, classNames, tribeData, episodeId,
}) => {
  /**
   * For seasons in which a tribe keeps the same name throughout multiple
   * swaps, this takes a list of plain tribes (e.g. "Malolo", "Malolo 2",
   * "Malolo 3") and returns a dictionary of their semantic names (e.g.
   * "Original Malolo", "Malolo (1st swap)", "Malolo (2nd Swap)')
   */
  const getSemanticTribeNames = (formerTribeList) => {
    const semanticDictionary = {};

    formerTribeList.forEach((tribe) => {
      const newName = tribe.replace(/2$/, `(1st swap)`).replace(/3$/, `(2nd swap)`);
      semanticDictionary[tribe] = newName;
    });
    return semanticDictionary;
  };

  const imageFileName = `${episodeId.substring(0, 3)}_${castaway.name
    .replace(/,|\./g, ``)
    .replace(/\s/g, `_`)
    .toLowerCase()}`;
  const formerTribeClassNames = castaway.formerTribes
    .map(formerTribe => `former-${formerTribe.replace(/\s/g, `-`).toLowerCase()}`)
    .join(` `);

  const semanticTribes = getSemanticTribeNames(castaway.formerTribes);

  return (
    <StyledCastawayCard
      className={`castaway-card grow relative ${formerTribeClassNames} ${classNames}`}
      tribe={castaway.tribe}
      tribeData={tribeData}
    >
      <HeadshotContainer href={castaway.wikiUrl}>
        <StyledImage publicId={`castaways/${imageFileName}`}>
          <Transformation gravity="face" height="128" width="128" crop="thumb" />
        </StyledImage>
      </HeadshotContainer>
      <CardNameplate className="card-nameplate">
        {castaway.nickname
          ? castaway.nickname
          : castaway.name.substr(0, castaway.name.indexOf(` `))}
      </CardNameplate>
      <TribeCircleContainer className="tribe-circle-container">
        {/* TODO: This is a messy way to get the tribe data to circumvent a rendering error.
            Fix it */}
        {tribeData && castaway.formerTribes.length > 0 && <i className="fas fa-history" />}
        {tribeData
          && castaway.formerTribes
          && castaway.formerTribes.map((formerTribe) => {
            const circleColor = tribeData.find(
              tribe => formerTribe.replace(/ \d/g, ``) === tribe.name,
            );
            if (circleColor) {
              return (
                <FormerTribeIndicator
                  key={formerTribe}
                  circleColor={circleColor.tribe_color}
                  formerTribe={formerTribe}
                  semanticTribes={semanticTribes}
                />
              );
            }
            return null;
          })}
      </TribeCircleContainer>
      <AdvantageIcons castaway={castaway} />
      <FormerTribeShadow formerTribes={castaway.formerTribes} />
    </StyledCastawayCard>
  );
};
const backgroundGradients = {
  orange: `linear-gradient(to bottom, #df940a, #a36f12)`,
  purple: `linear-gradient(to right bottom, #740274, #850385, #960396, #a704a7, #b905b9);`,
  green: `linear-gradient(to bottom, #007100, #328e24, #53ac41, #72ca5e, #91ea7b)`,
  blue: `linear-gradient(to bottom, #0055f1, #5270f6, #7a8cfa, #9ca8fd, #bcc4ff)`,
  black: `linear-gradient(to bottom, #363636, #575757, #7b7b7b, #a1a1a1, #c8c8c8)`,
  red: `linear-gradient(to bottom, #ff0000, #dd0003, #bd0004, #9d0003, #7e0000)`,
  yellow: `linear-gradient(to bottom, #ffff00, #c7cc03, #939b03, #646c02, #394000)`,
};

const StyledCastawayCard = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;
  border-radius: 20px;
  display: grid;
  grid-template-areas:
    "headshot nameplate"
    "headshot former-tribes"
    "headshot .";
  grid-template-columns: auto 1fr;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 3px;
  width: 200px;
  height: 90px;
  margin: 5px;
  background: ${(props) => {
    const tribeName = props.tribe;
    const tribeColor = props.tribeData.find(tribe => tribe.name === tribeName).tribe_color;
    return backgroundGradients[tribeColor];
  }}
    ${(props) => {
    if (props.tribe === `Extinction Island`) {
      return `max-width: 100px; max-height: 100px;`;
    }
    if (props.tribe === `out`) {
      return `max-width: 64px; max-height: 64px;`;
    }

    return null;
  }};
`;

const HeadshotContainer = styled.a`
  grid-area: headshot;
  display: block;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
  max-height: 100%;
  object-position: 50% 0;
  width: 90px;
  height: 100%;
`;

const CardNameplate = styled.div`
  grid-area: nameplate;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgb(255, 255, 255, 0.9);
  font-family: "Londrina Solid", sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  text-shadow: 3px 3px 5px black, -1px -1px 8px black;
  text-align: left;
`;

const TribeCircleContainer = styled.div`
  grid-area: former-tribes;
  text-align: left;
  color: rgba(41, 41, 41, 0.9);
`;

export default CastawayCard;
