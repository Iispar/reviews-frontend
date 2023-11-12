import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LatestReviews from '../../../pages/home/LatestReviews';
import { homeWithNextPage } from '../../mockData/Home.json';

jest.mock('../../../components/ReviewsList');
jest.mock('../../../components/Pagination');

describe('LatestReviews tests', () => {
  describe('render tests', () => {
    test('LatestReviews renders', () => {
      const component = render(<LatestReviews id="test" reviews={homeWithNextPage.latestReviews.responseList} />);
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('latestReviews');

      expect(component.getByText('Latest reviews')).toBeVisible();

      expect(component.getByText(/This product was easy to set up, works every time I use it, and does exactly what I expected it to do./)).toBeVisible();
      expect(component.getByText(/211/)).toBeVisible();
      expect(component.getByText(/210/)).toBeVisible();
      expect(component.getByText(/Love it!/)).toBeVisible();
      expect(component.getByText(/2012-05-22/)).toBeVisible();
      expect(component.getByText(/212/)).toBeVisible();

      expect(component.getByRole('button', { name: 'next' })).toBeVisible();
      expect(component.getByRole('button', { name: 'previous' })).toBeVisible();
    });
    test('LatestReviews renders with empty items', () => {
      const component = render(<LatestReviews id="test" reviews={[]} />);
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('latestReviews');

      expect(component.getByText('Latest reviews')).toBeVisible();

      expect(component.getByText('no reviews')).toBeVisible();

      expect(component.queryByRole('button', { name: 'next' })).not.toBeInTheDocument();
      expect(component.queryByRole('button', { name: 'previous' })).not.toBeInTheDocument();
    });

    test('LatestReviews renders with loading (1) items', () => {
      const component = render(<LatestReviews id="test" loading={1} reviews={homeWithNextPage.latestReviews.responseList} />);
      const container = component.container.querySelector('#test');
      expect(container).toBeNull();

      const skeletonLoad = component.container.querySelector('#skeletonLoad');
      expect(skeletonLoad).not.toBeNull();
      expect(skeletonLoad).toBeVisible();
    });
    test('LatestReviews renders with loading (2) items', () => {
      const component = render(<LatestReviews id="test" loading={2} reviews={[]} />);
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('latestReviews');

      expect(component.getByText('Latest reviews')).toBeVisible();

      const loadingBar = component.container.querySelector('#loading__ellipsis');

      expect(loadingBar).not.toBeNull();
      expect(loadingBar).toBeVisible();

      expect(loadingBar.children).toHaveLength(4);
    });
    test('LatestReviews renders with loading (3) items', () => {
      const component = render(<LatestReviews id="test" loading={3} reviews={[]} />);
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('latestReviews');

      expect(component.getByText('error ocurred, please reload')).toBeVisible();
    });
  });
  describe('function calls work', () => {
    const load = [0, 2];
    test.each(load)('next page works', async (state) => {
      const nextMock = jest.fn();
      const component = render(<LatestReviews id="test" loading={state} nextPage={nextMock} reviews={homeWithNextPage.latestReviews.responseList} />);

      const next = component.getByRole('button', { name: 'next' });

      await userEvent.click(next);

      expect(nextMock.mock.calls).toHaveLength(1);
    });
    test.each(load)('prev page works', async (state) => {
      const prevPage = jest.fn();
      const component = render(<LatestReviews id="test" loading={state} prevPage={prevPage} reviews={homeWithNextPage.latestReviews.responseList} />);

      const prev = component.getByRole('button', { name: 'previous' });

      await userEvent.click(prev);

      expect(prevPage.mock.calls).toHaveLength(1);
    });
  });
});
