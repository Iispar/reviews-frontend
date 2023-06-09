import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Item from '../pages/item/Item';
import Title from '../pages/item/Title';
import Words from '../pages/item/Words';
import NewReviewForm from '../pages/item/NewReviewForm';
import NewReview from '../pages/item/NewReview';
import dummyWords from '../data/dummyData/dummyWords.json';
import ItemChart from '../pages/item/ItemChart';

global.ResizeObserver = require('resize-observer-polyfill');

describe('item site works fully', () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(100);
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
  });
  test('page renders with components', () => {
    const itemContainer = render(
      <BrowserRouter>
        <Item visible />
      </BrowserRouter>,
    ).container;

    const title = itemContainer.querySelector('#item__grid__title');
    const reviews = itemContainer.querySelector('#item__grid__reviews');
    const words = itemContainer.querySelector('#item__grid__words');
    const chart = itemContainer.querySelector('#item__grid__chart');

    expect(title).toBeTruthy();
    expect(reviews).toBeTruthy();
    expect(words).toBeTruthy();
    expect(chart).toBeTruthy();
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
  test('form render with components and works', async () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    const mockClick = jest.fn();
    const reviewForm = render(
      <NewReviewForm onSubmit={mockSubmit} onClick={mockClick} />,
    ).container;

    const form = reviewForm.querySelector('#newReviewForm__form');
    const buttons = reviewForm.querySelector('#newReviewForm__buttons');

    expect(form).toBeTruthy();
    expect(buttons).toBeTruthy();

    const submit = reviewForm.querySelector('#newReviewForm__buttons__create');
    const close = reviewForm.querySelector('#newReviewForm__buttons__close');
    await userEvent.click(submit);
    await userEvent.click(close);

    expect(mockClick).toBeCalledTimes(1);
    expect(mockSubmit).toBeCalledTimes(1);
  });

  test('new review btn render with components and words', async () => {
    const mockClick = jest.fn();
    const newContainer = render(<NewReview onClick={mockClick} onSubmit={mockClick} />).container;

    const btn = newContainer.querySelector('#newReview__button');
    expect(btn).toBeTruthy();

    await userEvent.click(btn);
    expect(mockClick).toBeCalledTimes(1);
  });

  test('chart renders', () => {
    const newContainer = render(<ItemChart />).container;

    const chart = newContainer.querySelector('#itemChart');
    const selector = newContainer.querySelector('#itemChart__selector');

    expect(chart).toBeTruthy();
    expect(selector).toBeTruthy();
  });
});
