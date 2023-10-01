import '@testing-library/jest-dom/extend-expect';
import { useGetLocalStorage } from '../../../helpers/helperHooks';

describe('helperHooks tests', () => {
  test('useGetLocalStorage works', () => {
    window.localStorage.setItem('token', 'test token');
    window.localStorage.setItem('accountId', 'test id');

    expect(useGetLocalStorage()).toStrictEqual({ accountId: 'test id', token: 'test token' });
  });
});
