import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import $ from 'jquery';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '../pages/login/LoginForm';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login site renders fully', () => {
  test('login form renders', () => {
    const component = render(<LoginForm />);
    const usernameField = component.getByPlaceholderText('username');
    const passwordField = component.getByPlaceholderText('username');
    const loginBtn = component.getByText('login');
    const resetBtn = component.getByText('get new password');
    const createNewBtn = component.getByText('Don\'t have an account?');

    expect(passwordField).toBeTruthy();
    expect(usernameField).toBeTruthy();
    expect(loginBtn).toBeTruthy();
    expect(resetBtn).toBeTruthy();
    expect(createNewBtn).toBeTruthy();
    expect(component.queryByText('login')).toBeTruthy();
  });
});
