import styled, { createGlobalStyle } from 'styled-components';
import React, { useState, FunctionComponent } from 'react';

interface SectionWrapperProps {
  sectionTitle: string;
}

export const SectionWrapper: FunctionComponent<SectionWrapperProps> = ({
  sectionTitle,
  children,
}) => {
  return (
    <StyledSectionWrapper>
      <SectionTitle>{sectionTitle}</SectionTitle>
      {children}
    </StyledSectionWrapper>
  );
};

const StyledSectionWrapper = styled.section`
  margin: 20px auto;
  border-radius: 10px;
  background: #666;
  max-width: 900px;
  padding: 5px;
`;

const SectionTitle = styled.h1`
  margin: 0px 30px;
`;
