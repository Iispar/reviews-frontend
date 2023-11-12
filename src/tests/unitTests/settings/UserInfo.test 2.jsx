import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserInfo from '../../../pages/settings/UserInfo';

jest.mock('../../../components/SettingsInputField.jsx');

describe('UserInfo tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<UserInfo id="test" setNewPassword={jest.fn()} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('userInfo');

      expect(component.container.querySelector('#test__header__closeButton')).toBeVisible();

      expect(component.getByText('name')).toBeVisible();
      expect(component.container.querySelector('#settingsName__form__input')).toBeVisible();
      expect(component.container.querySelector('#settingsName__form__undefined')).toBeVisible();

      expect(component.getByText('username')).toBeVisible();
      expect(component.container.querySelector('#settingsUsername__form__input')).toBeVisible();
      expect(component.container.querySelector('#settingsUsername__form__undefined')).toBeVisible();

      expect(component.getByText('email')).toBeVisible();
      expect(component.container.querySelector('#settingsEmail__form__input')).toBeVisible();
      expect(component.container.querySelector('#settingsEmail__form__undefined')).toBeVisible();

      expect(component.getByText('password')).toBeVisible();
      expect(component.getByPlaceholderText('******')).toBeVisible();

      expect(component.getByText('confirm')).not.toBeVisible();
    });
    test('default values render works', () => {
      const component = render(<UserInfo
        id="test"
        setNewPassword={jest.fn()}
        currUsername="test user"
        currEmail="test email"
        currName="test name"
      />);

      expect(component.container.querySelector('#settingsName__form__input')).toHaveValue('test name');
      expect(component.container.querySelector('#settingsUsername__form__input')).toHaveValue('test user');
      expect(component.container.querySelector('#settingsEmail__form__input')).toHaveValue('test email');
    });
  });
  describe('functions work', () => {
    test('setters work', async () => {
      const mockSetPass = jest.fn();
      const mockSetName = jest.fn();
      const mockSetEmail = jest.fn();
      const mockSetUser = jest.fn();
      const component = render(<UserInfo
        id="test"
        setNewPassword={mockSetPass}
        setName={mockSetName}
        setEmail={mockSetEmail}
        setUsername={mockSetUser}
      />);

      await userEvent.type(component.container.querySelector('#settingsName__form__input'), 'test');
      await userEvent.type(component.container.querySelector('#settingsUsername__form__input'), 'test');
      await userEvent.type(component.container.querySelector('#settingsEmail__form__input'), 'test');
      await userEvent.type(component.getByPlaceholderText('******'), 'test');
      await userEvent.type(component.container.querySelector('#settingsConfirm__form__input'), 'test');

      expect(mockSetPass.mock.calls).toHaveLength(2);
      expect(mockSetName.mock.calls).toHaveLength(4);
      expect(mockSetEmail.mock.calls).toHaveLength(4);
      expect(mockSetUser.mock.calls).toHaveLength(4);
    });

    const inputs = ['Name', 'Username', 'Email'];
    test.each(inputs)('submit work', async (id) => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
      });
      const component = render(<UserInfo
        id="test"
        setNewPassword={jest.fn()}
        setName={jest.fn()}
        setEmail={jest.fn()}
        setUsername={jest.fn()}
        updateAccount={mockSubmit}
      />);

      await userEvent.type(component.container.querySelector(`#settings${id}__form__input`), 'test{enter}');

      expect(mockSubmit.mock.calls).toHaveLength(1);
    });
    test('submit work with password change', async () => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
      });
      const component = render(<UserInfo
        id="test"
        setNewPassword={jest.fn()}
        setName={jest.fn()}
        setEmail={jest.fn()}
        setUsername={jest.fn()}
        updateAccount={mockSubmit}
      />);

      await userEvent.type(component.getByPlaceholderText('******'), 'test');
      await userEvent.type(component.container.querySelector('#settingsConfirm__form__input'), 'test');
      await userEvent.click(component.getByRole('button', { name: 'change' }));

      expect(mockSubmit.mock.calls).toHaveLength(1);
    });
    test('openForm work', async () => {
      const mockOpen = jest.fn();
      const component = render(<UserInfo
        id="test"
        setNewPassword={jest.fn()}
        setName={jest.fn()}
        setEmail={jest.fn()}
        setUsername={jest.fn()}
        openForm={mockOpen}
      />);

      await userEvent.click(component.container.querySelector('#test__header__closeButton'));

      expect(mockOpen.mock.calls).toHaveLength(1);
    });
    test('confirm only visible when password work', async () => {
      const component = render(<UserInfo
        id="test"
        setNewPassword={jest.fn()}
        setName={jest.fn()}
        setEmail={jest.fn()}
        setUsername={jest.fn()}
      />);

      expect(component.getByText('confirm')).not.toBeVisible();
      await userEvent.type(component.getByPlaceholderText('******'), 'test');

      expect(component.getByText('confirm')).toBeVisible();
      expect(component.container.querySelector('#test__values__password__confirmContainer__input__change')).not.toBeVisible();

      await userEvent.type(component.container.querySelector('#settingsConfirm__form__input'), 'test');
      expect(component.getByRole('button', { name: 'change' })).toBeVisible();
    });
  });
});
