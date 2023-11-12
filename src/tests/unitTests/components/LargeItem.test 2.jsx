import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LargeItem from '../../../components/LargeItem';
import { findWithSpan } from '../../testHelpers';

const mockedUsedNavigate = jest.fn();

// mocks the useNavigate() function.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('LargeItem tests', () => {
  test('LargeItem renders', () => {
    const component = render(<LargeItem id={2} reviews="20" rating={4.2} item="test item" />);

    const container = component.container.querySelector('#largeItem__2');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('largeItem');

    expect(component.getByText('test item')).toBeVisible();
    expect(component.getByText('4.2')).toBeVisible();
    expect(component.getByText((content, node) => findWithSpan(node, '20reviews'))).toBeVisible();
  });
  test('clicking works', async () => {
    const component = render(<LargeItem id={4} reviews="20" rating={4.2} item="test item" />);
    const name = component.getByText('test item');

    await userEvent.click(name);

    expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
    expect(mockedUsedNavigate.mock.calls[0][0]).toBe('/item/4');
  });
});
