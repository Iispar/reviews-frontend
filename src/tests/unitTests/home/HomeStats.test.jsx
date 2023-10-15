import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import HomeStats from '../../../pages/home/HomeStats';
import { homeWithNextPage } from '../../mockData/Home.json';
import { findWithSpan } from '../../testHelpers';

jest.mock('../../../components/BarChart');

describe('HomeStats tests', () => {
  describe('render tests', () => {
    test('renders correctly', () => {
      const component = render(
        <HomeStats
          id="test"
          barChartData={homeWithNextPage.barChart}
          itemCount={10}
          ratingAvg={4.2}
          reviewCount={200}
        />,
      );
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('homeStats');

      expect(component.getByText(/2222/));
      expect(component.getByText(/3333/));

      expect(component.container.querySelector('#mockChart').children).toHaveLength(5);

      expect(component.getByText('distribution of ratings'));
      expect(component.getByText((content, node) => findWithSpan(node, '10items'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '4.2avg rating'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '200reviews'))).toBeVisible();
      expect(component.getByText('all time'));
    });
    test('renders correctly with no barChart data', () => {
      const component = render(
        <HomeStats
          id="test"
          barChartData={[]}
          itemCount={10}
          ratingAvg={4.2}
          reviewCount={200}
        />,
      );
      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('homeStats');

      expect(component.getByText('no data'));

      expect(component.getByText('distribution of ratings'));
      expect(component.getByText((content, node) => findWithSpan(node, '10items'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '4.2avg rating'))).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '200reviews'))).toBeVisible();
      expect(component.getByText('all time'));
    });
    test('renders correctly with loading', () => {
      const component = render(
        <HomeStats
          id="test"
          barChartData={null}
          itemCount={10}
          ratingAvg={4.2}
          reviewCount={200}
        />,
      );

      const barLoad = component.container.querySelector('#test__barLoad');
      const statsLoad = component.container.querySelector('#test__statsLoad');

      expect(barLoad).not.toBeNull();
      expect(barLoad).toBeVisible();

      expect(statsLoad).not.toBeNull();
      expect(statsLoad).toBeVisible();
    });
  });
});
