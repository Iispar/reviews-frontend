import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import MostPopular from '../pages/home/MostPopular';
import dummyItems from '../data/dummyData/dummyItems.json';
import LatestReviews from '../pages/home/LatestReviews';
import dummyReviews from '../data/dummyData/dummyReviews.json';
import HomeStats from '../pages/home/HomeStats';
import HomeChart from '../pages/home/HomeChart';

global.ResizeObserver = require('resize-observer-polyfill');

describe('home site works fully', () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
  });
  test('page renders with components', () => {
    const pageContainer = render(
      <BrowserRouter>
        <Home visible />
      </BrowserRouter>,
    ).container;
    const header = pageContainer.querySelector('#home__grid__header');
    const title = pageContainer.querySelector('#home__grid__title__text');
    const reviews = pageContainer.querySelector('#home__grid__latestReviews');
    const items = pageContainer.querySelector('#home__grid__mostPopular');
    const chart = pageContainer.querySelector('#home__grid__homeChart');
    const stats = pageContainer.querySelector('#home__grid__homeChange');
    const footer = pageContainer.querySelector('#home__grid__footer');

    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
    expect(items).toBeTruthy();
    expect(reviews).toBeTruthy();
    expect(chart).toBeTruthy();
    expect(stats).toBeTruthy();
    expect(footer).toBeTruthy();
  });
  test('most popular renders', () => {
    const mostPopularContainer = render(
      <BrowserRouter>
        <MostPopular items={dummyItems.items} />
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
        <LatestReviews reviews={dummyReviews.reviews} />
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
