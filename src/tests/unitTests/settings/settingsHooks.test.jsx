import '@testing-library/jest-dom/extend-expect';
import { UseDeleteAccount, UseUpdateAccount } from '../../../pages/settings/settingsHooks';

const mockDelete = jest.fn();
const mockUpdate = jest.fn();
jest.mock('../../../services/accountService', () => ({
  deleteAccount: (id, token) => mockDelete(id, token),
  updateAccount:
  (accountId, name, username, password, role, email, token) => {
    mockUpdate(accountId, name, username, password, role, email, token);
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});
describe('settingsHooks tests', () => {
  test('UseDeleteAccount works', () => {
    UseDeleteAccount('testId', 'testToken');

    expect(mockDelete.mock.calls).toHaveLength(1);
    expect(mockDelete.mock.calls[0][0]).toBe('testId');
    expect(mockDelete.mock.calls[0][1]).toBe('testToken');
  });
  test('UseUpdateAccount works', () => {
    UseUpdateAccount('testId', 'testName', 'testUsername', 'testPass', 'testRole', 'testEmail', 'testToken');

    expect(mockUpdate.mock.calls).toHaveLength(1);
    expect(mockUpdate.mock.calls[0][0]).toBe('testId');
    expect(mockUpdate.mock.calls[0][1]).toStrictEqual({
      email: 'testEmail', name: 'testName', password: 'testPass', role: { id: 'testRole' }, username: 'testUsername',
    });
    expect(mockUpdate.mock.calls[0][2]).toBe('testToken');
  });
  test('UseUpdateAccount with no pass works', () => {
    UseUpdateAccount('testId', 'testName', 'testUsername', '', 'testRole', 'testEmail', 'testToken');

    expect(mockUpdate.mock.calls).toHaveLength(1);
    expect(mockUpdate.mock.calls[0][0]).toBe('testId');
    expect(mockUpdate.mock.calls[0][1]).toStrictEqual({
      email: 'testEmail', name: 'testName', password: 'none', role: { id: 'testRole' }, username: 'testUsername',
    });
    expect(mockUpdate.mock.calls[0][2]).toBe('testToken');
  });
});
