import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
} from '@testing-library/react';
import $ from 'jquery';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import LoginForm from '../../../pages/login/LoginForm';
import CreateAccountForm from '../../../pages/login/CreateAccountForm';

jest.mock('../../../components/InputField');

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

jest.mock('../../../pages/login/LoginForm', () => () => (
  <div className="login" id="login" />
));

describe('createAccountForm tests', () => {
  test('CreateAccountForm renders', () => {
    const component = render(<CreateAccountForm id="test" />);
    addStyling(component);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).not.toBeVisible(); // this is invisible at the start.
    expect(container.className).toBe('createNew');

    const error = component.container.querySelector('#test__createAccountForm__error');

    expect(error).not.toBeNull();
    expect(error).not.toBeVisible();

    expect(component.getByText('Create account')).toBeDefined();
    expect(component.getByText('Password must be minimum of 8 characters with:- uppercase letter- number- special character')).not.toBeVisible();
    expect(component.getByText('role:')).toBeDefined();
    expect(component.getByText('Already have an account?')).toBeDefined();

    expect(component.getByLabelText('username')).toBeDefined();
    expect(component.getByLabelText('first name')).toBeDefined();
    expect(component.getByLabelText('email')).toBeDefined();
    expect(component.getByLabelText('password')).toBeDefined();
    expect(component.getByLabelText('confirm password')).toBeDefined();
    const select = component.container.querySelector('#test__createAccountForm__inputs__form__roleLabel__selection');
    expect(select).not.toBeNull();
    expect(select).toBeDefined();

    expect(component.findByRole('button', { name: 'submit' }));
    expect(component.findByRole('button', { name: 'Login.' }));
  });
  test('CreateAccountForm visibility is correct', () => {
    const component = render(<CreateAccountForm id="test" />);
    addStyling(component);
    $('#test').css('display', 'flex');

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();

    const error = component.container.querySelector('#test__createAccountForm__error');

    expect(error).not.toBeNull();

    expect(component.getByText('Create account')).toBeVisible();
    expect(component.getByText('Password must be minimum of 8 characters with:- uppercase letter- number- special character')).not.toBeVisible();
    expect(component.getByText('role:')).toBeVisible();
    expect(component.getByText('Already have an account?')).toBeVisible();

    expect(component.getByLabelText('username')).toBeVisible();
    expect(component.getByLabelText('first name')).toBeVisible();
    expect(component.getByLabelText('email')).toBeVisible();
    expect(component.getByLabelText('password')).toBeVisible();
    expect(component.getByLabelText('confirm password')).toBeVisible();
    const select = component.container.querySelector('#test__createAccountForm__inputs__form__roleLabel__selection');
    expect(select).not.toBeNull();
    expect(select).toBeVisible();

    expect(component.getByRole('button', { name: 'submit' })).toBeVisible();
    expect(component.getByRole('button', { name: 'Login.' })).toBeVisible();
  });
  test('CreateAccountForm with error renders', () => {
    const component = render(<CreateAccountForm id="test" error="test error" />);
    addStyling(component);
    $('#test').css('display', 'flex');

    expect(component.getByText('test error')).toBeVisible();
  });

  test('CreateAccountForm switch view works', async () => {
    const component = render(
      <div>
        <CreateAccountForm id="test" />
        <LoginForm />
      </div>,
    );
    addStyling(component);
    $('#test').css('display', 'flex');
    $('#login').css('display', 'none');

    const username = component.getByLabelText('username');
    await userEvent.type(username, 'test username');
    expect(username).toHaveValue('test username');

    const createForm = component.container.querySelector('#test');
    const loginForm = component.container.querySelector('#login');

    expect(createForm).not.toBeNull();
    expect(createForm).toBeVisible();

    expect(loginForm).not.toBeNull();
    expect(loginForm).not.toBeVisible();

    await userEvent.click(component.getByRole('button', { name: 'Login.' }));

    expect(createForm).not.toBeVisible();
    expect(loginForm).toBeVisible();
    expect(username).toHaveValue('');
  });
  test('CreateAccountForm submit works', async () => {
    const mockSubmit = jest.fn((e) => {
      e.preventDefault();
      expect(e.target.elements[0].value).toBe('testUser');
      expect(e.target.elements[1].value).toBe('test name');
      expect(e.target.elements[2].value).toBe('test email');
      expect(e.target.elements[3].value).toBe('testPass123!');
      expect(e.target.elements[4].value).toBe('testPass123!');
      expect(e.target.elements[5].value).toBe('1');
    });

    const component = render(<CreateAccountForm id="test" onSubmit={mockSubmit} />);
    addStyling(component);
    $('#test').css('display', 'flex');

    const username = component.getByLabelText('username');
    const email = component.getByLabelText('email');
    const name = component.getByLabelText('first name');
    const password = component.getByLabelText('password');
    const confirm = component.getByLabelText('confirm password');

    await userEvent.type(username, 'testUser');
    await userEvent.type(email, 'test email');
    await userEvent.type(name, 'test name');
    await userEvent.type(password, 'testPass123!');
    await userEvent.type(confirm, 'testPass123!');
    const select = component.container.querySelector('#test__createAccountForm__inputs__form__roleLabel__selection');
    await userEvent.selectOptions(select, '1');

    expect(username).toHaveValue('testUser');
    expect(email).toHaveValue('test email');
    expect(name).toHaveValue('test name');
    expect(password).toHaveValue('testPass123!');
    expect(confirm).toHaveValue('testPass123!');
    expect(select).toHaveValue('1');

    await userEvent.click(component.getByRole('button', { name: 'submit' }));
    expect(mockSubmit.mock.calls).toHaveLength(1);
  });
  test('CreateAccountForm password error works', async () => {
    const component = render(<CreateAccountForm id="test" />);
    addStyling(component);
    $('#test').css('display', 'flex');

    expect(component.container.querySelector('#test__createAccountForm__inputs__form__password__message')).not.toBeNull();
    expect(component.container.querySelector('#test__createAccountForm__inputs__form__password__message')).not.toBeVisible();

    const password = component.getByLabelText('password');
    await userEvent.type(password, 'test');

    expect(component.container.querySelector('#test__createAccountForm__inputs__form__password__message')).toBeVisible();
  });
  test('CreateAccountForm confirm password error works', async () => {
    const component = render(<CreateAccountForm id="test" />);
    addStyling(component);
    $('#test').css('display', 'flex');

    expect(component.getByText('passwords don\'t match')).not.toBeVisible();

    const password = component.getByLabelText('password');
    const confirm = component.getByLabelText('confirm password');
    await userEvent.type(password, 'testPass123!');
    await userEvent.type(confirm, 'test');

    expect(component.getByText('passwords don\'t match')).toBeVisible();

    await userEvent.type(confirm, 'Pass123!');

    expect(confirm).toHaveValue('testPass123!');
    expect(component.getByText('passwords don\'t match')).not.toBeVisible();
  });
});
