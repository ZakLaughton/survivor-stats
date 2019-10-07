import React, { FunctionComponent } from 'react';
import { SectionWrapper } from '../SectionWrapper/SectionWrapper';
import TribalVotes from '../TribalVotes/TribalVotes';
import { TribalCouncil } from '../../types';
import styled from 'styled-components';

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
      <TribalCouncilsContainer>
        {tribalCouncils
          .sort((a, b) => (a.tribalNumber || 0) - (b.tribalNumber || 0))
          .map(tribalCouncil => (
            <StyledTribalCouncil key={tribalCouncil.tribalNumber || 0}>
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
            </StyledTribalCouncil>
          ))}
      </TribalCouncilsContainer>
    </SectionWrapper>
  );
};

const TribalCouncilsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledTribalCouncil = styled.div`
  margin: 10px 20px;

  h2 {
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 2rem;
    margin: 0px;
  }
`;

export default TribalCouncils;
