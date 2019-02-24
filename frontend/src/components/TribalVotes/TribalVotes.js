import React from 'react';
import './TribalVotes.css';
import Headshot from '../Headshot/Headshot';

const TribalVotes = ({
  roundNo, voteData, votedFor, seasonNumber,
}) => {
  const castawaysVotedFor = [...new Set(voteData.votes.map(vote => vote.playedOn))];
  const votesByVotedFor = castawaysVotedFor.map((castawayVotedFor) => {
    const returnObject = { votedFor: castawayVotedFor };
    returnObject.voters = voteData.votes
      .filter(vote => vote.playedOn === castawayVotedFor)
      .map(vote => vote.playedBy);
    return returnObject;
  });

  const voteTitle = roundNo ? `Vote ${roundNo}` : 'Votes';

  return (
    <React.Fragment>
      <div className="vote-container">
        <div className="grid-title">
          <h3>{voteTitle}</h3>
          <hr />
        </div>
        {votesByVotedFor.map(votesForCastaway => (
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
