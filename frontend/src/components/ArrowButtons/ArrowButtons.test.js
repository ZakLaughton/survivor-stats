/* eslint-env jest */
import React from 'react';
import ArrowButtons from './ArrowButtons';

it('renders without crashing', () => {
  expect(<ArrowButtons />).toMatchSnapshot();
});
