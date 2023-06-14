import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import $ from 'jquery';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InputField from '../components/InputField';
import LargeInputField from '../components/LargeInputField';
import LargeItem from '../components/LargeItem';
import LargeReview from '../components/LargeReview';
import Pagination from '../components/Pagination';
import SearchField from '../components/SearchField';
import SmallItem from '../components/SmallItem';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('components render and work', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });
  describe('helpers work as intended', () => {
  });
  describe('components render and work', () => {
    test('Footer renders with values and works', () => {
      const { container } = render(<Footer />);
      expect(container).toBeTruthy();
    });
    test('Header renders with values and works', async () => {
      const { container } = render(<Header />);
      expect(container).toBeTruthy();

      const burgerBtn = container.querySelector('#header__hamburger__btn');
      expect(burgerBtn).toBeTruthy();

      // open
      await user.click(burgerBtn);

      const preNavBar = container.querySelector('#navBar');
      expect(preNavBar).toHaveStyle('transform: scaleX(1)');

      // close
      await user.click(burgerBtn);

      const afterNavBar = container.querySelector('#navBar');
      expect(afterNavBar).toHaveStyle('transform: scaleX(0)');
    });
    test('Input field renders and works', async () => {
      const view = render(<InputField id="test" title="test" />);
      const { container } = view;
      expect(container).toBeTruthy();
      const inputField = container.querySelector('#test__container__input');
      expect(inputField).toBeTruthy();

      await user.type(inputField, 'test writing');
      expect(inputField).toHaveValue('test writing');

      const label = $('#test__container__label').text();
      expect(label).toBe('test');

      const error = container.querySelector('#test__container__error');
      expect(error).toBeTruthy();
    });
    test('largeInputField renders', () => {
      const largeInputContainer = render(<LargeInputField title="test" />).container;
      const container = largeInputContainer.querySelector('#largeField');
      const textArea = largeInputContainer.querySelector('#largeField__container__input');
      const error = largeInputContainer.querySelector('#largeField__container__error');
      const label = largeInputContainer.querySelector('#largeField__container__label');

      expect(container).toBeTruthy();
      expect(textArea).toBeTruthy();
      expect(error).toBeTruthy();
      expect(label).toBeTruthy();
    });
    test('largeItem renders', () => {
      const largeItemContainer = render(<LargeItem reviews="200" rating="2.2" item="testItem" />).container;
      const name = largeItemContainer.querySelector('#largeItem__nameReviews__name');
      const reviewsCount = largeItemContainer.querySelector('#largeItem__nameReviews__reviews__count');
      const rating = largeItemContainer.querySelector('#largeItem__rating__rate');

      expect(name).toBeTruthy();
      expect(reviewsCount).toBeTruthy();
      expect(rating).toBeTruthy();
    });

    test('largeReview renders', () => {
      const largeItemContainer = render(<LargeReview rating="2.2" body="testBody" date="testDate" title="testTitle" />).container;
      const title = largeItemContainer.querySelector('#largeReview__info__body__header__title');
      const date = largeItemContainer.querySelector('#largeReview__info__body__header__date');
      const body = largeItemContainer.querySelector('#largeReview__info__body__comment');
      const rating = largeItemContainer.querySelector('#largeReview__info__rating__value');
      const expandBtn = largeItemContainer.querySelector('#largeReview__info__rating__expandBtn__id');

      expect(title).toBeTruthy();
      expect(date).toBeTruthy();
      expect(body).toBeTruthy();
      expect(expandBtn).toBeTruthy();
      expect(rating).toBeTruthy();
    });
    test('pagination renders', () => {
      const pagiantionContainer = render(<Pagination />).container;
      const prev = pagiantionContainer.querySelector('#pagination__prev');
      const next = pagiantionContainer.querySelector('#pagination__next');

      expect(prev).toBeTruthy();
      expect(next).toBeTruthy();
    });
    test('searchField renders', () => {
      const searchFieldContainer = render(<SearchField />).container;

      const input = searchFieldContainer.querySelector('#searchField__input');
      expect(input).toBeTruthy();
    });
    test('smallItem renders', () => {
      const smallItemContainer = render(<SmallItem rating="2.2" item="testItem" />).container;
      const name = smallItemContainer.querySelector('#smallItem__name__text__id');
      const rating = smallItemContainer.querySelector('#smallItem__rating__value__id');

      expect(name).toBeTruthy();
      expect(rating).toBeTruthy();
    });
  });
});
