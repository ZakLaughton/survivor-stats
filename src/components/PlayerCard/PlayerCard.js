import React from 'react';

const PlayerCard = ({player}) => {
  const imageFileName = `${player.firstName}_${player.lastName}.jpg`.toLowerCase();
  console.log(imageFileName);
  return(
    <article className="relative ma1 br2 ba dark-gray b--black-10 w-100 w-50-m w-25-l ma2">
      <img
        src={require(`../../img/${imageFileName}`)}
        className="db w-100 h-100 br2 br--top"
        alt="Kitten looking menacing." />
      <div className="w-100 absolute bottom-0 ">
          <h2 className="bg-silver  f4-ns mv0 center tc">{player.fullName}</h2>
      </div>
    </article>
  )
}

export default PlayerCard;