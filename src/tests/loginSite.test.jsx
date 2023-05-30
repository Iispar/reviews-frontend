import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { setupJestCanvasMock } from 'jest-canvas-mock';
import LoginForm from '../pages/login/LoginForm';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));
setupJestCanvasMock();

describe('Login site works', () => {
  test('login form renders', () => {
    const component = render(<LoginForm />);
    expect(component.container).toHaveTextContent('LOGIN');
  });
});
