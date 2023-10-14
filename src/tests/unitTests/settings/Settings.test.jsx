/* eslint-disable import/named */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Settings from '../../../pages/settings/Settings';
import { res } from '../../mockData/Account.json';
import { getAccount } from '../../../services/accountService';
import { UseDeleteAccount, UseUpdateAccount } from '../../../pages/settings/settingsHooks';

jest.mock('../../../pages/settings/Selections');

const getAccountMock = () => Promise.resolve(res);
jest.mock('../../../services/accountService', () => ({
  getAccount: jest.fn(),
}));

const useDeleteMock = jest.fn();
const useUpdateMock = jest.fn();
jest.mock('../../../pages/settings/settingsHooks', () => ({
  UseDeleteAccount: jest.fn(),
  UseUpdateAccount: jest.fn(),
}));

Object.defineProperty(window, 'location', {
  configurable: true,
  value: { reload: jest.fn() },
});

beforeEach(() => {
  jest.clearAllMocks();
  getAccount.mockImplementation(getAccountMock);
  UseUpdateAccount.mockImplementation(
    (accountId, newName, newUsername, newPassword, curRole, newEmail, token) => {
      useUpdateMock(accountId, newName, newUsername, newPassword, curRole, newEmail, token);
    },
  );
  UseDeleteAccount.mockImplementation(useDeleteMock);
  window.localStorage.setItem('token', 'testToken');
  window.localStorage.setItem('accountId', 'testId');
});

describe('Settings tests', () => {
  describe('Render tests', () => {
    test('Succesful render works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        const container = component.container.querySelector('#test');
        expect(container).not.toBeNull();
        expect(container).toBeVisible();
        expect(container.className).toBe('settings');
      });

      expect(component.getByText('Settings')).toBeVisible();
      expect(component.getByText('edit profile delete account')).toBeVisible();
      expect(component.getByPlaceholderText('name')).toBeVisible();
      expect(component.getByPlaceholderText('username')).toBeVisible();
      expect(component.getByPlaceholderText('email')).toBeVisible();
      expect(component.getByPlaceholderText('password')).toBeVisible();
      expect(component.getByPlaceholderText('confirmPassword')).toBeVisible();
      expect(component.getByRole('button', { name: 'delete' })).toBeVisible();
      expect(component.getByRole('button', { name: 'change' })).toBeVisible();
    });
    test('loading render works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.container.querySelector('#loading__beat')).toBeVisible();
      });
    });
    test('failed render works', async () => {
      getAccount.mockImplementation(() => Promise.reject());
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByText('an error occured, please reload')).toBeVisible();
      });
    });
  });
  describe('functions work', () => {
    test('deleteAccount works', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByRole('button', { name: 'delete' })).toBeVisible();
      });

      await userEvent.click(component.getByRole('button', { name: 'delete' }));

      expect(useDeleteMock.mock.calls).toHaveLength(1);
      expect(useDeleteMock.mock.calls[0][0]).toBe('testId');
      expect(useDeleteMock.mock.calls[0][1]).toBe('testToken');

      expect(window.localStorage.getItem('token')).toBe(null);
      expect(window.localStorage.getItem('accountId')).toBe(null);
      expect(window.location.reload).toHaveBeenCalled();
    });
    test('updateAccount works with all values changed', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByPlaceholderText('name')).toBeVisible();
      });

      await userEvent.type(component.getByPlaceholderText('name'), 'new name');
      await userEvent.type(component.getByPlaceholderText('username'), 'new username');
      await userEvent.type(component.getByPlaceholderText('email'), 'new email');
      await userEvent.type(component.getByPlaceholderText('password'), 'new pass');
      await userEvent.click(component.getByRole('button', { name: 'change' }));

      expect(useUpdateMock.mock.calls).toHaveLength(1);
      expect(useUpdateMock.mock.calls[0][0]).toBe('testId');
      expect(useUpdateMock.mock.calls[0][1]).toBe('testnew name');
      expect(useUpdateMock.mock.calls[0][2]).toBe('testUsernew username');
      expect(useUpdateMock.mock.calls[0][3]).toBe('new pass');
      expect(useUpdateMock.mock.calls[0][4]).toBe(1);
      expect(useUpdateMock.mock.calls[0][5]).toBe('testEmailnew email');
      expect(useUpdateMock.mock.calls[0][6]).toBe('testToken');
      expect(window.location.reload).toHaveBeenCalled();
    });
    test('updateAccount works with one value changed', async () => {
      const component = render(<Settings id="test" />);

      await waitFor(() => {
        expect(component.getByPlaceholderText('name')).toBeVisible();
      });

      await userEvent.type(component.getByPlaceholderText('name'), 'new name');
      await userEvent.click(component.getByRole('button', { name: 'change' }));

      expect(useUpdateMock.mock.calls).toHaveLength(1);
      expect(useUpdateMock.mock.calls[0][0]).toBe('testId');
      expect(useUpdateMock.mock.calls[0][1]).toBe('testnew name');
      expect(useUpdateMock.mock.calls[0][2]).toBe('testUser');
      expect(useUpdateMock.mock.calls[0][3]).toBe('none');
      expect(useUpdateMock.mock.calls[0][4]).toBe(1);
      expect(useUpdateMock.mock.calls[0][5]).toBe('testEmail');
      expect(useUpdateMock.mock.calls[0][6]).toBe('testToken');
    });
  });
});
