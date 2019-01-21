import React from 'react';
import './CastawayCard.css';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';
import FormerTribeIndicator from '../FormerTribeIndicator/FormerTribeIndicator';

class CastawayCard extends React.Component {
  state = {
    hoverFormerTribeStyle: {},
    hoverFormerTribeActive: false
  }

  updateFormerTribeHover = () => {
    const {formerTribeHighlight, castaway, tribeData} = this.props;
    if (formerTribeHighlight && formerTribeHighlight.active && !this.state.hoverFormerTribeActive && castaway.formerTribes.find(tribe => tribe === formerTribeHighlight.tribeName)) {
      const activeTribeColor = tribeData.find((tribe) => tribe.name === formerTribeHighlight.tribeName.replace(/\d| /g, '')).tribe_color; 
      const highlightedStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        boxShadow: `inset 0px 0px 20px 10px ${activeTribeColor}`,
        top: 0,
        left: 0
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