import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import $ from 'jquery';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InputField from '../components/InputField';

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
  });
});
