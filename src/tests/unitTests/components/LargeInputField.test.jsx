import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import LargeInputField from '../../../components/LargeInputField';

describe('LargeInputField tests', () => {
  test('LargeInputField renders', () => {
    const component = render(<LargeInputField id="test" title="test title" width="200px" height="40px" error="error text" />);
    addStyling(component);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('largeField');

    const inputContainer = component.container.querySelector('#test__container');

    expect(inputContainer).toHaveStyle('width: 200px');
    expect(inputContainer).toHaveStyle('height: 40px');

    const error = component.getByText('error text');
    const cutout = component.container.querySelector('#test__container__cutout');

    expect(error).not.toBeNull();
    expect(error).not.toBeVisible();
    expect(error).toHaveStyle('width: 60.017578125px');

    expect(component.getByText('test title')).toBeVisible();
    expect(cutout).toHaveStyle('width: 55.1328125px');
  });
  test('input works', async () => {
    const component = render(<LargeInputField id="test" title="test title" width="200px" height="40px" error="error text" />);
    addStyling(component);

    const container = component.container.querySelector('#test__container__input');

    await userEvent.type(container, 'testing');

    expect(container).toHaveValue('testing');
  });
});
