import React from 'react';
import './CastawayCard.css';
import AdvantageIcons from '../AdvantageIcons/AdvantageIcons';
import FormerTribeIndicator from '../FormerTribeIndicator/FormerTribeIndicator';

class CastawayCard extends React.Component {
  state = {
    hoverFormerTribeStyle: {},
    hoverFormerTribeActive: false,
  };

  /**
   * For seasons in which a tribe keeps the same name throughout multiple
   * swaps, this takes a list of plain tribes (e.g. "Malolo", "Malolo 2",
   * "Malolo 3") and returns a dictionary of their semantic names (e.g.
   * "Original Malolo", "Malolo (1st swap)", "Malolo (2nd Swap)')
   */
  getSemanticTribeNames = formerTribeList => {
    const semanticDictionary = {};

    formerTribeList.forEach((tribe, i) => {
      const newName = tribe.replace(/2$/, '(1st swap)').replace(/3$/, '(2nd swap)');
      semanticDictionary[tribe] = newName;
    });
    return semanticDictionary;
  };

  updateFormerTribeHover = () => {
    const {
      formerTribeHighlight,
      castaway,
      tribeData
    } = this.props;
    if (
      formerTribeHighlight &&
      formerTribeHighlight.active &&
      formerTribeHighlight.tribeName !== 'Extinction Island' &&
      !this.state.hoverFormerTribeActive &&
      castaway.formerTribes.find(tribe => tribe === formerTribeHighlight.tribeName)
    ) {
      const activeTribeColor = tribeData.find(
        tribe => tribe.name === formerTribeHighlight.tribeName.replace(/\d| /g, ''),
      ).tribe_color;
      const highlightedStyle = {
        boxShadow: `inset 0px 0px 20px 10px ${activeTribeColor}`,
      };
      this.setState({
        hoverFormerTribeStyle: highlightedStyle,
        hoverFormerTribeActive: true,
      });
    } else if (
      formerTribeHighlight &&
      !formerTribeHighlight.active &&
      this.state.hoverFormerTribeActive
    ) {
      this.setState({
        hoverFormerTribeStyle: {},
        hoverFormerTribeActive: false,
      });
    }
  };

  render() {
    const {
      castaway,
      classNames,
      tribeData,
      formerTribeHighlight,
      setFormerTribeHighlight,
      removeFormerTribeHighlight,
      episodeId,
    } = this.props;
    const {
      hoverFormerTribeStyle
    } = this.state;
    const imageFileName =
      episodeId.substring(0, 3) +
      '_' +
      castaway.name
      .replace(/,|\./g, '')
      .replace(/\s/g, '_')
      .toLowerCase() +
      '.jpg';
    const formerTribeClassNames = castaway.formerTribes
      .map(formerTribe => 'former-' + formerTribe.replace(/\s/g, '-').toLowerCase())
      .join(' ');

    const semanticTribes = this.getSemanticTribeNames(castaway.formerTribes);

    this.updateFormerTribeHover();

    return ( <
      div className = {
        `castaway-card grow relative ma1 br2 ba dark-gray
          b--black-10 ma2 ${formerTribeClassNames} ${classNames}`
      } >
      <
      div className = "tribe-circle-container" > {
        tribeData &&
        castaway.formerTribes.map(formerTribe => {
          const circleColor = tribeData.find(
            tribe => formerTribe.replace(/ \d/g, '') === tribe.name,
          ).tribe_color;
          return ( <
            FormerTribeIndicator key = {
              formerTribe
            }
            circleColor = {
              circleColor
            }
            formerTribe = {
              formerTribe
            }
            setFormerTribeHighlight = {
              setFormerTribeHighlight
            }
            removeFormerTribeHighlight = {
              removeFormerTribeHighlight
            }
            formerTribeHighlight = {
              formerTribeHighlight
            }
            semanticTribes = {
              semanticTribes
            }
            />
          );
        })
      } <
      /div> <
      AdvantageIcons castaway = {
        castaway
      }
      /> <
      a href = {
        castaway.wikiUrl
      }
      target = "_blank"
      rel = "noopener noreferrer" >
      <
      img src = {
        require(`../../img/${imageFileName}`)
      }
      className = {
        `db br2 br--top`
      }
      alt = {
        castaway.name
      }
      /> < /
      a > <
      div className = "shadow"
      style = {
        hoverFormerTribeStyle
      }
      /> <
      div className = "card-nameplate" >
      <
      h2 className = "card-name br2 mv0 center tc" > {
        castaway.nickname ?
        castaway.nickname : castaway.name.substr(0, castaway.name.indexOf(' '))
      } <
      /h2> < /
      div > <
      /div>
    );
  }
}

export default CastawayCard;