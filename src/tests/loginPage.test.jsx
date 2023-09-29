/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import mockAxios from 'jest-mock-axios';
import { useState } from 'react';
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
});

jest.mock('../pages/login/LoginForm', () => jest.fn());
jest.mock('../pages/login/CreateAccountForm', () => jest.fn());

describe('Login / create site tests', () => {
  describe('Login tests', () => {
    beforeEach(() => {
      LoginForm.mockImplementation(({ errorMessage, onSubmit }) => (
        <div>
          <div className="error">
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

      await userEvent.type(username, 'testing username');
      await userEvent.type(password, 'testing password');

      await userEvent.click(button);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
      expect(component.getAllByText('Incorrect username or password.')).toHaveLength(2);
    });
    test('handleLogin error works', async () => {
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

      await userEvent.type(username, 'testing username');
      await userEvent.type(password, 'testing password');

      await userEvent.click(button);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
      expect(component.getAllByText('an error ocurred')).toHaveLength(2);
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

      await userEvent.type(username, 'testing username');
      await userEvent.type(name, 'testing name');
      await userEvent.type(email, 'testing email');
      await userEvent.type(password, 'testing password');
      await userEvent.type(confirm, 'testing confirm');
      await userEvent.selectOptions(select, '1');

      await userEvent.click(button);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(0);
      expect(component.getAllByText('an error ocurred')).toHaveLength(2);
    });
  });
});
