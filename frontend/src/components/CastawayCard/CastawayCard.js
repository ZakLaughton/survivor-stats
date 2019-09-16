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
    >
      <HeadshotContainer href={castaway.wikiUrl}>
        <Image publicId={`castaways/${imageFileName}`}>
          <Transformation gravity="face" height="128" width="128" crop="thumb" />
        </Image>
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

const StyledCastawayCard = styled.div`
  /* box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important; */
  display: grid;
  grid-template-areas:
    "headshot nameplate"
    "headshot former-tribes"
    "headshot .";
  grid-template-columns: 30% 1fr;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 3px;
  width: 170px;
  height: 70px;
  margin: 5px;

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

  > img {
    cursor: pointer;
    max-height: 100%;
    object-fit: cover;
    object-position: 50% 0;
    width: 100%;
    height: 100%;
  }
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
