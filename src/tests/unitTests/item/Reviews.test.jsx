import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Reviews from '../../../pages/item/Reviews';
import { itemSuccess } from '../../mockData/Item.json';

jest.mock('../../../components/SearchField.jsx');
jest.mock('../../../components/DropDownSortMenu.jsx');
jest.mock('../../../components/Pagination.jsx');
jest.mock('../../../components/ReviewsList.jsx');

describe('Reviews tests', () => {
  describe('render tests', () => {
    test('Reviews successful render works', () => {
      const component = render(<Reviews id="test" reviews={itemSuccess.reviews.responseList} />);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('reviews');

      expect(component.getByText('Reviews')).toBeVisible();
      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      expect(component.getByRole('button', { name: 'sortOne asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortOne desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo desc' })).toBeVisible();

      expect(component.getByText(/999/)).toBeVisible();
      expect(component.getByText(/Test title/)).toBeVisible();
      expect(component.getByText(/2015-05-17/)).toBeVisible();
      expect(component.getByText(/997/)).toBeVisible();

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
    });

    test('Reviews no data render works', () => {
      const component = render(<Reviews id="test" reviews={[]} />);

      expect(component.getByText('no reviews'));
    });
    test('Reviews loading (1) render works', () => {
      const component = render(<Reviews id="test" reviews={[]} loading={1} />);

      expect(component.container.querySelector('#loading__beat')).toBeVisible();
    });
    test('Reviews loading (2) render works', () => {
      const component = render(<Reviews id="test" reviews={[]} loading={2} />);

      expect(component.container.querySelector('#loading__ellipsis')).toBeVisible();

      expect(component.getByText('Reviews')).toBeVisible();
      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      expect(component.getByRole('button', { name: 'sortOne asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortOne desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
    });
    test('Reviews loading (3) render works', () => {
      const component = render(<Reviews id="test" reviews={[]} loading={3} />);

      expect(component.getByText('error ocurred, please reload')).toBeVisible();

      expect(component.getByText('Reviews')).toBeVisible();
      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      expect(component.getByRole('button', { name: 'sortOne asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortOne desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
    });
  });
  describe('functions work', () => {
    const states = [0, 2];
    test.each(states)('setSort works', async (state) => {
      const mockSet = jest.fn();
      const component = render(<Reviews id="test" reviews={itemSuccess.reviews.responseList} setSort={mockSet} loading={state} />);

      await userEvent.click(component.getByRole('button', { name: 'sortOne asc' }));

      expect(mockSet.mock.calls).toHaveLength(1);
      expect(mockSet.mock.calls[0][0]).toBe('sortOne');
      expect(mockSet.mock.calls[0][1]).toBe('asc');
    });
    test.each(states)('pagination works', async (state) => {
      const mockNext = jest.fn();
      const mockPrev = jest.fn();
      const component = render(
        <Reviews
          id="test"
          reviews={itemSuccess.reviews.responseList}
          nextPage={mockNext}
          prevPage={mockPrev}
          loading={state}
          prevDisabled={false}
          nextDisabled={false}
        />,
      );

      await userEvent.click(component.getByRole('button', { name: 'next' }));
      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(mockNext.mock.calls).toHaveLength(1);
      expect(mockPrev.mock.calls).toHaveLength(1);
    });
    test.each(states)('onSubmit works', async (state) => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test title');
      });
      const mockChange = jest.fn();
      const component = render(<Reviews id="test" reviews={itemSuccess.reviews.responseList} onSubmit={mockSubmit} setSearch={mockChange} loading={state} />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test title{enter}');

      expect(mockSubmit.mock.calls).toHaveLength(1);
      expect(mockChange.mock.calls).toHaveLength(10);
    });
    test.each(states)('clear works', async (state) => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test title');
      });
      const mockClear = jest.fn();
      const mockChange = jest.fn();
      const component = render(<Reviews id="test" reviews={itemSuccess.reviews.responseList} clearSearch={mockClear} onSubmit={mockSubmit} setSearch={mockChange} loading={state} />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test title');

      await userEvent.click(component.getByRole('button', { name: 'clear' }));

      expect(mockSubmit.mock.calls).toHaveLength(0);
      expect(mockClear.mock.calls).toHaveLength(1);
    });
  });
});
