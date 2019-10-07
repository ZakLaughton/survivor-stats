/* eslint-disable react/jsx-one-expression-per-line */
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface SeasonInfoMessageProps {
  message: string;
}

const SeasonInfoMessage: FunctionComponent<SeasonInfoMessageProps> = ({ message }) => {
  if (message) {
    return (
      <StyledInfoMessage className='animated slideInDown'>
        <i className='fas fa-info-circle' /> {message}
      </StyledInfoMessage>
    );
  }
  return null;
};

const StyledInfoMessage = styled.div`
  background-color: lightblue;
  width: 100%;
  z-index: 99;
  text-align: center;
  position: fixed;
`;

export default SeasonInfoMessage;
