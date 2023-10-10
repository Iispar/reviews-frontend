/* eslint-disable import/named */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../../../pages/home/Home';
import { getHome } from '../../../services/pagesService';
import { homeWithNextPage, homeWithNoNextPage } from '../../mockData/Home.json';
import { UseGetReviewsForAccount } from '../../../pages/home/homeHooks';

jest.mock('../../../pages/home/HomeChart');
jest.mock('../../../pages/home/HomeStats');
jest.mock('../../../pages/home/LatestReviews');
jest.mock('../../../pages/home/MostPopular');

const getHomeMockWithNext = () => Promise.resolve(homeWithNextPage);
const getHomeMockWithNoNext = () => Promise.resolve(homeWithNoNextPage);
jest.mock('../../../services/pagesService', () => ({
  getHome: jest.fn(),
}));

const useGetReviewsForAccountMock = jest.fn();
jest.mock('../../../pages/home/homeHooks', () => ({
  UseGetReviewsForAccount: jest.fn(),
}));

beforeEach(() => {
  getHome.mockImplementation(getHomeMockWithNext);
  window.localStorage.setItem('token', 'logged user');
  window.localStorage.setItem('accountId', '2');

  UseGetReviewsForAccount.mockImplementation((
    accountId,
    page,
    token,
    setLatestReviews,
    setIsNextPage,
    setLoading,
  ) => {
    if (page === 1) {
      setLatestReviews(homeWithNoNextPage.latestReviews.responseList);
      setIsNextPage(homeWithNoNextPage.latestReviews.nextPage);
      setLoading(0);
    } else {
      setLatestReviews(homeWithNextPage.latestReviews.responseList);
      setIsNextPage(homeWithNextPage.latestReviews.nextPage);
      setLoading(0);
    }
    useGetReviewsForAccountMock(
      accountId,
      page,
      token,
    );
  });
});

describe('home tests', () => {
  describe('render tests', () => {
    test('succesful render withNextPage works', async () => {
      const component = render(<Home id="test" />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');

        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('home');
        expect(component.getByText('Latest reviews')).toBeVisible();
        expect(component.getByText(/This product was easy to set up, works every time I use it, and does exactly what I expected it to do./)).toBeVisible();
        expect(component.getByText(/211/)).toBeVisible();
        expect(component.getByText(/212/)).toBeVisible();
        expect(component.getByText(/2012-05-22/)).toBeVisible();
        expect(component.container.querySelector('#testReviews__list').children.length).toBe(4);

        expect(component.getByText(/Welcome admin/)).toBeVisible();

        expect(component.getByText(/popular items/)).toBeVisible();
        expect(component.getByText(/Polar FT4 Heart Rate Monitor/)).toBeVisible();
        expect(component.getByText(/213/)).toBeVisible();
        expect(component.getByText(/214/)).toBeVisible();
        expect(component.container.querySelector('#testItems__list').children.length).toBe(5);

        expect(component.getByRole('button', { name: 'week' })).toBeVisible();
        expect(component.getByRole('button', { name: 'month' })).toBeVisible();

        expect(component.getByText('distribution of ratings')).toBeVisible();
        expect(component.getByText('6items')).toBeVisible();
        expect(component.getByText('151reviews')).toBeVisible();
        expect(component.getByText('1.4avg rating')).toBeVisible();
        expect(component.getByText(/alltime/)).toBeVisible();

        expect(component.getByText('data:')).toBeVisible();
        expect(component.getByText(/23count/)).toBeVisible();
        expect(component.getByText(/testTimetime/)).toBeVisible();
        expect(component.getByText(/12rating/)).toBeVisible();

        expect(component.getByText('barChart:')).toBeVisible();
        expect(component.getByText(/29count/)).toBeVisible();
        expect(component.getByText(/333rating/)).toBeVisible();

        expect(component.getByRole('button', { name: 'next' })).not.toBeDisabled();

        expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
      });
    });
    test('succesful render with NoNextPage works', async () => {
      getHome.mockImplementation(getHomeMockWithNoNext);
      const component = render(<Home id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'next' })).toBeDisabled();
      });
    });
    test('initial load works', async () => {
      const component = render(<Home id="test" />);

      await waitFor(() => {
        const skeletonLoad = component.container.querySelector('#test__skeletonLoad');
        expect(skeletonLoad).not.toBeNull();
        expect(skeletonLoad).toBeVisible();
      });
    });
    test('load error works', async () => {
      getHome.mockImplementation(() => (Promise.reject()));
      const component = render(<Home id="test" />);

      await waitFor(() => {
        expect(component.getByText('error while fetching data, please try again')).toBeVisible();
      });
    });
  });
  describe('pagination tests', () => {
    test('pagination works', async () => {
      const component = render(<Home id="test" />);
      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(component.getByText(/Love it/));
      });

      const next = component.getByRole('button', { name: 'next' });
      expect(next).not.toBeDisabled();

      await userEvent.click(component.getByRole('button', { name: 'next' }));

      expect(useGetReviewsForAccountMock.mock.calls).toHaveLength(1);
      expect(useGetReviewsForAccountMock.mock.calls[0][1]).toBe(1);
      expect(component.getByText(/Loaded/)).toBeVisible();
      expect(component.getByRole('button', { name: 'next' })).toBeDisabled();

      await userEvent.click(component.getByRole('button', { name: 'previous' }));

      expect(useGetReviewsForAccountMock.mock.calls).toHaveLength(2);
      expect(useGetReviewsForAccountMock.mock.calls[1][1]).toBe(0);
      expect(component.queryByText(/Loaded/)).not.toBeInTheDocument();
      expect(component.getByRole('button', { name: 'previous' })).toBeDisabled();
    });
  });
});
