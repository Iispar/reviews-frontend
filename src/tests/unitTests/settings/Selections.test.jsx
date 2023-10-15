import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Selections from '../../../pages/settings/Selections';
import { addStyling } from '../../testHelpers';

jest.mock('../../../pages/settings/UserInfo.jsx');
jest.mock('../../../pages/settings/DeleteAccount.jsx');

describe('Selections tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<Selections id="test" />);
      addStyling(component);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('selections');

      expect(component.getByRole('button', { name: 'edit profile' })).toBeVisible();
      expect(component.getByRole('button', { name: 'delete account' })).toBeVisible();

      expect(component.getByPlaceholderText('name')).not.toBeVisible();
      expect(component.getByPlaceholderText('username')).not.toBeVisible();
      expect(component.getByPlaceholderText('email')).not.toBeVisible();
      expect(component.getByPlaceholderText('password')).not.toBeVisible();
      expect(component.getByPlaceholderText('deleteAccount')).not.toBeVisible();

      expect(component.getByText('closeUser')).not.toBeVisible();
      expect(component.getByText('closeDelete')).not.toBeVisible();
    });
    test('default values works', () => {
      const component = render(<Selections id="test" name="test name" username="test username" email="test email" />);

      expect(component.getByPlaceholderText('name')).toHaveValue('test name');
      expect(component.getByPlaceholderText('username')).toHaveValue('test username');
      expect(component.getByPlaceholderText('email')).toHaveValue('test email');
      expect(component.getByPlaceholderText('password')).toHaveValue('');
    });
  });
  describe('functions work', () => {
    test('update account works', async () => {
      const mockUpdate = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[1].value).toBe('new name');
      });
      const component = render(<Selections id="test" updateAccount={(e) => mockUpdate(e)} />);

      await userEvent.type(component.getByPlaceholderText('name'), 'new name{enter}');

      expect(mockUpdate.mock.calls).toHaveLength(1);
    });
    test('delete account works', async () => {
      const mockDelete = jest.fn((e) => {
        e.preventDefault();
      });
      const component = render(<Selections id="test" deleteAccount={(e) => mockDelete(e)} />);

      await userEvent.type(component.getByPlaceholderText('deleteAccount'), 'del{enter}');

      expect(mockDelete.mock.calls).toHaveLength(1);
    });
    test('setters work', async () => {
      const mockSetName = jest.fn();
      const mockSetUser = jest.fn();
      const mockSetEmail = jest.fn();
      const mockSetPass = jest.fn();
      const component = render(<Selections id="test" setName={mockSetName} setUsername={mockSetUser} setEmail={mockSetEmail} setPassword={mockSetPass} />);

      await userEvent.type(component.getByPlaceholderText('name'), 'test');
      await userEvent.type(component.getByPlaceholderText('username'), 'test');
      await userEvent.type(component.getByPlaceholderText('email'), 'test');
      await userEvent.type(component.getByPlaceholderText('password'), 'test');

      expect(mockSetEmail.mock.calls).toHaveLength(4);
      expect(mockSetName.mock.calls).toHaveLength(4);
      expect(mockSetUser.mock.calls).toHaveLength(4);
      expect(mockSetPass.mock.calls).toHaveLength(4);
    });
    test('change view works', async () => {
      const component = render(<Selections id="test" />);
      addStyling(component);

      expect(component.getByPlaceholderText('name')).not.toBeVisible();
      expect(component.getByPlaceholderText('deleteAccount')).not.toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'edit profile' }));

      expect(component.getByPlaceholderText('name')).toBeVisible();
      expect(component.getByPlaceholderText('deleteAccount')).not.toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'delete account' }));

      expect(component.getByPlaceholderText('name')).not.toBeVisible();
      expect(component.getByPlaceholderText('deleteAccount')).toBeVisible();

      await userEvent.click(component.getByRole('button', { name: 'closeDelete' }));
      expect(component.getByPlaceholderText('name')).not.toBeVisible();
      expect(component.getByPlaceholderText('deleteAccount')).not.toBeVisible();
    });
  });
});
