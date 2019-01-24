import React from 'react';
import './CastawayCard.css';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';
import FormerTribeIndicator from '../FormerTribeIndicator/FormerTribeIndicator';

class CastawayCard extends React.Component {
  state = {
    hoverFormerTribeStyle: {},
    hoverFormerTribeActive: false
  }

  /**
   * For seasons in which a tribe keeps the same name throughout multiple
   * swaps, this takes a list of plain tribes (e.g. "Malolo", "Malolo 2", "Malolo 3")
   * and returns their semantic names (e.g. "Original Malolo", "Malolo (1st swap)", 
   * "Malolo (2nd Swap)')
   */
  getSemanticTribeNames = (formerTribeList) => {
    const tribesNeedingRenaming = formerTribeList.filter(tribe => tribe.match(/\d$/));
    const semanticTribes = tribesNeedingRenaming
      .map(tribe => tribe.replace(/2$/, '(1st swap)').replace(/3$/, '(2nd swap)'))
    return(semanticTribes)

  }
  

  updateFormerTribeHover = () => {
    const {formerTribeHighlight, castaway, tribeData} = this.props;
    if (formerTribeHighlight && formerTribeHighlight.active && !this.state.hoverFormerTribeActive && castaway.formerTribes.find(tribe => tribe === formerTribeHighlight.tribeName)) {
      const activeTribeColor = tribeData.find((tribe) => tribe.name === formerTribeHighlight.tribeName.replace(/\d| /g, '')).tribe_color; 
      const highlightedStyle = {
        boxShadow: `inset 0px 0px 20px 10px ${activeTribeColor}`,
      }
      this.setState({hoverFormerTribeStyle: highlightedStyle, hoverFormerTribeActive: true})
    } else if (formerTribeHighlight && !formerTribeHighlight.active && this.state.hoverFormerTribeActive) {
      this.setState({hoverFormerTribeStyle: {}, hoverFormerTribeActive: false})      
    }
  }

  render() {
    const {castaway, classNames, tribeData, formerTribeHighlight, setFormerTribeHighlight, removeFormerTribeHighlight} = this.props;
    const {hoverFormerTribeStyle} = this.state;
    const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';
    const formerTribeClassNames = castaway.formerTribes
      .map((formerTribe) => 'former-' + formerTribe.replace(/\s/g, '-').toLowerCase())
      .join(' ');  

    const semanticTribes = this.getSemanticTribeNames(castaway.formerTribes);
    console.log('semanticTribes: ', semanticTribes)

    this.updateFormerTribeHover();

    return(
      <article
        className={`castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2 ${formerTribeClassNames} ${classNames}`}
      >
        <div className="tribe-circle-container">
          {tribeData && castaway.formerTribes.map(formerTribe => {
            const circleColor = tribeData.find(tribe => formerTribe.replace(/\d| /g, '') === tribe.name).tribe_color;
            return (
              <FormerTribeIndicator 
                key={formerTribe}
                circleColor={circleColor}
                formerTribe={formerTribe}
                setFormerTribeHighlight={setFormerTribeHighlight}
                removeFormerTribeHighlight={removeFormerTribeHighlight}
                formerTribeHighlight={formerTribeHighlight}
              />
            )
          })}
        </div>
        <AdvantageIcons castaway={castaway}/>
        <img
          src={require(`../../img/${imageFileName}`)}
          className={`db br2 br--top`}
          alt={castaway.name} />
        <div className="shadow" style={hoverFormerTribeStyle}/>
        <div className="card-nameplate" >
            <h2 className="card-name br2 mv0 center tc">
              {castaway.name}
            </h2>
        </div>
      </article>
    )
  }   
}

export default CastawayCard;