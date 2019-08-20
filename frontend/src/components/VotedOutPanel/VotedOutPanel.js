import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard';

import('./VotedOutPanel.css');

const VotedOutPanel = ({ episodeData, formerTribeHighlight, tribeData }) => {
  const { castaways } = episodeData;
  const juryStarted = !!(castaways && castaways.some(castaway => castaway.juryMember));

  if (
    episodeData.castaways
    && episodeData.castaways.some(castaway => castaway.tribe === 'out' || castaway.currentBoot)
  ) {
    return (
      <section className="voted-out-panel animated slideInUp">
        <div className="castawayList votedout">
          {castaways
            && castaways
              .filter(
                castaway => (castaway.tribe === 'out' || castaway.currentBoot) && !castaway.juryMember,
              )
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => (
                <CastawayCard
                  key={castaway.name}
                  castaway={castaway}
                  formerTribeHighlight={formerTribeHighlight}
                  classNames="animated fadeIn prejury"
                  tribeData={tribeData}
                  episodeId={episodeData.id}
                />
              ))}
          {juryStarted && <span className="jury-title">JURY</span>}
          {juryStarted
            && castaways
              .filter(castaway => castaway.juryMember)
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => (
                <CastawayCard
                  key={castaway.name}
                  castaway={castaway}
                  formerTribeHighlight={formerTribeHighlight}
                  classNames="animated fadeIn jury"
                  tribeData={tribeData}
                  episodeId={episodeData.id}
                />
              ))}
        </div>
      </section>
    );
  }
  return null;
};

export default VotedOutPanel;
