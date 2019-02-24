import React from 'react';
import './EpisodeEvents.css';
import TribalCouncils from '../TribalCouncils/TribalCouncils';

const EpisodeEvents = ({ seasonData, episodeId }) => {
  let tribalCouncils = [];
  if (seasonData.episodes) {
    const episodeData = seasonData.episodes.find(episode => episode.id === episodeId);
    tribalCouncils = episodeData.tribalCouncils;
  }

  return (
    <article className="episode-events">
      {tribalCouncils.length > 0 && (
        <TribalCouncils tribalCouncils={tribalCouncils} seasonNumber={seasonData.season} />
      )}
    </article>
  );
};

export default EpisodeEvents;
