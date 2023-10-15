import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SkeletonLoad from '../../../components/SkeletonLoad';

describe('SkeletonLoad tests', () => {
  test('SkeletonLoad renders', () => {
    const component = render(<SkeletonLoad id="test" />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('loading__beat');
  });
});
