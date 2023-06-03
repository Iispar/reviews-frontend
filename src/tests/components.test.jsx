import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
  });
});
