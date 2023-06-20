import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';

global.ResizeObserver = require('resize-observer-polyfill');

describe('home site works fully', () => {
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
});
