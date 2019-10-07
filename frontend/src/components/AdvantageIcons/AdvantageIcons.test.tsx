/* eslint-env jest */
import React from 'react';
import AdvantageIcons, { AdvantageIconsProps } from './AdvantageIcons';

const mockProps: AdvantageIconsProps = {
  advantages: [{ item: 'immunity idol' }, { item: 'fake immunity idol' }],
};

it('renders without crashing', () => {
  expect(<AdvantageIcons {...mockProps} />).toMatchSnapshot();
});
