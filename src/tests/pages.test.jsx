import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login/Login';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('pages render correctly', () => {
  describe('Login site works fully', () => {
    let container;
    beforeEach(() => {
      container = render(<Login visible />).container;
    });
    test('login form renders with components', () => {
      const header = container.querySelector('#login__loginForm__header');
      const usernameField = container.querySelector('#loginUsername');
      const passwordField = container.querySelector('#loginPassword');
      const loginBtn = container.querySelector('#login__loginForm__inputs__loginBtn');
      const forgotBtn = container.querySelector('#login__loginForm__inputs__passwordInfo__contact__email__resetBtn');
      const createNewBtn = container.querySelector('#login__createAccount__button');

      expect(passwordField).toBeTruthy();
      expect(usernameField).toBeTruthy();
      expect(loginBtn).toBeTruthy();
      expect(forgotBtn).toBeTruthy();
      expect(createNewBtn).toBeTruthy();
      expect(header).toBeTruthy();
    });
    test('create account form renders with components', async () => {
      // const user = userEvent.setup();
      // const createAccountBtn = container.querySelector('#login__createAccount__button');

      const page = container.querySelector('#createNew');
      const header = container.querySelector('#createNew__createAccountForm__header');
      const username = container.querySelector('#createUsername');
      const nameField = container.querySelector('#createName');
      const createEmail = container.querySelector('#createEmail');
      const createPassword = container.querySelector('#createPassword');
      const createConfirmPassword = container.querySelector('#createConfirmPassword');
      const createBtn = container.querySelector('#createNew__createAccountForm__inputs__submit');
      const loginBtn = container.querySelector('#createNew__login__button');

      expect(page).toBeTruthy();
      expect(username).toBeTruthy();
      expect(nameField).toBeTruthy();
      expect(loginBtn).toBeTruthy();
      expect(createEmail).toBeTruthy();
      expect(createPassword).toBeTruthy();
      expect(createConfirmPassword).toBeTruthy();
      expect(header).toBeTruthy();
      expect(createBtn).toBeTruthy();
    });
  });
});
