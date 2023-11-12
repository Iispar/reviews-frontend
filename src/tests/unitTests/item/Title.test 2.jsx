import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Title from '../../../pages/item/Title';
import { findWithSpan } from '../../testHelpers';

describe('Title tests', () => {
  describe('render tests', () => {
    test('successful render works', () => {
      const component = render(<Title id="test" name="test name" reviewsCount={30} ratingValue="2.2" posReviews={20} negReviews={10} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('itemTitle');

      expect(component.getByText('test name'));
      expect(component.getByText('2.2')).toBeVisible();
      expect(component.container.querySelector('#test__data__rating__stars').children).toHaveLength(4);
      expect(component.getByText((content, node) => findWithSpan(node, '30reviews'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '20positive'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '10negative'))).toBeVisible();
    });
    test('0 stars render works', () => {
      const component = render(<Title id="test" name="test name" reviewsCount={30} ratingValue="0" posReviews={20} negReviews={10} />);

      expect(component.container.querySelector('#test__data__rating__stars')).toBeNull();
    });
    test('2 stars render works', () => {
      const component = render(<Title id="test" name="test name" reviewsCount={30} ratingValue="2" posReviews={20} negReviews={10} />);

      expect(component.container.querySelector('#test__data__rating__stars').children).toHaveLength(2);
    });
    test('0.x stars render works', () => {
      const component = render(<Title id="test" name="test name" reviewsCount={30} ratingValue="0.2" posReviews={20} negReviews={10} />);

      expect(component.container.querySelector('#test__data__rating__stars').children).toHaveLength(2);
    });
  });
  describe('functions work', () => {
    test('rating hover works', async () => {
      const component = render(<Title id="test" name="test name" reviewsCount={30} ratingValue="1.2" posReviews={20} negReviews={10} />);
      const hover = component.container.querySelector('#test__data__rating__hover');
      const value = component.container.querySelector('#test__data__rating__value');

      await userEvent.hover(component.getByText('rating'));
      expect(hover).toBeVisible();
      expect(value).not.toBeVisible();

      await userEvent.unhover(component.getByText('rating'));
      expect(hover).not.toBeVisible();
      expect(value).toBeVisible();
    });
  });
});
