import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { UseLogin, UseCreateAccount } from '../../../pages/login/loginHooks';

const loginMock = () => ({ token: 'testToken', accountId: 1 });
const createMock = () => ({ token: 'testToken', accountId: 1 });
jest.mock('../../../services/authService', () => ({
  login: loginMock,
  createAccount: createMock,
}));

afterEach(() => {
  window.localStorage.clear();
});

describe('loginHooks tests', () => {
  test('UseLogin works', async () => {
    const token = await UseLogin('testUser', 'testPass');

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('testToken');
      expect(window.localStorage.getItem('accountId')).toBe('1');
      expect(token).toBe('testToken');
    });
  });
  test('UseCreateAccount works', async () => {
    const token = await UseCreateAccount('testUser', 'testName', 'testEmail', 'testPass', '1');

    await waitFor(() => {
      expect(window.localStorage.getItem('token')).toBe('testToken');
      expect(window.localStorage.getItem('accountId')).toBe('1');
      expect(token).toBe('testToken');
    });
  });
});
