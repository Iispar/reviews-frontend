/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { resNoNextPage, resNextPage } from '../../mockData/AllItems.json';
import AllItems from '../../../pages/allItems/AllItems';
import { getAll } from '../../../services/itemService';
import { UseNewItem, UseSearch } from '../../../pages/allItems/allItemsHooks';

const getAllNoNextPageMock = () => Promise.resolve(resNoNextPage);
const getAllNextPageMock = () => Promise.resolve(resNextPage);
jest.mock('../../../services/itemService', () => ({
  getAll: jest.fn(),
}));

jest.mock('../../../components/ActionWait');

const useSearchMock = jest.fn();
const useNewItemMock = jest.fn();
jest.mock('../../../pages/allItems/allItemsHooks', () => ({
  UseSearch: jest.fn(),
  UseNewItem: jest.fn(),
}));

jest.mock('../../../pages/allItems/Items');
jest.mock('../../../pages/allItems/ItemInput');

beforeEach(() => {
  getAll.mockImplementation(getAllNextPageMock);
  jest.clearAllMocks();
  UseSearch.mockImplementation((
    accountId,
    search,
    page,
    sort,
    sortDir,
    token,
    setItems,
    setIsNextPage,
    setLoading,
  ) => {
    setItems(resNoNextPage.responseList);
    setIsNextPage(resNoNextPage.nextPage);
    setLoading(0);
    useSearchMock(
      accountId,
      search,
      page,
      sort,
      sortDir,
      token,
    );
  });
  UseNewItem.mockImplementation((accountId, title, category, token, reloadItems, setLoading) => {
    setLoading(0);
    reloadItems();
    useNewItemMock(accountId, title, category);
  });
});

