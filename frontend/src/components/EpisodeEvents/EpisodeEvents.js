import React from "react";
import "./EpisodeEvents.css";
import TribalCouncils from "../TribalCouncils/TribalCouncils";

const EpisodeEvents = ({ activeSeasonData, episodeId }) => {
  let tribalCouncils = [];
  if (activeSeasonData.episodes) {
    const episodeData = activeSeasonData.episodes.find(episode => episode.id === episodeId);
    tribalCouncils = episodeData.tribalCouncils;
  }

  return (
    <article className="episode-events">
      {tribalCouncils.length > 0 && (
        <TribalCouncils tribalCouncils={tribalCouncils} seasonNumber={activeSeasonData.season} />
      )}
    </article>
  );
};

export default EpisodeEvents;
