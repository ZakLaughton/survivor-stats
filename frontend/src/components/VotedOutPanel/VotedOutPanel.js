import React from 'react';
import CastawayCard from '../CastawayCard/CastawayCard';
import ('./VotedOutPanel.css');

const VotedOutPanel = ({ episodeData }) => {

  const {castaways} = episodeData


  if(episodeData.castaways 
  && episodeData.castaways.some((castaway) => castaway.tribe === 'out' || castaway.currentBoot)) {
    return(
      <div>
        <div className="clear-footer"></div>
        <section className="voted-out-panel">
          <div className="castawayList votedout">
            {castaways && castaways
              .filter((castaway) => castaway.tribe === 'out' || castaway.currentBoot)
              .sort((a, b) => a.bootOrder - b.bootOrder)
              .map(castaway => {
                if(castaways) {
                  return <CastawayCard
                            key={castaway.name}
                            castaway={castaway}
                          />
                } else {
                  return (`Loading image for ${castaway.name}`)
                }
            })}
          </div>
        </section>
      </div>
    )} else {
      return null;
    }
}

export default VotedOutPanel;