describe('AllItems tests', () => {
  describe('render tests', () => {
    test('AllItems with items render correctly', async () => {
      getAll.mockImplementation(getAllNoNextPageMock);
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.container.querySelector('#test__paginationLoad')).toBeNull();
        expect(component.container.querySelector('#test__headerLoad')).toBeNull();
        expect(component.container.querySelector('#test__actionWait')).toBeNull();
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('allItems');

        expect(component.getByText('All your items'));

        const items = component.container.querySelector('#test__grid__items');
        expect(items).not.toBeNull();
        expect(items).toBeVisible();

        const input = component.container.querySelector('#test__grid__fileInput');
        expect(input).not.toBeNull();
        expect(input).toBeVisible();

        expect(component.getByRole('button', { name: 'next' })).toBeDisabled();
      });
    });
    test('AllItems initial loading render correctly', async () => {
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        const headerLoad = component.container.querySelector('#test__headerLoad');
        const paginationLoad = component.container.querySelector('#test__paginationLoad');

        expect(headerLoad).not.toBeNull();
        expect(headerLoad).toBeVisible();
        expect(paginationLoad).not.toBeNull();
        expect(paginationLoad).toBeVisible();
      });
    });
  });
  describe('pagination tests', () => {
    test('pagination works', async () => {
      UseSearch.mockImplementation((
        accountId,
        search,
        page,
        sort,
        sortDir,
        token,
        setItems,
        setIsNextPage,
        setLoading,
      ) => {
        if (page === 2) {
          setItems(resNoNextPage.responseList);
          setIsNextPage(resNoNextPage.nextPage);
          setLoading(0);
        } else {
          setItems(resNextPage.responseList);
          setIsNextPage(resNextPage.nextPage);
          setLoading(0);
        }
        useSearchMock(
          accountId,
          search,
          page,
          sort,
          sortDir,
          token,
          setItems,
          setIsNextPage,
          setLoading,
        );
      });
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      await userEvent.click(component.getByRole('button', { name: 'next' }));

      expect(useSearchMock.mock.calls).toHaveLength(1);
      expect(useSearchMock.mock.calls[0][2]).toBe(1);

      expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();

      await userEvent.click(component.getByRole('button', { name: 'next' }));
      expect(useSearchMock.mock.calls).toHaveLength(2);
      expect(useSearchMock.mock.calls[1][2]).toBe(2);

      expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
      expect(component.getByRole('button', { name: 'next' })).toBeDisabled();

      expect(component.getByRole('button', { name: 'previous' })).not.toBeDisabled();
      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(component.getByRole('button', { name: 'previous' })).not.toBeDisabled();

      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(useSearchMock.mock.calls).toHaveLength(4);
      expect(useSearchMock.mock.calls[3][2]).toBe(0);

      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
      expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();
      expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);

      await userEvent.click(component.getByRole('button', { name: 'next' }));
      expect(component.getByRole('button', { name: 'previous' })).not.toBeDisabled();
    });
    test('pagination load works', async () => {
      UseSearch.mockImplementation(jest.fn());
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      expect(component.container.querySelector('#loading')).toBeNull();

      await userEvent.click(component.getByRole('button', { name: 'next' }));

      expect(component.container.querySelector('#loading')).not.toBeNull();
    });
  });
  describe('search tests', () => {
    test('search works', async () => {
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      const input = component.container.querySelector('#mockSearch__input');

      await userEvent.type(input, 'test search');

      expect(input).toHaveValue('test search');

      await userEvent.click(component.getByRole('button', { name: 'search' }));

      expect(useSearchMock.mock.calls).toHaveLength(1);
      expect(useSearchMock.mock.calls[0][1]).toBe('test search');
      expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
    });
    test('search clear works', async () => {
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      const input = component.container.querySelector('#mockSearch__input');

      await userEvent.type(input, 'test search');

      expect(input).toHaveValue('test search');

      await userEvent.click(component.getByRole('button', { name: 'clear' }));

      expect(useSearchMock.mock.calls).toHaveLength(1);
      expect(useSearchMock.mock.calls[0][1]).toBe('');
      expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
      expect(input).toHaveValue('');
    });
    test('search load works', async () => {
      UseSearch.mockImplementation(jest.fn());
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      const input = component.container.querySelector('#mockSearch__input');
      await userEvent.type(input, 'test search');

      expect(component.container.querySelector('#loading')).toBeNull();

      await userEvent.click(component.getByRole('button', { name: 'search' }));

      expect(component.container.querySelector('#loading')).not.toBeNull();
    });
  });
  describe('sort tests', () => {
    const sorts = [
      'sort1 asc',
      'sort1 desc',
      'sort2 asc',
      'sort2 desc',
    ];
    test.each(sorts)('only sort works', async (sort) => {
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );
      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      const sortBtn = component.getByRole('button', { name: sort });

      await userEvent.click(sortBtn);

      expect(useSearchMock.mock.calls).toHaveLength(1);
      expect(useSearchMock.mock.calls[0][3]).toBe(sort.split(' ')[0]);
      expect(useSearchMock.mock.calls[0][4]).toBe(sort.split(' ')[1]);
      expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
    });
    test.each(sorts)('sort with search works', async (sort) => {
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );
      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });
      const input = component.container.querySelector('#mockSearch__input');
      await userEvent.type(input, 'test search');

      const sortBtn = component.getByRole('button', { name: sort });

      await userEvent.click(sortBtn);

      expect(useSearchMock.mock.calls).toHaveLength(1);
      expect(useSearchMock.mock.calls[0][1]).toBe('test search');
      expect(useSearchMock.mock.calls[0][3]).toBe(sort.split(' ')[0]);
      expect(useSearchMock.mock.calls[0][4]).toBe(sort.split(' ')[1]);
      expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
    });
    test('sort loading', async () => {
      UseSearch.mockImplementation(jest.fn());
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );
      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      expect(component.container.querySelector('#loading')).toBeNull();

      await userEvent.click(component.getByRole('button', { name: 'sort1 asc' }));

      expect(component.container.querySelector('#loading')).not.toBeNull();
    });
  });
  describe('creation tests', () => {
    test('creation submit when no next page works', async () => {
      getAll.mockImplementation(getAllNoNextPageMock);
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
        expect(getAll.mock.calls).toHaveLength(1);
      });

      const input = component.container.querySelector('#mockNameInput');
      const select = component.container.querySelector('#mockSelect');

      await userEvent.type(input, 'test title');
      await userEvent.selectOptions(select, '1');

      expect(input).toHaveValue('test title');

      await userEvent.click(component.getByRole('button', { name: 'submit' }));

      expect(useNewItemMock.mock.calls).toHaveLength(1);
      expect(useNewItemMock.mock.calls[0][1]).toBe('test title');
      expect(useNewItemMock.mock.calls[0][2]).toBe('1');

      expect(getAll.mock.calls).toHaveLength(2);
    });
    test('creation submit when next page works', async () => {
      getAll.mockImplementationOnce(getAllNoNextPageMock).mockImplementation(getAllNextPageMock);
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(2);
        expect(getAll.mock.calls).toHaveLength(1);
      });

      const input = component.container.querySelector('#mockNameInput');
      const select = component.container.querySelector('#mockSelect');

      await userEvent.type(input, 'test title');
      await userEvent.selectOptions(select, '1');

      expect(input).toHaveValue('test title');

      await userEvent.click(component.getByRole('button', { name: 'submit' }));

      expect(useNewItemMock.mock.calls).toHaveLength(1);
      expect(useNewItemMock.mock.calls[0][1]).toBe('test title');
      expect(useNewItemMock.mock.calls[0][2]).toBe('1');

      expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      expect(getAll.mock.calls).toHaveLength(2);
      expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();
    });
    const states = [
      [4, 'loading'], [5, 'success'], [6, 'fail'],
    ];
    test.each(states)('creation loading works', async (state, result) => {
      UseNewItem.mockImplementation(
        (accountId, title, category, token, reloadItems, setLoading) => setLoading(state),
      );
      const component = render(
        <BrowserRouter>
          <AllItems id="test" />
        </BrowserRouter>,
      );

      await waitFor(() => {
        expect(component.getByText('All your items')).toBeVisible();
        expect(component.container.querySelector('#mockItems__items').children.length).toBe(5);
      });

      const input = component.container.querySelector('#mockNameInput');
      const select = component.container.querySelector('#mockSelect');

      await userEvent.type(input, 'test title');
      await userEvent.selectOptions(select, '1');

      expect(input).toHaveValue('test title');

      expect(component.container.querySelector('#test__actionWait')).toBeNull();

      await userEvent.click(component.getByRole('button', { name: 'submit' }));

      expect(component.container.querySelector('#test__actionWait')).not.toBeNull();
      expect(component.getByText(result));
    });
  });
});
