import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MostPopular from '../pages/home/MostPopular';
import LatestReviews from '../pages/home/LatestReviews';
import HomeStats from '../pages/home/HomeStats';
import HomeChart from '../pages/home/HomeChart';

global.ResizeObserver = require('resize-observer-polyfill');

jest.mock('axios');

describe('home site works fully', () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('test');
    jest.mock('axios');
  });
  test('most popular renders', () => {
    const mostPopularContainer = render(
      <BrowserRouter>
        <MostPopular />
      </BrowserRouter>,
    ).container;

    const header = mostPopularContainer.querySelector('#mostPopular__header');
    const list = mostPopularContainer.querySelector('#mostPopular__list');

    expect(header).toBeTruthy();
    expect(list).toBeTruthy();
  });
  test('latest reviews renders', () => {
    const reviewsContainer = render(
      <BrowserRouter>
        <LatestReviews />
      </BrowserRouter>,
    ).container;

    const header = reviewsContainer.querySelector('#latestReviews__header');
    const list = reviewsContainer.querySelector('#latestReviews__reviews');
    const pagination = reviewsContainer.querySelector('#latestReviews__pagination');

    expect(header).toBeTruthy();
    expect(list).toBeTruthy();
    expect(pagination).toBeTruthy();
  });
  test('stats render', () => {
    const statsContainer = render(<HomeStats />).container;

    const chart = statsContainer.querySelector('#homeStats__ratings__chart');
    const stats = statsContainer.querySelector('#homeStats__allTime');
    const title = statsContainer.querySelector('#homeStats__allTime__title');

    expect(chart).toBeTruthy();
    expect(stats).toBeTruthy();
    expect(title).toBeTruthy();
  });
  test('chart renders', () => {
    const chartContainer = render(<HomeChart />).container;

    const chart = chartContainer.querySelector('#homeChart');
    const selector = chartContainer.querySelector('#homeChart__selector');

    expect(chart).toBeTruthy();
    expect(selector).toBeTruthy();
  });
});
