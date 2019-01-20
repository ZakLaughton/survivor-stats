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
    if (this.props.formerTribeHighlight.active && !this.state.hoverFormerTribeActive && this.props.castaway.formerTribes.find(tribe => tribe === this.props.formerTribeHighlight.tribeName)) {
      this.setState({hoverFormerTribeStyle: {border: '2px solid black'}, hoverFormerTribeActive: true})
    } else if (!this.props.formerTribeHighlight.active && this.state.hoverFormerTribeActive) {
      this.setState({hoverFormerTribeStyle: {border: 'none'}, hoverFormerTribeActive: false})      
    }
  }

  render() {
    const {castaway, tribeData, grayScale, formerTribeHighlight, setFormerTribeHighlight, removeFormerTribeHighlight} = this.props;
    const {hoverFormerTribeStyle} = this.state;
    const imageFileName = castaway.name.replace(/\s/, '_').toLowerCase() + '.jpg';
    const formerTribeClassNames = castaway.formerTribes
      .map((formerTribe) => 'former-' + formerTribe.replace(/\s/g, '-').toLowerCase())
      .join(' ');  

    this.updateFormerTribeHover();

    return(
      <article
        className={`castaway-card grow relative ma1 br2 ba dark-gray b--black-10 ma2 ${formerTribeClassNames}`}
        style={hoverFormerTribeStyle}
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
          className={`db br2 br--top ${grayScale}`}
          alt={castaway.name} />
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