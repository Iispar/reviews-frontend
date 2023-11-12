import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { findWithSpan } from '../../testHelpers';
import BarTooltip from '../../../components/BarTooltip';

describe('barTooltip tests', () => {
  test('barTooltip renders correctly', () => {
    const component = render(<BarTooltip id="test" active payload={[{ payload: { count: 40, rating: 4.2 } }]} />);

    const container = component.container.querySelector('#test');

    expect(container).toBeVisible();
    expect(component.getByText((content, node) => findWithSpan(node, '40 ratingswith 4.2 stars'))).toBeVisible();
  });
});
