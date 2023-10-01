import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import LoginForm from '../../../pages/login/LoginForm';
import CreateAccountForm from '../../../pages/login/CreateAccountForm';

const mockedUsedNavigate = jest.fn();
// mocks the useNavigate() function.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../../../pages/login/loginHooks', () => ({
  UseLogin: jest.fn(),
  UseCreateAccount: jest.fn(),
}));

jest.mock('../../../pages/login/CreateAccountForm', () => () => (
  <div className="createNew" id="createNew" />
));

describe('LoginForm tests', () => {
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

    expect(component.getByRole('button', { name: 'Forgot password?' })).toBeVisible();
    expect(component.getByRole('button', { name: 'login' })).toBeVisible();
    expect(component.getByRole('button', { name: 'Create new' })).toBeVisible();
  });
  test('LoginForm with error renders', () => {
    const component = render(<LoginForm id="test" errorMessage="test error" />);
    addStyling(component);

    expect(component.getByText('test error')).toBeVisible();
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
