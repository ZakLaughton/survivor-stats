import React from 'react';
import ('./SeasonInfoMessage.css');

const SeasonInfoMessage = ({ message }) => {
    if (message) {
        return(<div className="info-message animated slideInDown"><i class="fas fa-info-circle"></i> {message}</div>);
    } else {
        return null;
    }
}

export default SeasonInfoMessage;