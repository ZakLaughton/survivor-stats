/* eslint-env jest */
import React from 'react';
import AdvantageIcons from './AdvantageIcons';

const mockProps = {
  castaway: {
    advantages: [{ item: 'immunity idol' }, { item: 'fake immunity idol' }],
  },
};

it('renders without crashing', () => {
  expect(<AdvantageIcons {...mockProps} />).toMatchSnapshot();
});
