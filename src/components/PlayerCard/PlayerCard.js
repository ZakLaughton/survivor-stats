import React from 'react';

const PlayerCard = ({player}) => {
  return(
    <article class="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
      <img src="http://placekitten.com/g/600/300" class="db w-100 br2 br--top" alt="Photo of a kitten looking menacing." />
      <div class="dt w-100 mt1">
        <div class="dtc">
          <h1 class="f4-ns mv0">{player.fullName}</h1>
        </div>
      </div>
    </article>
  )
}

export default PlayerCard;