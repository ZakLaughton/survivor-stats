import React from 'react';
import ('./SeasonInfoMessage.css');

const SeasonInfoMessage = ({ message }) => {
    return(<div className="info-message">{message}</div>);
}

export default SeasonInfoMessage;