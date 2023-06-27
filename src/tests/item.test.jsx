import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Item from '../pages/item/Item';
import Title from '../pages/item/Title';
import Words from '../pages/item/Words';
import NewReviewForm from '../pages/item/NewReviewForm';
import NewReview from '../pages/item/NewReview';
import dummyWords from '../data/dummyData/dummyWords.json';

global.ResizeObserver = require('resize-observer-polyfill');

describe('item site works fully', () => {
  test('page renders with components', () => {
    const itemContainer = render(
      <BrowserRouter>
        <Item visible />
      </BrowserRouter>,
    ).container;

    const header = itemContainer.querySelector('#item__grid__header');
    const title = itemContainer.querySelector('#item__grid__title');
    const reviews = itemContainer.querySelector('#item__grid__reviews');
    const words = itemContainer.querySelector('#item__grid__words');
    const chart = itemContainer.querySelector('#item__grid__chart');
    const footer = itemContainer.querySelector('#item__grid__footer');

    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
    expect(reviews).toBeTruthy();
    expect(words).toBeTruthy();
    expect(chart).toBeTruthy();
    expect(footer).toBeTruthy();
  });
  test('title renders correctly with components', () => {
    const titleContainer = render(<Title name="test" desc="test desc" reviewsCount="20" ratingValue="4.2" posReviews="12" negReviews="8" />).container;

    const name = titleContainer.querySelector('#itemTitle__info__name');
    const desc = titleContainer.querySelector('#itemTitle__info__desc');
    const reviews = titleContainer.querySelector('#itemTitle__data__reviews');
    const rating = titleContainer.querySelector('#itemTitle__data__rating');
    const positive = titleContainer.querySelector('#itemTitle__data__positive');
    const negative = titleContainer.querySelector('#itemTitle__data__negative');

    expect(name).toBeTruthy();
    expect(desc).toBeTruthy();
    expect(reviews).toBeTruthy();
    expect(rating).toBeTruthy();
    expect(positive).toBeTruthy();
    expect(negative).toBeTruthy();
  });
  test('words render with components', () => {
    const wordsContainter = render(<Words words={dummyWords.words} />).container;

    const title = wordsContainter.querySelector('#words__title');
    const pos = wordsContainter.querySelector('#words__positive');
    const neg = wordsContainter.querySelector('#words__negative');

    expect(title).toBeTruthy();
    expect(pos).toBeTruthy();
    expect(neg).toBeTruthy();
  });
  test('form render with components and works', () => {
    const reviewForm = render(<NewReviewForm />).container;

    const form = reviewForm.querySelector('#newReviewForm__form');
    const buttons = reviewForm.querySelector('#newReviewForm__buttons');

    expect(form).toBeTruthy();
    expect(buttons).toBeTruthy();

    // mocks !
  });

  test('new review btn render with components and words', () => {
    const newContainer = render(<NewReview />).container;

    const btn = newContainer.querySelector('#newReview');

    expect(btn).toBeTruthy();

    // mocks !
  });
});
