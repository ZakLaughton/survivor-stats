import React, { FunctionComponent } from 'react';
import './TribalCouncils.css';
// TODO: Remove this eslint ignore once TribalCouncils is converted to TS
// eslint-disable-next-line import/no-unresolved
import { SectionWrapper } from '../SectionWrapper/SectionWrapper';
import TribalVotes from '../TribalVotes/TribalVotes';
import { TribalCouncil } from '../../types';

const MINIMUM_COUNT_FOR_MULTIPLE_TRIBALS = 2;
const MINIMUM_COUNT_FOR_MULTIPLE_VOTE_ROUNDS = 2;

interface TribalCouncilsProps {
  tribalCouncils: TribalCouncil[];
  seasonNumber: number;
}

const TribalCouncils: FunctionComponent<TribalCouncilsProps> = ({
  tribalCouncils,
  seasonNumber,
}) => {
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
          .sort((a, b) => (a.tribalNumber || 0) - (b.tribalNumber || 0))
          .map(tribalCouncil => (
            <div className='tribal-council' key={tribalCouncil.tribalNumber || 0}>
              {!tribalCouncil.finalTribal && <h2>{`Day ${tribalCouncil.day}`}</h2>}
              <p className='tribal-notes'>{tribalCouncil.notes}</p>
              {!tribalCouncil.fireMakingTribal &&
                tribalCouncil.vote_rounds.map(voteRound => {
                  const roundNo =
                    tribalCouncil.vote_rounds.length > MINIMUM_COUNT_FOR_MULTIPLE_VOTE_ROUNDS
                      ? voteRound.round_no
                      : 0;
                  return (
                    <TribalVotes
                      key={roundNo}
                      roundNo={roundNo}
                      voteData={voteRound}
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
