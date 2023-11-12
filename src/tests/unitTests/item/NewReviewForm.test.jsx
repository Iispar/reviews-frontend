import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewReviewForm from '../../../pages/item/NewReviewForm';

jest.mock('../../../components/InputField.jsx');
jest.mock('../../../components/LargeInputField.jsx');
jest.mock('../../../components/JsonFileInput.jsx');

describe('NewReviewForm tests', () => {
  describe('render tests', () => {
    test('NewReviewForm success render works', () => {
      const component = render(<NewReviewForm id="test" />);

      expect(component.getByText('add a new comment')).toBeVisible();
      expect(component.getByPlaceholderText('title')).toBeVisible();
      expect(component.getByText('title')).toBeVisible();
      expect(component.getByPlaceholderText('comment body')).toBeVisible();
      expect(component.getByText('comment body')).toBeVisible();
      expect(component.container.querySelector('#test__form__date')).toBeVisible();
      expect(component.getByText('or add a file')).toBeVisible();
      expect(component.container.querySelector('#test__form__fileInput__form')).toBeVisible();

      expect(component.getByRole('button', { name: 'add' })).toBeVisible();
      expect(component.getByRole('button', { name: 'close' })).toBeVisible();
    });
    test('NewReviewForm invis render works', () => {
      const component = render(<NewReviewForm id="test" view={false} />);

      expect(component.container.querySelector('#test')).not.toBeVisible();
    });
  });
  describe('functions work', () => {
    test('close works', async () => {
      const mockClose = jest.fn();
      const component = render(<NewReviewForm id="test" onClick={mockClose} />);

      await userEvent.click(component.getByRole('button', { name: 'close' }));

      expect(mockClose.mock.calls).toHaveLength(1);
    });
    test('submit works', async () => {
      const mockSubmit = jest.fn((e) => {
        e.preventDefault();
        expect(e.target.elements[0].value).toBe('test title');
        expect(e.target.elements[1].value).toBe('test comment');
        expect(e.target.elements[2].value).toBe('2022-01-01');
        expect(e.target.elements[3].value).toBe('C:\\fakepath\\filename.json');
      });
      const component = render(<NewReviewForm id="test" onSubmit={mockSubmit} />);

      const title = component.getByPlaceholderText('title');
      const comment = component.getByPlaceholderText('comment body');
      const date = component.container.querySelector('#test__form__date');
      const fileInput = component.container.querySelector('#test__form__fileInput__form');

      await userEvent.type(title, 'test title');
      await userEvent.type(comment, 'test comment');
      await userEvent.type(date, '2022-01-01');
      const file = new File([''], 'filename.json', { type: 'text/html' });
      await userEvent.upload(fileInput, file);

      await userEvent.click(component.getByRole('button', { name: 'add' }));

      expect(mockSubmit.mock.calls).toHaveLength(1);
    });
  });
});
