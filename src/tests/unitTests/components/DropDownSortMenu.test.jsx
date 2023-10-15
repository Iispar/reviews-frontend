import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import DropDownSortMenu from '../../../components/DropDownSortMenu';
import { useTextWidth } from '../../../helpers/componentHelpers';

jest.mock('../../../helpers/componentHelpers', () => ({
  useTextWidth: jest.fn(),
}));

beforeEach(() => {
  useTextWidth.mockImplementation(() => '20px');
});

describe('dropDownSortMenu tests', () => {
  test('dropDownSorMenu renders', () => {
    const mockSet = jest.fn();
    const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
    addStyling(component);

    const container = component.container.querySelector('#test');
    const openButton = component.getByText('sort');

    const allButtons = component.getAllByRole('button');
    const sortOneAsc = component.container.querySelector('#test__reviews__asc');

    expect(container).toBeVisible();
    expect(container.className).toBe('dropDownSortMenu');
    expect(openButton).toBeVisible();
    expect(allButtons).toHaveLength(2);

    expect(sortOneAsc).not.toBeNull();
    expect(sortOneAsc).not.toBeVisible();
  });
  test('dropDown toggle works', async () => {
    const mockSet = jest.fn();
    const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
    addStyling(component);

    const openButton = component.getByText('sort');

    const allButtons = component.getAllByRole('button');
    const sortOneAsc = component.container.querySelector('#test__reviews__asc');

    expect(allButtons).toHaveLength(2);
    expect(openButton).toBeVisible();

    await userEvent.click(openButton);

    const openButtons = component.getAllByRole('button');

    expect(openButtons).toHaveLength(5);
    expect(sortOneAsc).toBeVisible();

    const closeButton = component.container.querySelector('#test__arrow');
    await userEvent.click(closeButton);

    const closedButtons = component.getAllByRole('button');

    expect(closedButtons).toHaveLength(2);
    expect(sortOneAsc).not.toBeVisible();
    expect(component.getByText('sort')).toBeVisible();
  });

  const sortSelections = [
    ['#test__reviews__asc', '160px'],
    ['#test__reviews__desc', '160px'],
    ['#test__rating__asc', '160px'],
    ['#test__rating__desc', '160px'],
  ];
  test.each(sortSelections)('dropDown sort selection works', async (id, width) => {
    const mockSet = jest.fn();
    const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
    addStyling(component);

    const container = component.container.querySelector('#test');
    const sort = component.container.querySelector(id);
    expect(sort).not.toBeNull();
    expect(sort).not.toBeVisible();

    const openButton = component.getByText('sort');
    await userEvent.click(openButton);

    expect(sort).toBeVisible();

    await userEvent.click(sort);

    await waitFor(() => {
      expect(sort).toBeVisible();
      expect(mockSet.mock.calls).toHaveLength(1);
      expect(container).toHaveStyle(`width: ${width}`);
    });
  });
  test('if open and selected closing keeps the selected sort displayed', async () => {
    const mockSet = jest.fn();
    const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
    addStyling(component);

    const container = component.container.querySelector('#test');
    const sortOneAsc = component.container.querySelector('#test__reviews__asc');
    const sortTwoAsc = component.container.querySelector('#test__rating__asc');
    expect(container).toBeVisible();
    expect(sortOneAsc).not.toBeNull();
    expect(sortOneAsc).not.toBeVisible();
    expect(sortTwoAsc).not.toBeNull();
    expect(sortTwoAsc).not.toBeVisible();

    const openButton = component.getByText('sort');
    await userEvent.click(openButton);

    expect(sortOneAsc).toBeVisible();
    expect(sortTwoAsc).toBeVisible();

    await userEvent.click(sortOneAsc);

    expect(sortOneAsc).toBeVisible();
    expect(sortTwoAsc).not.toBeVisible();

    const arrow = component.container.querySelector('#test__arrow');
    await userEvent.click(arrow);

    expect(sortOneAsc).toBeVisible();
    expect(sortTwoAsc).toBeVisible();

    await userEvent.click(arrow);

    expect(sortOneAsc).toBeVisible();
    expect(sortTwoAsc).not.toBeVisible();
  });
});
