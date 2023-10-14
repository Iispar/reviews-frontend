import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteAccount from '../../../pages/settings/DeleteAccount';

jest.mock('../../../components/SettingsInputField.jsx');

describe('SettingsInputField tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<DeleteAccount id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('deleteAccount');

      expect(component.getByText('delete account')).toBeVisible();
      const closeBtn = component.container.querySelector('#test__header__closeButton');
      expect(closeBtn).not.toBeNull();
      expect(closeBtn).toBeVisible();

      const input = component.container.querySelector('#deletePassword__form__input');
      expect(input).not.toBeNull();
      expect(input).toBeVisible();

      expect(component.getByText('this action cannot be undone please confirm by writing: this cannot be undone')).toBeVisible();
      expect(component.getByRole('button', { name: 'I understand. Delete account' })).toBeVisible();
    });
  });
  describe('functions work', () => {
    test('openForm works', async () => {
      const mockOpen = jest.fn();
      const component = render(<DeleteAccount id="test" openForm={mockOpen} />);

      const closeBtn = component.container.querySelector('#test__header__closeButton');
      await userEvent.click(closeBtn);

      expect(mockOpen.mock.calls).toHaveLength(1);
      expect(mockOpen.mock.calls[0][0]).toBe('none');
    });
    test('onSubmit works', async () => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test');
      });
      const component = render(<DeleteAccount id="test" onSubmit={mockSubmit} />);

      const input = component.container.querySelector('#deletePassword__form__input');
      await userEvent.type(input, 'test{enter}');

      expect(mockSubmit.mock.calls).toHaveLength(1);
    });
  });
});
