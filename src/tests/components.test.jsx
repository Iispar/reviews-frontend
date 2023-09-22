import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionWait from '../components/ActionWait';
import BarChart from '../components/BarChart';
import { barChart } from './mockData/barChart.json';
import BarTooltip from '../components/BarTooltip';

const mockedUsedNavigate = jest.fn();

// mocks the useNavigate() function.
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

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

global.ResizeObserver = require('resize-observer-polyfill');

describe('components tests', () => {
  describe('actionWait tests', () => {
    test('loading renders correctly', async () => {
      const component = render(<ActionWait loading={4} id="test" />);
      const base = component.container.querySelector('div[id=test]');
      const container = component.container.querySelector('div[id=test__container]');
      const ringLoad = component.container.querySelector('div[id=test__container__ring]');
      const children = component.container.querySelectorAll('div[id=test__container__ring] > div');

      expect(base).toBeVisible();
      expect(base.className).toBe('actionWait');
      expect(container).toBeVisible();
      expect(container.className).toBe('actionWait__container');
      expect(ringLoad).toBeVisible();
      expect(ringLoad.className).toBe('actionWait__container__ring');
      expect(children.length).toBe(4);
    });
    test('success renders correctly', async () => {
      const component = render(<ActionWait loading={5} id="test" />);
      const base = component.container.querySelector('div[id=test]');
      const container = component.container.querySelector('div[id=test__container]');
      const circleContainer = component.container.querySelector('div[id=test__container__success]');
      const circleBorder = component.container.querySelector('div[id=test__container__success__circleBorder]');
      const circle = component.container.querySelector('div[id=test__container__success__circle]');
      const check = component.container.querySelector('div[id=test__container__success__circle__check]');

      expect(base).toBeVisible();
      expect(base.className).toBe('actionWait');
      expect(container).toBeVisible();
      expect(container.className).toBe('actionWait__container');
      expect(circleContainer).toBeVisible();
      expect(circleContainer.className).toBe('actionWait__container__success');
      expect(circleBorder).toBeVisible();
      expect(circleBorder.className).toBe('actionWait__container__success__circleBorder');
      expect(circle).toBeVisible();
      expect(circle.className).toBe('actionWait__container__success__circle');
      expect(check).toBeVisible();
      expect(check.className).toBe('actionWait__container__success__circle__check');
    });
    test('error renders correctly', async () => {
      const component = render(<ActionWait loading={6} id="test" />);
      const base = component.container.querySelector('div[id=test]');
      const container = component.container.querySelector('div[id=test__container]');
      const circleContainer = component.container.querySelector('div[id=test__container__error]');
      const circleBorder = component.container.querySelector('div[id=test__container__error__circleBorder]');
      const circle = component.container.querySelector('div[id=test__container__error__circle]');
      const cross = component.container.querySelector('div[id=test__container__error__circle__cross]');
      const message = await component.findByText('please try again');

      expect(base).toBeVisible();
      expect(base.className).toBe('actionWait');
      expect(container).toBeVisible();
      expect(container.className).toBe('actionWait__container');
      expect(circleContainer).toBeVisible();
      expect(circleContainer.className).toBe('actionWait__container__error');
      expect(circleBorder).toBeVisible();
      expect(circleBorder.className).toBe('actionWait__container__error__circleBorder');
      expect(circle).toBeVisible();
      expect(circle.className).toBe('actionWait__container__error__circle');
      expect(cross).toBeVisible();
      expect(cross.className).toBe('actionWait__container__error__circle__cross');
      expect(message).toBeVisible();
      expect(message.className).toBe('actionWait__container__errorText');
    });
  });
  describe('barChart test', () => {
    const user = userEvent.setup();

    test('barChart renders', () => {
      const component = render(<BarChart data={barChart} />);
      const container = component.container.querySelector('#barChart');
      const bars = component.container.querySelectorAll('.recharts-layer.recharts-bar-rectangle');

      expect(container).toBeVisible();
      expect(bars.length).toBe(5);
    });
    test('barChart hover renders tooltip', async () => {
      const component = render(<BarChart data={barChart} />);
      const toolTip = component.container.querySelector('.recharts-tooltip-wrapper');

      expect(toolTip).not.toBeNull();
      expect(toolTip).not.toBeVisible();

      user.hover(toolTip).then(() => {
        expect(toolTip).toBeVisible();
      });
    });
    describe('barToolTip tests', () => {
      test('barToolTip renders correctly', () => {
        const component = render(<BarTooltip id="test" active payload={[{ payload: { count: 40, rating: 4.2 } }]} />);

        const container = component.container.querySelector('#test');

        expect(container).toBeVisible();
        expect(component.findByText('40 ratings with 4.2 rating'));
      });
    });
  });
});
