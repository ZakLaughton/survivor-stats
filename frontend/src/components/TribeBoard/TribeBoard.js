import styled, { createGlobalStyle } from "styled-components";
import React, { useState } from "react";
import Tribe from "../Tribe/Tribe";
import VotedOutPanel from "../VotedOutPanel/VotedOutPanel";
import { FormerTribeHighlightContext } from "./FormerTribeHighlightContext";

const castawayCardSize = `130px`;
const castawayCardSizeSm = `110px`;

const GlobalStyle = createGlobalStyle`
  .tribe .castaway-card {
    min-width: ${castawayCardSize};
    min-height: ${castawayCardSize};
    width: ${castawayCardSize};
    max-width: ${castawayCardSize};
    max-height: ${castawayCardSize};
  }

  .extinction-island .castaway-card {
    max-width: 100px
  }

  /* Avoid single-column castaway list */
  /* w/ two tribes */
  @media only screen and (min-width: 515px) and (max-width: 637px) {
    .tribe-count-2 .tribe .castaway-card {
      min-width: ${castawayCardSizeSm};
      min-height: ${castawayCardSizeSm};
      width: ${castawayCardSizeSm};
      max-width: ${castawayCardSizeSm};
      max-height: ${castawayCardSizeSm};
    }

    .tribe-count-2 .tribe .castaway-card h2 {
      font-size: 1.3rem;
    }
  }

  /* w/ three tribes */
  @media only screen and (min-width: 766px) and (max-width: 957px) {
    .tribe-count-3 .tribe .castaway-card {
      min-width: ${castawayCardSizeSm};
      min-height: ${castawayCardSizeSm};
      width: ${castawayCardSizeSm};
      max-width: ${castawayCardSizeSm};
      max-height: ${castawayCardSizeSm};
    }

    .tribe-count-3 .tribe .castaway-card h2 {
      font-size: 1.3rem;
    }
  }

  /* w/ 4 tribes */
  @media only screen and (min-width: 761px) and (max-width: 1075px) {
    .tribe-count-4 .tribe .castaway-card {
      min-width: ${castawayCardSizeSm};
      min-height: ${castawayCardSizeSm};
      width: ${castawayCardSizeSm};
      max-width: ${castawayCardSizeSm};
      max-height: ${castawayCardSizeSm};
    }

    .tribe-count-4 .tribe .castaway-card h2 {
      font-size: 1.3rem;
    }
  }

  @media only screen and (min-width: 761px) and (max-width: 900px) {
    .tribe-count-4.active-tribes {
      flex-flow: row wrap !important;
    }

    .tribe-count-4 .extinction-island {
      flex: 0 1 100% !important;
    }

    .tribe-count-4 .extinction-island h1 {
      margin-bottom: 0;
    }
  }

  @media only screen and (max-width: 761px) {
    .tribe .castaway-card {
      min-width: ${castawayCardSizeSm};
      min-height: ${castawayCardSizeSm};
      width: ${castawayCardSizeSm};
      max-width: ${castawayCardSizeSm};
      max-height: ${castawayCardSizeSm};
    }

    .tribe .castaway-card h2 {
      font-size: 1.3rem;
    }
  }
`;

export const FormerTribeHighlightProvider = ({ children }) => {
  const [highlightedFormerTribe, setFormerTribeHighlight] = useState({
    tribeName: ``,
    color: `blue`,
  });
  return (
    <FormerTribeHighlightContext.Provider
      value={{
        highlightedFormerTribe,
        updateTribeHighlight: tribeName => setFormerTribeHighlight(tribeName),
      }}
    >
      {children}
    </FormerTribeHighlightContext.Provider>
  );
};

const TribeBoard = ({ tribeData, seasonData, episodeId }) => {
  const episodeData = seasonData && seasonData.episodes
    ? seasonData.episodes.find(episode => episode.id === episodeId)
    : {};

  const activeTribes = seasonData && seasonData.tribes && episodeData && episodeData.castaways
    ? seasonData.tribes.filter(tribe => episodeData.castaways
    // Don't show current boots (to be removed in future)
      .filter(castaway => castaway.currentBoot === false)
      .some(castaway => castaway.tribe.replace(/ \d/g, ``) === tribe.name))
    : [];

  return (
    <FormerTribeHighlightProvider>
      <article>
        <GlobalStyle />
        <ActiveTribes activeTribes={activeTribes} className={`tribe-count-${activeTribes.length}`}>
          {activeTribes.length > 0
            && activeTribes
              .filter(tribe => tribe.name !== `Extinction Island`)
              .map(tribe => (
                <Tribe
                  key={tribe.name}
                  tribe={tribe}
                  episodeData={episodeData}
                  tribeData={tribeData}
                />
              ))}
          {activeTribes.length > 0
            && activeTribes
              .filter(tribe => tribe.name === `Extinction Island`)
              .map(tribe => (
                <Tribe
                  key={tribe.name}
                  tribe={tribe}
                  episodeData={episodeData}
                  tribeData={tribeData}
                />
              ))}
          {activeTribes.length === 0 && `loading...`}
        </ActiveTribes>
        <VotedOutPanel episodeData={episodeData} tribeData={tribeData} />
      </article>
    </FormerTribeHighlightProvider>
  );
};

const ActiveTribes = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;

  ${(props) => {
    if (props.activeTribes.length === 2) {
      return `@media only screen and (max-width: 515px) {flex-direction: column;}`;
    }
    if (props.activeTribes.length === 3) {
      return `@media only screen and (max-width: 766px) {flex-direction: column;}`;
    }
    if (props.activeTribes.length === 4) {
      return `@media only screen and (max-width: 761px) {flex-direction: column;}`;
    }
    return ``;
  }}
`;

export default TribeBoard;
