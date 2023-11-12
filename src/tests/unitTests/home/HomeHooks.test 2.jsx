/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseGetReviewsForAccount } from '../../../pages/home/homeHooks';
import { getReviewsForAccount } from '../../../services/reviewsService';
import { homeWithNextPage } from '../../mockData/Home.json';

jest.mock('../../../services/reviewsService', () => ({
  getReviewsForAccount: jest.fn(),
}));

describe('HomeHooks tests', () => {
  describe('UseGetReviewsForAccount tests', () => {
    test('works when success', async () => {
      const mockSet = jest.fn();
      const mockNextPage = jest.fn();
      const mockLoading = jest.fn();
      const mockCall = jest.fn();
      getReviewsForAccount.mockImplementation((accountId, page, token) => {
        mockCall(accountId, page, token);
        return (Promise.resolve(homeWithNextPage.latestReviews));
      });

      UseGetReviewsForAccount('1', 2, 'testToken', mockSet, mockNextPage, mockLoading);

      await waitFor(() => {
        expect(mockCall.mock.calls).toHaveLength(1);
        expect(mockCall.mock.calls[0][0]).toStrictEqual('1');
        expect(mockCall.mock.calls[0][1]).toBe(2);
        expect(mockCall.mock.calls[0][2]).toBe('testToken');

        expect(mockSet.mock.calls).toHaveLength(1);
        expect(mockSet.mock.calls[0][0]).toBe(homeWithNextPage.latestReviews.responseList);

        expect(mockNextPage.mock.calls).toHaveLength(1);
        expect(mockNextPage.mock.calls[0][0]).toBe(homeWithNextPage.latestReviews.nextPage);

        expect(mockLoading.mock.calls).toHaveLength(1);
        expect(mockLoading.mock.calls[0][0]).toBe(0);
      });
    });
    test('works when failure', async () => {
      const mockSet = jest.fn();
      const mockNextPage = jest.fn();
      const mockLoading = jest.fn();
      getReviewsForAccount.mockImplementation(() => (Promise.reject()));

      UseGetReviewsForAccount('1', 2, 'testToken', mockSet, mockNextPage, mockLoading);

      await waitFor(() => {
        expect(mockSet.mock.calls).toHaveLength(0);
        expect(mockNextPage.mock.calls).toHaveLength(0);
        expect(mockLoading.mock.calls).toHaveLength(1);
        expect(mockLoading.mock.calls[0][0]).toBe(3);
      });
    });
  });
});
