/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render, waitFor, fireEvent, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import mockAxios from 'jest-mock-axios';
import Login from '../pages/login/Login';
import { findWithSpan, addStyling } from './testHelpers';
import { UseLogin, UseCreateAccount } from '../pages/login/loginHooks';
import LoginForm from '../pages/login/LoginForm';
import CreateAccountForm from '../pages/login/CreateAccountForm';

const mockedUsedNavigate = jest.fn();
// mocks the useNavigate() function.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../pages/login/loginHooks', () => ({
  UseLogin: jest.fn(),
  UseCreateAccount: jest.fn(),
}));

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
  jest.clearAllMocks();
  jest.useRealTimers();
});

jest.mock('../pages/login/LoginForm');
jest.mock('../pages/login/CreateAccountForm');

// the actual components for all tests with no mocking.
beforeEach(() => {
  LoginForm.mockImplementation(jest.requireActual('../pages/login/LoginForm').default);
  CreateAccountForm.mockImplementation(jest.requireActual('../pages/login/CreateAccountForm').default);
});

describe('Login / create site tests', () => {
  describe('Login tests', () => {
    beforeEach(() => {
      LoginForm.mockImplementation(({ errorMessage, onSubmit }) => (
        <div>
          <div className="error" id="error">
            {errorMessage}
          </div>
          <form onSubmit={(e) => onSubmit(e)} id="login">
            <input placeholder="loginUsername" />
            <input placeholder="loginPassword" />
            <button type="submit"> login </button>
          </form>
        </div>
      ));
      CreateAccountForm.mockImplementation(({ error, onSubmit }) => (
        <div>
          <div className="error">
            {error}
          </div>
          <form onSubmit={(e) => onSubmit(e)} id="create">
            <input placeholder="create username" />
            <input placeholder="create name" />
            <input placeholder="create email" />
            <input placeholder="create password" />
            <input placeholder="create confirmPassword" />
            <select id="select">
              <option value="1"> Seller </option>
            </select>
            <button type="submit"> create </button>
          </form>
        </div>
      ));
    });
    test('Login page renders', () => {
      const component = render(
        <BrowserRouter>
          <Login id="test" />
        </BrowserRouter>,
      );
      addStyling(component);
      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('loginGrid');
    });
    test('handleLogin works', async () => {
      const mockedUseLogin = jest.fn();
      UseLogin.mockImplementation((username, password) => mockedUseLogin(username, password));
      const component = render(
        <BrowserRouter>
          <Login id="test" />
        </BrowserRouter>,
      );
      addStyling(component);

      const button = component.getByText('login');
      const username = component.getByPlaceholderText('loginUsername');
      const password = component.getByPlaceholderText('loginPassword');

      await userEvent.type(username, 'testing username');
      await userEvent.type(password, 'testing password');

      await userEvent.click(button);

      expect(mockedUseLogin.mock.calls).toHaveLength(1);
      expect(mockedUseLogin.mock.calls[0][0]).toBe('testing username');
      expect(mockedUseLogin.mock.calls[0][1]).toBe('testing password');
      expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
      expect(mockedUsedNavigate.mock.calls[0][0]).toBe('/home');
    });
    test('handleLogin forbidden works', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      UseLogin.mockImplementation(() => {
        const error = new Error();
        error.response = { status: 403 };
        throw error;
      });
      const component = render(
        <BrowserRouter>
          <Login id="test" />
        </BrowserRouter>,
      );
      addStyling(component);

      const button = component.getByText('login');
      const username = component.getByPlaceholderText('loginUsername');
      const password = component.getByPlaceholderText('loginPassword');

      await user.type(username, 'testing username');
      await user.type(password, 'testing password');

      await user.click(button);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
      expect(component.getAllByText('Incorrect username or password.')).toHaveLength(2);

      act(() => { jest.advanceTimersByTime(2200); });

      expect(component.queryByText('Incorrect username or password.')).not.toBeInTheDocument();
    });
    test('handleLogin error works', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      UseLogin.mockImplementation(() => {
        const error = new Error();
        error.response = { status: 505 };
        throw error;
      });
      const component = render(
        <BrowserRouter>
          <Login id="test" />
        </BrowserRouter>,
      );
      addStyling(component);

      const button = component.getByText('login');
      const username = component.getByPlaceholderText('loginUsername');
      const password = component.getByPlaceholderText('loginPassword');

      await user.type(username, 'testing username');
      await user.type(password, 'testing password');

      await user.click(button);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
      expect(component.getAllByText('an error occurred')).toHaveLength(2);

      act(() => { jest.advanceTimersByTime(2200); });

      expect(component.queryByText('an error occurred')).not.toBeInTheDocument();
    });
    test('handleCreate works', async () => {
      const mockedUseCreate = jest.fn();
      UseCreateAccount.mockImplementation((
        username,
        name,
        email,
        password,
        select,
      ) => mockedUseCreate(username, name, email, password, select));

      const component = render(
        <BrowserRouter>
          <Login id="test" />
        </BrowserRouter>,
      );
      addStyling(component);

      const button = component.getByText('create');
      const username = component.getByPlaceholderText('create username');
      const name = component.getByPlaceholderText('create name');
      const email = component.getByPlaceholderText('create email');
      const password = component.getByPlaceholderText('create password');
      const confirm = component.getByPlaceholderText('create confirmPassword');
      const select = component.container.querySelector('#select');

      await userEvent.type(username, 'testing username');
      await userEvent.type(name, 'testing name');
      await userEvent.type(email, 'testing email');
      await userEvent.type(password, 'testing password');
      await userEvent.type(confirm, 'testing confirm');
      await userEvent.selectOptions(select, '1');

      await userEvent.click(button);

      expect(mockedUseCreate.mock.calls).toHaveLength(1);
      expect(mockedUseCreate.mock.calls[0][0]).toBe('testing username');
      expect(mockedUseCreate.mock.calls[0][1]).toBe('testing name');
      expect(mockedUseCreate.mock.calls[0][2]).toBe('testing email');
      expect(mockedUseCreate.mock.calls[0][3]).toBe('testing password');
      expect(mockedUseCreate.mock.calls[0][4]).toBe('1');
      expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
      expect(mockedUsedNavigate.mock.calls[0][0]).toBe('/home');
    });
    test('handleCreation error works', async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      UseCreateAccount.mockImplementation(() => { throw new Error(); });
      const component = render(
        <BrowserRouter>
          <Login id="test" />
        </BrowserRouter>,
      );
      addStyling(component);

      const button = component.getByText('create');
      const username = component.getByPlaceholderText('create username');
      const name = component.getByPlaceholderText('create name');
      const email = component.getByPlaceholderText('create email');
      const password = component.getByPlaceholderText('create password');
      const confirm = component.getByPlaceholderText('create confirmPassword');
      const select = component.container.querySelector('#select');

      await user.type(username, 'testing username');
      await user.type(name, 'testing name');
      await user.type(email, 'testing email');
      await user.type(password, 'testing password');
      await user.type(confirm, 'testing confirm');
      await user.selectOptions(select, '1');

      await user.click(button);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
      expect(component.getAllByText('an error occurred')).toHaveLength(2);

      act(() => { jest.advanceTimersByTime(2200); });

      expect(component.queryByText('an error occurred')).not.toBeInTheDocument();
    });
  });
  describe('LoginForm tests', () => {
    beforeEach(() => {
      CreateAccountForm.mockImplementation(() => (
        <div className="createNew" id="createNew" />
      ));
    });
    test('LoginForm Renders', () => {
      const component = render(<LoginForm id="test" />);
      addStyling(component);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('login');

      const error = component.container.querySelector('#test__loginForm__error');

      expect(error).not.toBeNull();
      expect(error).not.toBeVisible();

      expect(component.getByText('Login')).toBeVisible();
      expect(component.getByText('Not availabe automatically yet... Just contact me at my email if you want to reset your password. Or just create a new account.')).not.toBeVisible();
      expect(component.getByText('Don\'t have an account?')).toBeVisible();

      expect(component.getByLabelText('username')).toBeVisible();
      expect(component.getByLabelText('password')).toBeVisible();

      expect(component.getByRole('button', { name: 'Forgot password?' }));
      expect(component.getByRole('button', { name: 'login' }));
      expect(component.getByRole('button', { name: 'Create new' }));
    });
    test('LoginForm with error renders', () => {
      const component = render(<LoginForm id="test" errorMessage="test error" />);
      addStyling(component);

      expect(component.getByText('test error'));
    });
    test('LoginForm submit works', async () => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test username');
        expect(e.target.elements[1].value).toBe('test password');
      });
      const component = render(<LoginForm id="test" onSubmit={mockSubmit} />);
      addStyling(component);

      const username = component.getByLabelText('username');
      const password = component.getByLabelText('password');

      await userEvent.type(username, 'test username');
      await userEvent.type(password, 'test password');

      expect(username).toHaveValue('test username');
      expect(password).toHaveValue('test password');

      await userEvent.click(component.getByRole('button', { name: 'login' }));

      expect(mockSubmit.mock.calls).toHaveLength(1);
    });
    test('LoginForm show contact works', async () => {
      const component = render(<LoginForm id="test" />);
      addStyling(component);

      const text = 'Not availabe automatically yet... Just contact me at my email if you want to reset your password. Or just create a new account.';

      expect(component.getByText(text)).not.toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'Forgot password?' }));

      expect(component.getByText(text)).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'Forgot password?' }));

      expect(component.getByText(text)).not.toBeVisible();
    });
    test('LoginForm switch view works', async () => {
      const component = render(
        <div>
          <LoginForm id="test" />
          <CreateAccountForm />
        </div>,
      );
      addStyling(component);

      const username = component.getByLabelText('username');
      await userEvent.type(username, 'test username');
      expect(username).toHaveValue('test username');

      const loginForm = component.container.querySelector('#test');
      const createForm = component.container.querySelector('#createNew');

      expect(loginForm).not.toBeNull();
      expect(loginForm).toBeVisible();

      expect(createForm).not.toBeNull();
      expect(createForm).not.toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'Create new' }));

      expect(loginForm).not.toBeVisible();
      expect(createForm).toBeVisible();
      expect(username).toHaveValue('');
    });
  });
});
