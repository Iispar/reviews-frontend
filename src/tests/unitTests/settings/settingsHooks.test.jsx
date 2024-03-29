/* eslint-disable import/named */
import '@testing-library/jest-dom/extend-expect';
import { UseDeleteAccount, UseUpdateAccount } from '../../../pages/settings/settingsHooks';
import { deleteAccount, updateAccount } from '../../../services/accountService';

const mockDelete = jest.fn();
const mockUpdate = jest.fn();
jest.mock('../../../services/accountService', () => ({
  deleteAccount: jest.fn(),
  updateAccount: jest.fn(),
}));

Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: jest.fn() },
});

beforeEach(() => {
  window.localStorage.setItem('token', 'testToken');
  window.localStorage.setItem('accountId', 'testId');
  deleteAccount.mockImplementation((id, token) => {
    mockDelete(id, token);
    return (Promise.resolve());
  });
  updateAccount.mockImplementation((accountId, name, username, password, role, email, token) => {
    mockUpdate(accountId, name, username, password, role, email, token);
    return (Promise.resolve());
  });
  jest.useRealTimers();
  jest.clearAllMocks();
});
describe('settingsHooks tests', () => {
  test('UseDeleteAccount works', async () => {
    const mockLoading = jest.fn();
    UseDeleteAccount('testId', 'testToken', mockLoading);
    await new Promise((res) => { setTimeout(res, 1100); });

    expect(mockDelete.mock.calls).toHaveLength(1);
    expect(mockDelete.mock.calls[0][0]).toBe('testId');
    expect(mockDelete.mock.calls[0][1]).toBe('testToken');
    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[0][0]).toBe(5);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('UseDeleteAccount reject works', async () => {
    deleteAccount.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    UseDeleteAccount('testId', 'testToken', mockLoading);
    await new Promise((res) => { setTimeout(res, 3100); });

    expect(mockDelete.mock.calls).toHaveLength(0);
    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[0][0]).toBe(6);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('UseUpdateAccount works', async () => {
    const mockLoading = jest.fn();
    UseUpdateAccount('testId', 'testName', 'testUsername', 'testPass', 'testRole', 'testEmail', 'testToken', mockLoading, 'prev');
    await new Promise((res) => { setTimeout(res, 1100); });

    expect(mockUpdate.mock.calls).toHaveLength(1);
    expect(mockUpdate.mock.calls[0][0]).toBe('testId');
    expect(mockUpdate.mock.calls[0][1]).toStrictEqual({
      email: 'testEmail', name: 'testName', password: 'testPass', role: { id: 'testRole' }, username: 'testUsername',
    });
    expect(mockUpdate.mock.calls[0][2]).toBe('testToken');
    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[0][0]).toBe(5);
    expect(mockLoading.mock.calls[1][0]).toBe(0);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('toke')).toBe(null);
  });
  test('UseUpdateAccount works with new Pass', async () => {
    const mockLoading = jest.fn();
    UseUpdateAccount('testId', 'testName', 'testUsername', 'testPass', 'testRole', 'testEmail', 'testToken', mockLoading, 'testUsername');
    await new Promise((res) => { setTimeout(res, 1100); });

    expect(mockUpdate.mock.calls).toHaveLength(1);
    expect(mockUpdate.mock.calls[0][0]).toBe('testId');
    expect(mockUpdate.mock.calls[0][1]).toStrictEqual({
      email: 'testEmail', name: 'testName', password: 'testPass', role: { id: 'testRole' }, username: 'testUsername',
    });
    expect(mockUpdate.mock.calls[0][2]).toBe('testToken');
    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[0][0]).toBe(5);
    expect(mockLoading.mock.calls[1][0]).toBe(0);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem('token')).toBe(null);
  });
  test('UseUpdateAccount with no pass works', async () => {
    const mockLoading = jest.fn();
    UseUpdateAccount('testId', 'testName', 'testUsername', '', 'testRole', 'testEmail', 'testToken', mockLoading, 'testUsername');
    await new Promise((res) => { setTimeout(res, 1100); });

    expect(mockUpdate.mock.calls).toHaveLength(1);
    expect(mockUpdate.mock.calls[0][0]).toBe('testId');
    expect(mockUpdate.mock.calls[0][1]).toStrictEqual({
      email: 'testEmail', name: 'testName', password: 'none', role: { id: 'testRole' }, username: 'testUsername',
    });
    expect(mockUpdate.mock.calls[0][2]).toBe('testToken');
    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[0][0]).toBe(5);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
  test('UseUpdateAccount reject works', async () => {
    updateAccount.mockImplementation(() => Promise.reject());
    const mockLoading = jest.fn();
    UseUpdateAccount('testId', 'testName', 'testUsername', '', 'testRole', 'testEmail', 'testToken', mockLoading);
    await new Promise((res) => { setTimeout(res, 3100); });

    expect(mockUpdate.mock.calls).toHaveLength(0);
    expect(mockLoading.mock.calls).toHaveLength(2);
    expect(mockLoading.mock.calls[0][0]).toBe(6);
    expect(mockLoading.mock.calls[1][0]).toBe(0);
  });
});
