import React from 'react';
import './TribalCouncils.css';
import TribalVotes from '../TribalVotes/TribalVotes';

const TribalCouncils = ({ tribalCouncils, seasonNumber }) => {
  const multipleTribals = tribalCouncils.length > 1;
  const tribalHeader = multipleTribals ? `Tribal Councils` : `Tribal Council`;

  return (
    <section className='tribal-councils'>
      <h1>{!multipleTribals && tribalCouncils[0].finalTribal ? `Final Tribal` : tribalHeader}</h1>
      <div className='tribal-councils-container'>
        {tribalCouncils
          .sort((a, b) => a.tribal_number - b.tribal_number)
          .map(tribalCouncil => (
            <div className='tribal-council' key={tribalCouncil.tribalNumber}>
              {!tribalCouncil.finalTribal && <h2>{`Day ${tribalCouncil.day}`}</h2>}
              <p className='tribal-notes'>{tribalCouncil.notes}</p>
              {!tribalCouncil.fireMakingTribal &&
                tribalCouncil.vote_rounds.map(voteRound => {
                  const roundNo = tribalCouncil.vote_rounds.length > 1 ? voteRound.round_no : null;
                  return (
                    <TribalVotes
                      key={roundNo}
                      roundNo={roundNo}
                      voteData={voteRound}
                      votedFor={tribalCouncil.votedFor}
                      seasonNumber={seasonNumber}
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </section>
  );
};

export default TribalCouncils;
