import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { chart } from '../../mockData/lineChart.json';
import DoubleLineChart from '../../../components/DoubleLineChart';

global.ResizeObserver = require('resize-observer-polyfill');

// mocks the recharts barChart to render it correctly.
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    // eslint-disable-next-line react/prop-types
    ResponsiveContainer: ({ children }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe('doubleLineChart tests', () => {
  test('doubleLineChart renders', () => {
    const component = render(<DoubleLineChart id="test" data={chart} />);
    const container = component.container.querySelector('#test__chart');
    const lines = component.container.querySelectorAll('.recharts-layer.recharts-line');
    const labels = component.container.querySelectorAll('.recharts-text.recharts-cartesian-axis-tick-value > tspan');
    const wrapper = component.container.querySelectorAll('.recharts-default-legend > li > span');

    expect(container).toBeVisible();
    expect(component.getByText('February')).toBeVisible();
    expect(labels).toHaveLength(8);
    expect(wrapper[0].textContent).toBe('count');
    expect(wrapper[1].textContent).toBe('rating');
    expect(lines).toHaveLength(2);
  });
  // TODO:
  // test('doubleLineChart hover works', async () => {
  //   const component = render(<DoubleLineChart data={chart} />);
  //   const tooltip = component.container.querySelector('.recharts-tooltip-wrapper');

  //   await waitFor(() => {
  //     expect(tooltip).not.toBeNull();
  //     expect(tooltip).not.toBeVisible();
  //   });

  //   const labels = component.container.querySelectorAll
  // ('.recharts-text.recharts-cartesian-axis-tick-value > tspan');
  //   await user.hover(labels[2]);

  //   await waitFor(() => {
  //     expect(tooltip).toBeVisible();
  //   });
  // });
});
