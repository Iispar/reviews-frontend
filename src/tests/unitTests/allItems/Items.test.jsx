import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Items from '../../../pages/allItems/Items';
import { resNoNextPage } from '../../mockData/AllItems.json';

jest.mock('../../../components/DropDownSortMenu.jsx');
jest.mock('../../../components/ItemList.jsx');
jest.mock('../../../components/Pagination.jsx');
jest.mock('../../../components/SearchField.jsx');

describe('Items tests', () => {
  describe('items render tests', () => {
    test('Items render with itemList correctly', () => {
      const component = render(<Items id="test" items={resNoNextPage.responseList} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('items');

      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      expect(component.getByRole('button', { name: 'sortOne asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortOne desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo desc' })).toBeVisible();

      expect(component.getByText('Test item number 1 Loaded')).toBeVisible();
      expect(component.getByText('122')).toBeVisible();
      expect(component.getByText('4')).toBeVisible();
      expect(component.getByText('1')).toBeVisible();
      expect(component.getByText('Test item number 2')).toBeVisible();

      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
    });
    test('Items render with no items correctly', () => {
      const component = render(<Items id="test" items={[]} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('items');

      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      expect(component.getByRole('button', { name: 'sortOne asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortOne desc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo asc' })).toBeVisible();
      expect(component.getByRole('button', { name: 'sortTwo desc' })).toBeVisible();

      expect(component.getByText('no items')).toBeVisible();

      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
    });
    test('Items loading (1) renders correctly', () => {
      const component = render(<Items id="test" loading={1} />);

      const load = component.container.querySelector('#loading__beat');
      expect(load).not.toBeNull();
      expect(load).toBeVisible();
    });
    test('Items loading (2) renders correctly', () => {
      const component = render(<Items id="test" items={[]} loading={2} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('items');

      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      const load = component.container.querySelector('#loading');
      expect(load).not.toBeNull();
      expect(load).toBeVisible();
      expect(load.children[0].children.length).toBe(4);

      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
    });
    test('Items loading (3) renders correctly', () => {
      const component = render(<Items id="test" items={[]} loading={3} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('items');

      expect(component.getByPlaceholderText('Search')).toBeVisible();
      expect(component.getByRole('button', { name: 'clear' })).toBeVisible();

      expect(component.getByText('error ocurred, please reload'));

      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
    });
  });
  describe('functions move to children components', () => {
    const loading = [2, 0];
    test.each(loading)('submit and setSearch works', async (state) => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test search');
      });
      const mockChange = jest.fn();
      const component = render(<Items id="test" loading={state} items={[]} onSubmit={mockSubmit} setSearch={mockChange} />);

      await userEvent.type(component.getByPlaceholderText('Search'), 'test search{enter}');

      expect(mockChange.mock.calls).toHaveLength(11);
    });

    test.each(loading)('onClear works', async (state) => {
      const mockClear = jest.fn();
      const component = render(<Items id="test" loading={state} items={[]} clearInput={mockClear} />);

      await userEvent.click(component.getByRole('button', { name: 'clear' }));

      expect(mockClear.mock.calls).toHaveLength(1);
    });

    test.each(loading)('setSearch works', async (state) => {
      const mockSort = jest.fn();
      const component = render(<Items id="test" loading={state} items={[]} setSort={mockSort} />);

      await userEvent.click(component.getByRole('button', { name: 'sortOne asc' }));

      expect(mockSort.mock.calls).toHaveLength(1);
      expect(mockSort.mock.calls[0]).toEqual(['sortOne', 'asc']);
    });
    test.each(loading)('pagination works', async (state) => {
      const mockNext = jest.fn();
      const mockPrev = jest.fn();
      const component = render(<Items id="test" loading={state} items={[]} nextPage={mockNext} prevPage={mockPrev} nextDisabled={false} prevDisabled={false} />);

      await userEvent.click(component.getByRole('button', { name: 'next' }));
      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(mockNext.mock.calls).toHaveLength(1);
      expect(mockPrev.mock.calls).toHaveLength(1);
    });
  });
});
