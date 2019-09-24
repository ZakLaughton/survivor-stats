import styled, { createGlobalStyle } from "styled-components";
import React, { useState } from "react";
import VotedOutPanel from "../VotedOutPanel/VotedOutPanel";
import { FormerTribeHighlightContext } from "./FormerTribeHighlightContext";
import {ActiveSeasonData, Tribe as TribeType, Episode} from "../../types";
import Tribe from "../Tribe/Tribe"

const castawayCardSizeSm = `110px`;

const GlobalStyle = createGlobalStyle`
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
`;

// @ts-ignore
export const FormerTribeHighlightProvider = ({ children }) => {
  const [highlightedFormerTribe, setFormerTribeHighlight] = useState({
    tribeName: ``,
    color: `blue`,
  });
  return (
    <FormerTribeHighlightContext.Provider
      value={{
        highlightedFormerTribe,
        // @ts-ignore
        updateTribeHighlight: (tribeName: string) => setFormerTribeHighlight(tribeName),
      }}
    >
      {children}
    </FormerTribeHighlightContext.Provider>
  );
};

interface TribeBoardProps {
  activeSeasonData: ActiveSeasonData;
  activeEpisodeNumber: number;
}

export const TribeBoard = ({
  activeSeasonData, activeEpisodeNumber,
}: TribeBoardProps) => {
  const tribeData = activeSeasonData.tribes;
  let episodeData: Episode | undefined;
    // @ts-ignore
  if (activeSeasonData && activeSeasonData.episodes && activeSeasonData.episodes[activeEpisodeNumber]) {
    // @ts-ignore
    episodeData = activeSeasonData.episodes[activeEpisodeNumber];
  }

  const activeTribes: TribeType[] = activeSeasonData && activeSeasonData.tribes && episodeData && episodeData.castaways
  // @ts-ignore episodeData object is possibly 'undefined'
  ? activeSeasonData.tribes.filter(tribe => episodeData.castaways
    // Don't show current boots (to be removed in future)
      .filter(castaway => castaway.currentBoot === false)
      .some(castaway => castaway.tribe.replace(/ \d/g, ``) === tribe.name))
    : [];

  return (
    <FormerTribeHighlightProvider>
      <article>
        <GlobalStyle />
        {/*
        // @ts-ignore */}
        <ActiveTribes activeTribes={activeTribes} className={`tribe-count-${activeTribes.length}`}>
          {activeTribes.length > 0
            && activeTribes
              .filter(tribe => tribe.name !== `Extinction Island`)
              .map((tribe: TribeType) => (
                // @ts-ignore
                <Tribe
                  key={tribe.name}
                  tribe={tribe}
                  episodeData={episodeData}
                  tribeData={tribeData}
                  seasonNumber={activeSeasonData.season}
                />
              ))}
          {activeTribes.length > 0
            && activeTribes
              .filter(tribe => tribe.name === `Extinction Island`)
              .map(tribe => (
                // @ts-ignore
                <Tribe
                  key={tribe.name}
                  tribe={tribe}
                  episodeData={episodeData}
                  tribeData={tribeData}
                  seasonNumber={activeSeasonData.season}
                />
              )) }
          {activeTribes.length === 0 && `loading...`}
        </ActiveTribes>
        {/*
        // @ts-ignore */}
        {/* <VotedOutPanel episodeData={episodeData} tribeData={tribeData} seasonNum={seasonNum} /> */}
      </article>
    </FormerTribeHighlightProvider>
  );
};

const ActiveTribes = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;

  ${(props) => {
    // @ts-ignore - Property 'activeTribes' does not exist on type 'ThemedStyledProps...
    if (props.activeTribes.length === 2) {
      return `@media only screen and (max-width: 750px) {flex-direction: column;}`;
    }
    // @ts-ignore - Property 'activeTribes' does not exist on type 'ThemedStyledProps...
    if (props.activeTribes.length === 3) {
      return `@media only screen and (max-width: 1150px) {flex-direction: column;}`;
    }
    // @ts-ignore - Property 'activeTribes' does not exist on type 'ThemedStyledProps...
    if (props.activeTribes.length === 4) {
      return `@media only screen and (max-width: 761px) {flex-direction: column;}`;
    }
    return ``;
  }}
`;
