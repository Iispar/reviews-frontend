import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import BarChart from '../../../components/BarChart';
import { barChart } from '../../mockData/barChart.json';

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

describe('barChart test', () => {
  test('barChart renders', async () => {
    const component = render(<BarChart data={barChart} />);
    const container = component.container.querySelector('#barChart__chart');
    const color = ['#D2222D', '#EE6F27', '#FFBF00', '#32A632', '#007000', '#A31A23', '#D16224', '#D49F00', '#278227', '#004A00'];

    await waitFor(() => {
      const bars = component.container.querySelectorAll('.recharts-layer.recharts-bar-rectangle > path');
      expect(container).toBeVisible();
      expect(bars).toHaveLength(5);
      for (let i = 0; i < bars.length; i += 1) {
        expect(bars[i].getAttribute('fill')).toBe(color[i]);
      }
    });
  });
  // TODO:
  // test('barChart hover renders tooltip and changes color', async () => {
  // const component = render(<BarChart data={barChart} testing />);
  // const tooltip = component.container.querySelector('.recharts-tooltip-wrapper');

  // await waitFor(() => {
  //   expect(component.container.querySelectorAll
  // ('.recharts-layer.recharts-bar-rectangle > path').length).toBeGreaterThan(0);

  //   expect(tooltip).not.toBeNull();
  //   expect(tooltip).not.toBeVisible();
  // });

  // const bars = component.container.querySelectorAll('.recharts-rectangle');
  // console.log(bars.length);
  // fireEvent.mouseOver({ clientX: 200, clientY: 200 });
  // // TODO :(((((((((((((
  // await waitFor(() => {
  //   expect(tooltip).toBeVisible();
  // });
  // });
});
