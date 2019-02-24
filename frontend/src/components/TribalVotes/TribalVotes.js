import React from 'react';
import './TribalVotes.css';

const TribalVotes = ({ roundNo, voteData, votedFor }) => {
  const castawaysVotedFor = [...new Set(voteData.votes.map(vote => vote.playedOn))];
  const votesByVotedFor = castawaysVotedFor.map((castawayVotedFor) => {
    const returnObject = { votedFor: castawayVotedFor };
    returnObject.voters = voteData.votes
      .filter(vote => vote.playedOn === castawayVotedFor)
      .map(vote => vote.playedBy);
    return returnObject;
  });
  console.log('vbvf: ', votesByVotedFor);

  return (
    <div className="vote-container">
      {roundNo && <h3>{`Vote ${roundNo}`}</h3>}
      {votesByVotedFor.map(votesForCastaway => (
        <div className="votesForCastaway" key={votesForCastaway.votedFor}>
          <div className="voters">{votesForCastaway.voters}</div>
          <div className="votee">{votesForCastaway.votedFor}</div>
        </div>
      ))}
    </div>
  );
};

export default TribalVotes;
