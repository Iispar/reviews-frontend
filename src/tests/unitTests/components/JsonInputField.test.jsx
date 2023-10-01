import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import JsonInputField from '../../../components/JsonFileInput';

describe('jsonFileInput tests', () => {
  test('jsonFileInput renders', () => {
    const component = render(<JsonInputField id="test" heigth="200px" />);
    addStyling(component);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('jsonFileInput');

    const error = component.getByText('needs to be a JSON file!');
    const success = component.container.querySelector('#test__label__succesful');

    expect(component.getByText('file')).toBeVisible();
    expect(error).not.toBeNull();
    expect(error).not.toBeVisible();
    expect(success).not.toBeNull();
    expect(success).not.toBeVisible();
    expect(component.container.querySelector('#test__label')).toHaveStyle('height: 200px');
  });
  test('input works', async () => {
    const component = render(<JsonInputField id="test" heigth="200px" />);
    addStyling(component);

    const input = component.container.querySelector('#test__form');

    const file = new File([''], 'filename.json', { type: 'text/html' });
    await userEvent.upload(input, file);

    expect(input).toHaveValue('C:\\fakepath\\filename.json');
  });
  test('error works', async () => {
    const component = render(<JsonInputField id="test" heigth="200px" />);
    addStyling(component);

    const input = component.container.querySelector('#test__form');
    const error = component.getByText('needs to be a JSON file!');

    expect(error).not.toBeVisible();

    const file = new File([''], 'filename.txt', { type: 'text/html' });
    await userEvent.upload(input, file);

    expect(error).toBeVisible();
  });

  test('success works', async () => {
    const component = render(<JsonInputField id="test" heigth="200px" />);
    addStyling(component);

    const input = component.container.querySelector('#test__form');
    const success = component.container.querySelector('#test__label__succesful');

    expect(success).not.toBeVisible();

    const file = new File([''], 'filename.json', { type: 'text/html' });
    await userEvent.upload(input, file);

    expect(success).toBeVisible();
  });
});
