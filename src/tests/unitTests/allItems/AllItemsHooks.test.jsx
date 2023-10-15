/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseNewItem, UseSearch } from '../../../pages/allItems/allItemsHooks';
import { createNew, getSort, getSearch } from '../../../services/itemService';
import { resNoNextPage } from '../../mockData/AllItems.json';

jest.mock('../../../services/itemService', () => ({
  createNew: jest.fn(),
  getSearch: jest.fn(),
  getSort: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

describe('AllItemHooks tests', () => {
  describe('useNewItem tests', () => {
    test('useNewItem works', async () => {
      const mockNewItem = jest.fn();
      const mockReload = jest.fn();
      const mockLoading = jest.fn();
      createNew.mockImplementation((payload, token) => {
        mockNewItem(payload, token);
        return (Promise.resolve());
      });

      UseNewItem('1', 'test title', '1', 'test token', mockReload, mockLoading);
      // TODO: find a better way to pass the setTimeout.
      await new Promise((res) => { setTimeout(res, 1100); });

      expect(mockNewItem.mock.calls).toHaveLength(1);
      expect(mockNewItem.mock.calls[0][0]).toStrictEqual([{
        account: { id: '1' }, category: { id: '1' }, rating: null, title: 'test title', words: null,
      }]);
      expect(mockNewItem.mock.calls[0][1]).toBe('test token');

      expect(mockReload.mock.calls).toHaveLength(1);

      expect(mockLoading.mock.calls).toHaveLength(2);
      expect(mockLoading.mock.calls[0][0]).toBe(5);
      expect(mockLoading.mock.calls[1][0]).toBe(0);
    });
    test('useNewItem reject works', async () => {
      const mockNewItem = jest.fn();
      const mockReload = jest.fn();
      const mockLoading = jest.fn();
      createNew.mockImplementation((payload, token) => {
        mockNewItem(payload, token);
        return (Promise.reject());
      });

      UseNewItem('1', 'test title', '1', 'test token', mockReload, mockLoading);
      // TODO: find a better way to pass the setTimeout.
      await new Promise((res) => { setTimeout(res, 3100); });

      expect(mockNewItem.mock.calls).toHaveLength(1);
      expect(mockNewItem.mock.calls[0][0]).toStrictEqual([{
        account: { id: '1' }, category: { id: '1' }, rating: null, title: 'test title', words: null,
      }]);
      expect(mockNewItem.mock.calls[0][1]).toBe('test token');

      expect(mockReload.mock.calls).toHaveLength(0);

      expect(mockLoading.mock.calls).toHaveLength(2);
      expect(mockLoading.mock.calls[0][0]).toBe(6);
      expect(mockLoading.mock.calls[1][0]).toBe(0);
    });
  });
  describe('UseSearch tests', () => {
    test('UseSearch with search works', async () => {
      const mockSearch = jest.fn();
      const mockSetItems = jest.fn();
      const mockIsNextPage = jest.fn();
      const mockLoading = jest.fn();
      getSearch.mockImplementation((accountId, search, page, sort, sortDir, token) => {
        mockSearch(accountId, search, page, sort, sortDir, token);
        return (Promise.resolve(resNoNextPage));
      });

      UseSearch('1', 'test search', '2', 'rating', 'asc', 'test token', mockSetItems, mockIsNextPage, mockLoading);

      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][0]).toBe('1');
      expect(mockSearch.mock.calls[0][1]).toBe('test search');
      expect(mockSearch.mock.calls[0][2]).toBe('2');
      expect(mockSearch.mock.calls[0][3]).toBe('rating');
      expect(mockSearch.mock.calls[0][4]).toBe('asc');
      expect(mockSearch.mock.calls[0][5]).toBe('test token');

      await waitFor(() => {
        expect(mockSetItems.mock.calls).toHaveLength(1);
        expect(mockSetItems.mock.calls[0][0]).toBe(resNoNextPage.responseList);

        expect(mockIsNextPage.mock.calls).toHaveLength(1);
        expect(mockIsNextPage.mock.calls[0][0]).toBe(resNoNextPage.nextPage);

        expect(mockLoading.mock.calls).toHaveLength(1);
        expect(mockLoading.mock.calls[0][0]).toBe(0);
      });
    });
    test('UseSearch with search reject works', async () => {
      const mockSearch = jest.fn();
      const mockSetItems = jest.fn();
      const mockIsNextPage = jest.fn();
      const mockLoading = jest.fn();
      getSearch.mockImplementation((accountId, search, page, sort, sortDir, token) => {
        mockSearch(accountId, search, page, sort, sortDir, token);
        return (Promise.reject());
      });

      UseSearch('1', 'test search', '2', 'rating', 'asc', 'test token', mockSetItems, mockIsNextPage, mockLoading);

      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][0]).toBe('1');
      expect(mockSearch.mock.calls[0][1]).toBe('test search');
      expect(mockSearch.mock.calls[0][2]).toBe('2');
      expect(mockSearch.mock.calls[0][3]).toBe('rating');
      expect(mockSearch.mock.calls[0][4]).toBe('asc');
      expect(mockSearch.mock.calls[0][5]).toBe('test token');

      await waitFor(() => {
        expect(mockSetItems.mock.calls).toHaveLength(0);

        expect(mockIsNextPage.mock.calls).toHaveLength(0);

        expect(mockLoading.mock.calls).toHaveLength(1);
        expect(mockLoading.mock.calls[0][0]).toBe(3);
      });
    });
    test('UseSearch with search works', async () => {
      const mockSearch = jest.fn();
      const mockSetItems = jest.fn();
      const mockIsNextPage = jest.fn();
      const mockLoading = jest.fn();
      getSort.mockImplementation((accountId, page, sort, sortDir, token) => {
        mockSearch(accountId, page, sort, sortDir, token);
        return (Promise.resolve(resNoNextPage));
      });

      UseSearch('1', false, '2', 'rating', 'asc', 'test token', mockSetItems, mockIsNextPage, mockLoading);

      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][0]).toBe('1');
      expect(mockSearch.mock.calls[0][1]).toBe('2');
      expect(mockSearch.mock.calls[0][2]).toBe('rating');
      expect(mockSearch.mock.calls[0][3]).toBe('asc');
      expect(mockSearch.mock.calls[0][4]).toBe('test token');

      await waitFor(() => {
        expect(mockSetItems.mock.calls).toHaveLength(1);
        expect(mockSetItems.mock.calls[0][0]).toBe(resNoNextPage.responseList);

        expect(mockIsNextPage.mock.calls).toHaveLength(1);
        expect(mockIsNextPage.mock.calls[0][0]).toBe(resNoNextPage.nextPage);

        expect(mockLoading.mock.calls).toHaveLength(1);
        expect(mockLoading.mock.calls[0][0]).toBe(0);
      });
    });
    test('UseSearch with search reject works', async () => {
      const mockSearch = jest.fn();
      const mockSetItems = jest.fn();
      const mockIsNextPage = jest.fn();
      const mockLoading = jest.fn();
      getSort.mockImplementation((accountId, page, sort, sortDir, token) => {
        mockSearch(accountId, page, sort, sortDir, token);
        return (Promise.reject());
      });

      UseSearch('1', false, '2', 'rating', 'asc', 'test token', mockSetItems, mockIsNextPage, mockLoading);

      expect(mockSearch.mock.calls).toHaveLength(1);
      expect(mockSearch.mock.calls[0][0]).toBe('1');
      expect(mockSearch.mock.calls[0][1]).toBe('2');
      expect(mockSearch.mock.calls[0][2]).toBe('rating');
      expect(mockSearch.mock.calls[0][3]).toBe('asc');
      expect(mockSearch.mock.calls[0][4]).toBe('test token');

      await waitFor(() => {
        expect(mockSetItems.mock.calls).toHaveLength(0);

        expect(mockIsNextPage.mock.calls).toHaveLength(0);

        expect(mockLoading.mock.calls).toHaveLength(1);
        expect(mockLoading.mock.calls[0][0]).toBe(3);
      });
    });
  });
});
