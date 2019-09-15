/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from "react";
import "./CastawayCard.css";
import styled from "styled-components";
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
    .toLowerCase()}.jpg`;
  const formerTribeClassNames = castaway.formerTribes
    .map(formerTribe => `former-${formerTribe.replace(/\s/g, `-`).toLowerCase()}`)
    .join(` `);

  const semanticTribes = getSemanticTribeNames(castaway.formerTribes);

  const Wrapper = styled.div`
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    position: relative;
    background-color: #bcbcbc;
    background-clip: content-box;
  `;

  const CardNameplate = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    margin-left: auto;
    margin-right: auto;
    pointer-events: none;
    overflow: hidden;
  `;

  const CardNameplateText = styled.h2`
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 90%;
    color: rgb(255, 255, 255, 0.9);
    font-family: "Londrina Solid", sans-serif;
    font-size: 1.7rem;
    font-weight: 500;
    text-shadow: 3px 3px 5px black, -1px -1px 8px black;
    border-radius: 0.25rem;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
  `;

  const TribeCircleContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `;

  return (
    <Wrapper
      className={`castaway-card grow relative ma1 br2 ba dark-gray
          b--black-10 ma2 ${formerTribeClassNames} ${classNames}`}
    >
      <TribeCircleContainer className="tribe-circle-container">
        {/* TODO: This is a messy way to get the tribe data to circumvent a rendering error.
            Fix it */}
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
      <a href={castaway.wikiUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={require(`../../img/${imageFileName}`)}
          className="db br2 br--top"
          alt={castaway.name}
        />
      </a>
      <FormerTribeShadow formerTribes={castaway.formerTribes} />
      <CardNameplate className="card-nameplate">
        <CardNameplateText>
          {castaway.nickname
            ? castaway.nickname
            : castaway.name.substr(0, castaway.name.indexOf(` `))}
        </CardNameplateText>
      </CardNameplate>
    </Wrapper>
  );
};

export default CastawayCard;
