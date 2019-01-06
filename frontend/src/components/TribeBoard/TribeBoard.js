import React from 'react';
import Tribe from '../Tribe/Tribe';

const TribeBoard = ({activeTribes, castaways}) => {
  return(
    <main>
      {activeTribes.length > 0 &&
        activeTribes.map(tribe => (
          <Tribe
            key={tribe.name}
            tribe={tribe}
            castaways={castaways} />
        ))
      }
      {activeTribes.length === 0 && 'loading...'}
    </main>
  )
}

export default TribeBoard;