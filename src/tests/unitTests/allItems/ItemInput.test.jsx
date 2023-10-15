import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemInput from '../../../pages/allItems/ItemInput';

jest.mock('../../../components/InputField');

describe('ItemInput tests', () => {
  describe('itemInput renders tests', () => {
    test('ItemInput renders correctly', () => {
      const component = render(<ItemInput id="test" />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('itemInput');

      expect(component.getByText('Add new item')).toBeVisible();

      expect(component.getByPlaceholderText('product name')).toBeVisible();
      expect(component.getByText('category:')).toBeVisible();
      const select = component.container.querySelector('#createCategory');

      expect(select).not.toBeNull();
      expect(select).toBeVisible();

      expect(component.getByRole('button', { name: 'submit' })).toBeVisible();
    });
  });
  describe('ItemInput functions work', () => {
    test('ItemInput submit works', async () => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test name');
        expect(e.target.elements[1].value).toBe('1');
      });
      const component = render(<ItemInput id="test" onSubmit={mockSubmit} />);

      await userEvent.type(component.getByPlaceholderText('product name'), 'test name');
      const select = component.container.querySelector('#createCategory');
      await userEvent.selectOptions(select, '1');

      await userEvent.click(component.getByRole('button', { name: 'submit' }));

      expect(mockSubmit.mock.calls).toHaveLength(1);
    });
  });
});
