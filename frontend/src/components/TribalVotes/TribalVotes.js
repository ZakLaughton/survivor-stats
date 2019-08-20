import React from 'react';
import './TribalVotes.css';
import Headshot from '../Headshot/Headshot';

const TribalVotes = ({ roundNo, voteData, seasonNumber }) => {
  const castawaysVotedFor = [...new Set(voteData.votes.map(vote => vote.playedOn))];
  const votesByVotedFor = castawaysVotedFor.map((castawayVotedFor) => {
    const returnObject = { votedFor: castawayVotedFor };
    returnObject.voters = voteData.votes
      .filter(vote => vote.playedOn === castawayVotedFor && vote.playedBy)
      .map(vote => vote.playedBy);
    return returnObject;
  });

  const sortedVotesByVotedFor = votesByVotedFor
    .sort((a, b) => (a.voters.length > b.voters.length ? -1 : 1));

  const voteTitle = roundNo ? `Vote ${roundNo}` : 'Votes';

  return (
    <React.Fragment>
      <div className="vote-container">
        <div className="grid-title">
          <h3>{voteTitle}</h3>
          <hr />
        </div>
        {sortedVotesByVotedFor.map(votesForCastaway => (
          <React.Fragment>
            <div className="voters">
              {votesForCastaway.voters.map(voter => (
                <Headshot castaway={voter} seasonNumber={seasonNumber} />
              ))}
            </div>
            <i className="fas fa-arrow-right" />
            <div className="votee">
              <Headshot castaway={votesForCastaway.votedFor} seasonNumber={seasonNumber} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default TribalVotes;
