/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import AdvantageIcons from './AdvantageIcons';

const mockProps = {
  castaway: {
    advantages: [{ item: 'immunity idol' }, { item: 'fake immunity idol' }],
  },
};

it('renders without crashing', () => {
  expect(shallow(<AdvantageIcons {...mockProps} />)).toMatchSnapshot();
});
