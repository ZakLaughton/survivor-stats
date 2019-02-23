import React from 'react';
import './EpisodeEvents.css';

const EpisodeEvents = ({ seasonData, episodeId }) => {
  if (seasonData.episodes) {
    const episodeData = seasonData.episodes.find(episode => episode.id === episodeId);
    const tribalCouncils = episodeData.tribalCouncils;
  }

  return (
    <article className="episode-events">
      <section className="tribal-council">
        <h1>Tribal Council</h1>
      </section>
    </article>
  );
};

export default EpisodeEvents;
