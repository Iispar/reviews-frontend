import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchField from '../../../components/SearchField';
import { addStyling } from '../../testHelpers';

describe('searchField tests', () => {
  test('searchField renders', () => {
    const component = render(<SearchField id="test" placeholder="test input" />);
    addStyling(component);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('searchField');

    expect(component.getByPlaceholderText('test input')).toBeVisible();
    expect(component.queryByRole('button')).not.toBeInTheDocument();
  });
  test('input works', async () => {
    const mockSet = jest.fn();
    const mockClear = jest.fn();
    const component = render(<SearchField id="test" placeholder="test input" onChange={mockSet} onClear={mockClear} />);
    addStyling(component);

    const input = component.getByPlaceholderText('test input');
    expect(component.queryByRole('button')).not.toBeInTheDocument();

    await userEvent.type(input, 'testing');

    const clearBtn = component.getByRole('button');

    expect(mockSet.mock.calls).toHaveLength(7);
    expect(input).toHaveValue('testing');
    expect(clearBtn).toBeVisible();

    await userEvent.click(clearBtn);

    expect(mockClear.mock.calls).toHaveLength(1);
    expect(component.queryByRole('button')).not.toBeInTheDocument();
  });
});
