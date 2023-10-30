import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import LargeInputField from '../../../components/LargeInputField';
import { useTextWidth } from '../../../helpers/componentHelpers';

jest.mock('../../../helpers/componentHelpers', () => ({
  useTextWidth: jest.fn(),
}));

beforeEach(() => {
  useTextWidth.mockImplementation(() => '20px');
});

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

    expect(error).not.toBeNull();
    expect(error).not.toBeVisible();

    expect(component.getByText('test title')).toBeVisible();
  });
  test('input works', async () => {
    const component = render(<LargeInputField id="test" title="test title" width="200px" height="40px" error="error text" />);
    addStyling(component);

    const container = component.container.querySelector('#test__container__input');

    await userEvent.type(container, 'testing');

    expect(container).toHaveValue('testing');
  });
});
