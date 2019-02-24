import React from 'react';
import './TribalCouncils.css';
import TribalVotes from '../TribalVotes/TribalVotes';

const TribalCouncils = ({ tribalCouncils, seasonNumber }) => (
  <section className="tribal-councils-container">
    <h1>Tribal</h1>
    {tribalCouncils.map(tribalCouncil => (
      <div className="tribal-council" key={tribalCouncil.tribalNumber}>
        <h2>{`Day ${tribalCouncil.day}`}</h2>
        {tribalCouncil.vote_rounds.map((voteRound) => {
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
  </section>
);

export default TribalCouncils;
