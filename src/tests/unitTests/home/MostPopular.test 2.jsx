import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { homeWithNextPage } from '../../mockData/Home.json';
import MostPopular from '../../../pages/home/MostPopular';

jest.mock('../../../components/ItemList');

describe('MostPopular tests', () => {
  describe('render tests', () => {
    test('MostPopular renders', () => {
      const component = render(<MostPopular id="test" items={homeWithNextPage.topItems} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('mostPopular');
      expect(component.getByText('popular items')).toBeVisible();
      expect(component.getByText('Polar FT4 Heart Rate Monitor')).toBeVisible();
      expect(component.getByText('214')).toBeVisible();
      expect(component.getByText('17')).toBeVisible();
    });
    test('MostPopular with no items renders', () => {
      const component = render(<MostPopular id="test" items={null} />);

      expect(component.container.querySelector('#loading')).not.toBeNull();
      expect(component.container.querySelector('#loading')).toBeVisible();
    });
    test('MostPopular with 0 items renders', () => {
      const component = render(<MostPopular id="test" />);

      expect(component.getByText('popular items')).toBeVisible();
      expect(component.getByText('no items')).toBeVisible();
    });
  });
});
