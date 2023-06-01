import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import LoginForm from '../pages/login/LoginForm';
import InputField from '../components/InputField';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login site works fully', () => {
  test('login form renders', () => {
    const component = render(<LoginForm />);
    const usernameField = component.getByPlaceholderText('username');
    const passwordField = component.getByPlaceholderText('password');
    const loginBtn = component.getByRole('button', { name: 'login' });
    const forgotBtn = component.getByRole('button', { name: 'Forgot password?' });
    const createNewBtn = component.getByRole('button', { name: 'Create new' });

    expect(passwordField).toBeTruthy();
    expect(usernameField).toBeTruthy();
    expect(loginBtn).toBeTruthy();
    expect(forgotBtn).toBeTruthy();
    expect(createNewBtn).toBeTruthy();
    expect(component.queryByText('login')).toBeTruthy();
  });
});
