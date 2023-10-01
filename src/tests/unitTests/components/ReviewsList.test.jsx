import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { reviews } from '../../mockData/reviews.json';
import ReviewsList from '../../../components/ReviewsList';

describe('ReviewsList tests', () => {
  test('ReviewsList renders', () => {
    const component = render(<ReviewsList id="test" reviews={reviews} />);

    const container = component.container.querySelector('#test');

    expect(container).not.toBeNull();
    expect(container).toBeVisible();
    expect(container.className).toBe('reviewsList');

    expect(container.children).toHaveLength(2);
  });
});
