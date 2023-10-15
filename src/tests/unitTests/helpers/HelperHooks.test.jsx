import '@testing-library/jest-dom/extend-expect';
import { UseGetLocalStorage } from '../../../helpers/helperHooks';

describe('helperHooks tests', () => {
  test('UseGetLocalStorage works', () => {
    window.localStorage.setItem('token', 'test token');
    window.localStorage.setItem('accountId', 'test id');

    expect(UseGetLocalStorage()).toStrictEqual({ accountId: 'test id', token: 'test token' });
  });
});
