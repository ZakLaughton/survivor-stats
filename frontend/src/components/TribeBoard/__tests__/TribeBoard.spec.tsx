import React from 'react';
import { seasonData } from '../../../__fixtures__/seasonData';
import { render } from '@testing-library/react';
import { TribeBoard, TribeBoardProps } from '../TribeBoard';

jest.mock('cloudinary-react')
const defaultProps: TribeBoardProps = {
  activeEpisodeNumber: 3,
  activeSeasonData: seasonData
}

it('renders all subcomponents', () => {
  const { getByTestId, getAllByTestId, container } = render(<TribeBoard {...defaultProps}/>);
  expect(getAllByTestId('tribe')).toHaveLength(3);
  expect(getByTestId('votedOutPanel')).toBeTruthy();
  expect(container).toMatchSnapshot();
});
