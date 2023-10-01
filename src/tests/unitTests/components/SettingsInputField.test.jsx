import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsInputField from '../../../components/SettingsInputField';

describe('settingsInputField tests', () => {
  test('settingsInputField without wariningText renders', () => {
    const component = render(<SettingsInputField id="test" defaultValue="test value" title="test title" submitText="test submit" type="text" />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('settingsInput');

    const submit = component.getByText('test submit');
    const warning = component.container.querySelector('test__form__warning');

    expect(component.getByText('test title')).toBeVisible();

    expect(submit).toBeInTheDocument();
    expect(submit).not.toBeVisible();
    expect(warning).toBeNull();
    expect(component.getByDisplayValue('test value'));
  });

  test('settingsInputField with wariningText renders', () => {
    const component = render(<SettingsInputField warningText="this is a warning" id="test" defaultValue="test value" title="test title" submitText="test submit" type="text" />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('settingsInput');

    const submit = component.getByText('test submit');

    expect(component.getByText('test title')).toBeVisible();
    expect(submit).toBeInTheDocument();
    expect(submit).not.toBeVisible();
    expect(component.getByText('this is a warning')).toBeInTheDocument();
    expect(component.getByDisplayValue('test value'));
  });

  test('input works', async () => {
    const mockSet = jest.fn();
    const component = render(<SettingsInputField onChange={mockSet} warningText="this is a warning" id="test" defaultValue="test value" title="test title" submitText="test submit" type="text" />);

    const input = component.getByDisplayValue('test value');

    await userEvent.type(input, 'testing');

    expect(input).toHaveValue('test valuetesting');
    expect(mockSet.mock.calls).toHaveLength(7);
  });

  test('change button works without defaulValue', async () => {
    const mockSet = jest.fn();
    const component = render(<SettingsInputField onChange={mockSet} warningText="this is a warning" id="test" defaultValue="test value" title="test title" submitText="test submit" type="text" />);

    const input = component.getByDisplayValue('test value');

    await userEvent.type(input, 'testing');

    expect(component.getByText('test submit')).toBeVisible();

    await userEvent.clear(input);
    await userEvent.type(input, 'test value');

    expect(component.getByText('test submit')).not.toBeVisible();
  });
  test('change button works without defaulValue', async () => {
    const mockSet = jest.fn();
    const component = render(<SettingsInputField onChange={mockSet} warningText="this is a warning" id="test" confirmationText="test value" title="test title" submitText="test submit" type="text" />);

    const input = component.getByDisplayValue('');

    await userEvent.type(input, 'test value');

    expect(component.getByText('test submit')).toBeVisible();

    await userEvent.clear(input);
    await userEvent.type(input, 'test');

    expect(component.getByText('test submit')).not.toBeVisible();
  });
  test('submit works', async () => {
    const mockSubmit = jest.fn((e) => {
      e.preventDefault();
      expect(e.target.elements[0].value).toBe('test valuetest');
    });
    const component = render(<SettingsInputField onSubmit={mockSubmit} warningText="this is a warning" id="test" defaultValue="test value" title="test title" submitText="test submit" type="text" />);

    const input = component.getByDisplayValue('test value');

    await userEvent.type(input, 'test');
    const changeBtn = component.getByText('test submit');
    await userEvent.click(changeBtn);

    expect(mockSubmit).toHaveBeenCalled();
  });
});
