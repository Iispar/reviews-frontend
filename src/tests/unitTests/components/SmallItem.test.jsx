import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SmallItem from '../../../components/SmallItem';
import { useTextWidth } from '../../../helpers/componentHelpers';

const mockedUsedNavigate = jest.fn();

// mocks the useNavigate() function.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../../helpers/componentHelpers', () => ({
  useTextWidth: jest.fn(),
}));

beforeEach(() => {
  useTextWidth.mockImplementation(() => '20');
});

describe('SmallItem tests', () => {
  test('smallItem renders', () => {
    const component = render(<SmallItem id={2} item="test item" rating={4.2123} />);

    const container = component.container.querySelector('#smallItem__2');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('smallItem');

    expect(component.getByText('test item')).toBeVisible();
    expect(component.getByText('4.2')).toBeVisible();
  });
  test('long item has hover and custom scrollTime', async () => {
    const component = render(<SmallItem id={2} item="this item has a really long name to test the scroll feature." rating={4.2123} />);

    await waitFor(() => {
      expect(component.getByText('this item has a really long name to test the scroll feature.').className).toBe('smallItem__name__text__hover');
      expect(component.getByText('this item has a really long name to test the scroll feature.')).toHaveStyle('transition: all 0.1111111111111111s linear');
      expect(component.getByText('4.2')).toBeVisible();
    });
  });
  test('navigate works', async () => {
    const component = render(<SmallItem id={2} item="test item" rating={4.2123} />);

    const text = component.getByText('test item');

    await userEvent.click(text);

    expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
    expect(mockedUsedNavigate.mock.calls[0][0]).toBe('/item/2');
  });
});
