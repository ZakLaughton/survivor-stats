import React from 'react';

import('./SeasonInfoMessage.css');

const SeasonInfoMessage = ({ message }) => {
  if (message) {
    return (
      <div className="info-message animated slideInDown">
        <i className="fas fa-info-circle" />
        {' '}
        {message}
      </div>
    );
  }
  return null;
};

export default SeasonInfoMessage;
