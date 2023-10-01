import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import LineTooltip from '../../../components/LineTooltip';
import { findWithSpan } from '../../testHelpers';

describe('lineTooltip tests', () => {
  test('lineTooltip with week renders correctly', () => {
    const component = render(<LineTooltip
      id="test"
      active
      payload={[{
        payload: {
          count: 40, time: 4, rating: 4.2, timeYear: 2012,
        },
      }]}
    />);
    const container = component.container.querySelector('#test');

    expect(container).toBeVisible();
    expect(container.className).toBe('lineTooltip');
    expect(component.getByText((content, node) => findWithSpan(node, 'week 4 of 2012'))).toBeVisible();
    expect(component.getByText((content, node) => findWithSpan(node, '40 reviews with'))).toBeVisible();
    expect(component.getByText((content, node) => findWithSpan(node, 'average rating 4.2'))).toBeVisible();
  });
  test('lineTooltip with month renders correctly', () => {
    const component = render(<LineTooltip
      id="test"
      active
      payload={[{
        payload: {
          count: 40, time: 'august', rating: 4.2, timeYear: 2012,
        },
      }]}
    />);

    const container = component.container.querySelector('#test');

    expect(container).toBeVisible();
    expect(container.className).toBe('lineTooltip');
    expect(component.getByText((content, node) => findWithSpan(node, 'august of 2012'))).toBeVisible();
    expect(component.getByText((content, node) => findWithSpan(node, '40 reviews with'))).toBeVisible();
    expect(component.getByText((content, node) => findWithSpan(node, 'average rating 4.2'))).toBeVisible();
  });
});
