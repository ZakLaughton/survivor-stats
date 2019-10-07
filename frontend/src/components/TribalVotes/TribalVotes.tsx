import React, { FunctionComponent } from 'react';
import './TribalVotes.css';
import Headshot from '../Headshot/Headshot';
import { VoteRound } from '../../types';

interface VotesForContestant {
  votedFor: string;
  voters: string[];
}

interface TribalVotesProps {
  roundNo: number;
  voteData: VoteRound;
  seasonNumber: number;
}

const TribalVotes: FunctionComponent<TribalVotesProps> = ({ roundNo, voteData, seasonNumber }) => {
  const castawaysVotedFor = [...new Set(voteData.votes.map(vote => vote.playedOn))];
  const votesByVotedFor = castawaysVotedFor.map(castawayVotedFor => {
    const returnObject: VotesForContestant = { votedFor: castawayVotedFor, voters: [] };
    returnObject.voters = voteData.votes
      .filter(vote => vote.playedOn === castawayVotedFor && vote.playedBy)
      .map(vote => vote.playedBy);
    return returnObject;
  });

  const sortedVotesByVotedFor = votesByVotedFor.sort((a, b) =>
    a.voters.length > b.voters.length ? -1 : 1,
  );

  const voteTitle = roundNo ? `Vote ${roundNo}` : `Votes`;

  return (
    <>
      <div className='vote-container'>
        <div className='grid-title'>
          <h3>{voteTitle}</h3>
          <hr />
        </div>
        {sortedVotesByVotedFor.map(votesForCastaway => (
          <React.Fragment key={votesForCastaway.votedFor}>
            <div className='voters'>
              {votesForCastaway.voters.map((voter, index) => (
                <Headshot
                  castaway={voter}
                  key={voter + index}
                  seasonNumber={seasonNumber}
                  size={70}
                />
              ))}
            </div>
            <i className='fas fa-arrow-right' />
            <div className='votee'>
              <Headshot
                castaway={votesForCastaway.votedFor}
                seasonNumber={seasonNumber}
                size={70}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default TribalVotes;
