import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/Login';
import LoginForm from '../pages/login/LoginForm';
import CreateAccountForm from '../pages/login/CreateAccountForm';

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
      const pageContainer = render(
        <BrowserRouter>
          <Login visible />
        </BrowserRouter>,
      ).container;
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
      await userEvent.type(username, 'testUser');
      await userEvent.type(password, 'testPass');
      expect(username).toHaveValue('testUser');
      expect(password).toHaveValue('testPass');

      const loginBtn = loginContainer.querySelector('#login__loginForm__inputs__loginBtn');
      await user.click(loginBtn);
      // TODO: confirm input fields go to call?
      // console.log(mockLogin.mock.calls[0][0].target.child[0].value);
      expect(mockLogin).toBeCalledTimes(1);
    });

    test('login forgot password opens form', async () => {
      const loginContainer = render(<LoginForm />).container;
      const div = loginContainer.querySelector('#login__loginForm__inputs__passwordInfo__contact');
      const forgotBtn = loginContainer.querySelector('#login__loginForm__inputs__passwordInfo__forgotPassword');
      expect(div).toHaveStyle('display: block');

      await user.click(forgotBtn);

      expect(div).toHaveStyle('display: flex');
    });

    test('create account form renders with components', async () => {
      const pageContainer = render(
        <BrowserRouter>
          <Login visible />
        </BrowserRouter>,
      ).container;
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

      await userEvent.type(username, 'testUser');
      await userEvent.type(nameField, 'testName');
      await userEvent.type(createEmail, 'testEmail');
      await userEvent.type(createPassword, 'testPass');
      await userEvent.type(createConfirmPassword, 'testPass');

      expect(username).toHaveValue('testUser');
      expect(nameField).toHaveValue('testName');
      expect(createEmail).toHaveValue('testEmail');
      expect(createPassword).toHaveValue('testPass');
      expect(createConfirmPassword).toHaveValue('testPass');

      const loginBtn = createContainer.querySelector('#createNew__createAccountForm__inputs__submit');
      await user.click(loginBtn);
      expect(mockCreate).toBeCalledTimes(1);
    });
  });
});
