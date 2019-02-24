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

  return (
    <div className="vote-container">
      {roundNo && <h3>{`Vote ${roundNo}`}</h3>}
      <div className="column-title">Voters</div>
      <div className="column-title">Voted For</div>
      {votesByVotedFor.map(votesForCastaway => (
        <React.Fragment>
          <div className="voters">
            {votesForCastaway.voters.map(voter => (
              <Headshot castaway={voter} seasonNumber={seasonNumber} />
            ))}
          </div>

          <div className="votee">
            <Headshot castaway={votesForCastaway.votedFor} seasonNumber={seasonNumber} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TribalVotes;
