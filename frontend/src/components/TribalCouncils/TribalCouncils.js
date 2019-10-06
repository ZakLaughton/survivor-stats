import React from 'react';
import './TribalCouncils.css';
import { SectionWrapper } from '../SectionWrapper/SectionWrapper';
import TribalVotes from '../TribalVotes/TribalVotes';

const MINIMUM_COUNT_FOR_MULTIPLE_TRIBALS = 2;
const MINIMUM_COUNT_FOR_MULTIPLE_VOTE_ROUNDS = 2;

const TribalCouncils = ({ tribalCouncils, seasonNumber }) => {
  const multipleTribals = tribalCouncils.length >= MINIMUM_COUNT_FOR_MULTIPLE_TRIBALS;
  let tribalHeader = `Tribal Council`;

  if (multipleTribals) {
    tribalHeader = `Tribal Councils`;
  }
  if (tribalCouncils[0].finalTribal) {
    tribalHeader = `Final Tribal`;
  }

  return (
    <SectionWrapper sectionTitle={tribalHeader}>
      <div className='tribal-councils-container'>
        {tribalCouncils
          .sort((a, b) => a.tribal_number - b.tribal_number)
          .map(tribalCouncil => (
            <div className='tribal-council' key={tribalCouncil.tribalNumber}>
              {!tribalCouncil.finalTribal && <h2>{`Day ${tribalCouncil.day}`}</h2>}
              <p className='tribal-notes'>{tribalCouncil.notes}</p>
              {!tribalCouncil.fireMakingTribal &&
                tribalCouncil.vote_rounds.map(voteRound => {
                  const roundNo =
                    tribalCouncil.vote_rounds.length > MINIMUM_COUNT_FOR_MULTIPLE_VOTE_ROUNDS
                      ? voteRound.round_no
                      : null;
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
    </SectionWrapper>
  );
};

export default TribalCouncils;
