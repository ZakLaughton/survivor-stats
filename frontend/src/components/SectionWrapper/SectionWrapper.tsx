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
    <section>
      <SectionTitle>{sectionTitle}</SectionTitle>
      {children}
    </section>
  );
};

const SectionTitle = styled.h1`
  border-bottom: white solid 2px;
  margin: 0px 30px;
`;
