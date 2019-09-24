import React from 'react';
import './EpisodeEvents.css';
import TribalCouncils from '../TribalCouncils/TribalCouncils';

const EpisodeEvents = ({ activeSeasonData, activeEpisodeNumber }) => {
  let tribalCouncils = [];
  if (activeSeasonData.episodes) {
    const episodeData = activeSeasonData.episodes[activeEpisodeNumber];
    // eslint-disable-next-line prefer-destructuring
    tribalCouncils = episodeData.tribalCouncils;
  }

  return (
    <article className='episode-events'>
      {tribalCouncils.length > 0 && (
        <TribalCouncils tribalCouncils={tribalCouncils} seasonNumber={activeSeasonData.season} />
      )}
    </article>
  );
};

export default EpisodeEvents;
