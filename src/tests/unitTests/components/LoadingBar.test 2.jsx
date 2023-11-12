import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import LoadingBar from '../../../components/LoadingBar';

describe('LoadingBar tests', () => {
  test('LoadingBar renders', () => {
    const component = render(<LoadingBar />);
    const container = component.container.querySelector('#loading__ellipsis');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('loading__ellipsis');
    expect(container.children).toHaveLength(4);
  });
});
