import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/login/Login';
import LoginForm from '../pages/login/LoginForm';
import CreateAccountForm from '../pages/login/CreateAccountForm';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('pages render correctly', () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Login / create site works fully', () => {
    /**
     * Renders the login page and checks that every component exists there.
     */
    test('login form renders with components', () => {
      const pageContainer = render(<Login visible />).container;
      const header = pageContainer.querySelector('#login__loginForm__header');
      const usernameField = pageContainer.querySelector('#loginUsername');
      const passwordField = pageContainer.querySelector('#loginPassword');
      const loginBtn = pageContainer.querySelector('#login__loginForm__inputs__loginBtn');
      const forgotBtn = pageContainer.querySelector('#login__loginForm__inputs__passwordInfo__contact__email__resetBtn');
      const createNewBtn = pageContainer.querySelector('#login__createAccount__button');

      expect(passwordField).toBeTruthy();
      expect(usernameField).toBeTruthy();
      expect(loginBtn).toBeTruthy();
      expect(forgotBtn).toBeTruthy();
      expect(createNewBtn).toBeTruthy();
      expect(header).toBeTruthy();
    });

    /**
     * Renders the login page and fills the input values, checks they work. Then
     * clicks the login button and checks that the button calls a mock
     */
    test('login form buttons call', async () => {
      const mockLogin = jest.fn((e) => e.preventDefault());
      const loginContainer = render(<LoginForm onSubmit={mockLogin} />).container;

      const username = loginContainer.querySelector('#loginUsername__container__input');
      const password = loginContainer.querySelector('#loginPassword__container__input');
      await userEvent.type(username, 'x');
      await userEvent.type(password, 'y');
      expect(username).toHaveValue('x');
      expect(password).toHaveValue('y');

      const loginBtn = loginContainer.querySelector('#login__loginForm__inputs__loginBtn');
      await user.click(loginBtn);
      expect(mockLogin).toBeCalledTimes(1);
    });

    test('create account form renders with components', async () => {
      const pageContainer = render(<Login visible />).container;
      // const user = userEvent.setup();
      // const createAccountBtn = container.querySelector('#login__createAccount__button');

      const page = pageContainer.querySelector('#createNew');
      const header = pageContainer.querySelector('#createNew__createAccountForm__header');
      const username = pageContainer.querySelector('#createUsername');
      const nameField = pageContainer.querySelector('#createName');
      const createEmail = pageContainer.querySelector('#createEmail');
      const createPassword = pageContainer.querySelector('#createPassword');
      const createConfirmPassword = pageContainer.querySelector('#createConfirmPassword');
      const createBtn = pageContainer.querySelector('#createNew__createAccountForm__inputs__submit');
      const loginBtn = pageContainer.querySelector('#createNew__login__button');

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

    /**
     * Renders the create account page and fills the input values, checks they work. Then
     * clicks the createe button and checks that the button calls a mock
     */
    test('create form buttons call', async () => {
      const mockCreate = jest.fn((e) => e.preventDefault());
      const createContainer = render(<CreateAccountForm onSubmit={mockCreate} />).container;

      const username = createContainer.querySelector('#createUsername__container__input');
      const nameField = createContainer.querySelector('#createName__container__input');
      const createEmail = createContainer.querySelector('#createEmail__container__input');
      const createPassword = createContainer.querySelector('#createPassword__container__input');
      const createConfirmPassword = createContainer.querySelector('#createConfirmPassword__container__input');

      await userEvent.type(username, 'x');
      await userEvent.type(nameField, 'y');
      await userEvent.type(createEmail, 'x');
      await userEvent.type(createPassword, 'y');
      await userEvent.type(createConfirmPassword, 'x');

      expect(username).toHaveValue('x');
      expect(nameField).toHaveValue('y');
      expect(createEmail).toHaveValue('x');
      expect(createPassword).toHaveValue('y');
      expect(createConfirmPassword).toHaveValue('x');

      const loginBtn = createContainer.querySelector('#createNew__createAccountForm__inputs__submit');
      await user.click(loginBtn);
      expect(mockCreate).toBeCalledTimes(1);
    });
  });
});
