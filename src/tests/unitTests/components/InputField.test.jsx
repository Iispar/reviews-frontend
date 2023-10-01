import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addStyling } from '../../testHelpers';
import InputField from '../../../components/InputField';

describe('inputField tests', () => {
  test('inputField renders', () => {
    const component = render(<InputField id="test" title="test title" width="200px" height="20px" type="text" error="test error" />);
    addStyling(component);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('searchField');

    expect(container).toHaveStyle('width: 200px');
    expect(container).toHaveStyle('height: 20px');

    const error = component.getByText('test error');
    const input = component.getByText('test title');
    const cutout = component.container.querySelector('#test__container__cutout');
    const label = component.container.querySelector('#test__container__label');

    expect(error).toHaveStyle('width: 56.013671875px');
    expect(cutout).toHaveStyle('width: 55.1328125px');
    expect(label).toHaveStyle('top: 5px');
    expect(error).not.toBeVisible();
    expect(input).toBeVisible();
  });
  test('input works', async () => {
    const mockSet = jest.fn();
    const userNameRehexp = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const component = render(<InputField id="test" title="test title" width="200px" height="20px" type="text" error="test error" regex={userNameRehexp} onChange={mockSet} />);
    addStyling(component);

    const input = component.getByPlaceholderText('test title');

    await userEvent.type(input, 'testing');

    expect(input).toHaveValue('testing');
    expect(mockSet.mock.calls).toHaveLength(7);
    // because on change so changes t > te > tes > test > testi > testin > testing.
  });
  test('error works', async () => {
    const userNameRehexp = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const component = render(<InputField id="test" title="test title" width="200px" height="20px" type="text" error="test error" regex={userNameRehexp} />);
    addStyling(component);

    const input = component.getByPlaceholderText('test title');
    const error = component.getByText('test error');
    expect(error).not.toBeVisible();

    await userEvent.type(input, 't.12"#!');

    expect(error).toBeVisible();
  });
});
