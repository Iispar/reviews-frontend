import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionWait from '../components/ActionWait';
import BarChart from '../components/BarChart';
import { barChart } from './mockData/barChart.json';
import { chart } from './mockData/lineChart.json';
import BarTooltip from '../components/BarTooltip';
import DoubleLineChart from '../components/DoubleLineChart';
import LineTooltip from '../components/LineTooltip';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { findWithSpan, addStyling } from './testHelpers';
import DropDownSortMenu from '../components/DropDownSortMenu';

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

beforeEach(() => {
  window.localStorage.clear();
});

describe('components tests', () => {
  describe('actionWait tests', () => {
    test('loading renders correctly', () => {
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
      expect(children).toHaveLength(4);
    });
    test('success renders correctly', () => {
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
    test('error renders correctly', () => {
      const component = render(<ActionWait loading={6} id="test" />);
      const base = component.container.querySelector('div[id=test]');
      const container = component.container.querySelector('div[id=test__container]');
      const circleContainer = component.container.querySelector('div[id=test__container__error]');
      const circleBorder = component.container.querySelector('div[id=test__container__error__circleBorder]');
      const circle = component.container.querySelector('div[id=test__container__error__circle]');
      const cross = component.container.querySelector('div[id=test__container__error__circle__cross]');
      const message = component.getByText('please try again');

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
  describe('barTooltip tests', () => {
    test('barTooltip renders correctly', () => {
      const component = render(<BarTooltip id="test" active payload={[{ payload: { count: 40, rating: 4.2 } }]} />);

      const container = component.container.querySelector('#test');

      expect(container).toBeVisible();
      expect(component.getByText((content, node) => findWithSpan(node, '40 ratingswith 4.2 stars')));
    });
  });
  describe('doubleLineChart tests', () => {
    test('doubleLineChart renders', () => {
      const component = render(<DoubleLineChart id="test" data={chart} />);
      const container = component.container.querySelector('#test__chart');
      const lines = component.container.querySelectorAll('.recharts-layer.recharts-line');
      const labels = component.container.querySelectorAll('.recharts-text.recharts-cartesian-axis-tick-value > tspan');
      const wrapper = component.container.querySelectorAll('.recharts-default-legend > li > span');

      expect(container).toBeVisible();
      expect(component.getByText('February'));
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
  describe('lineTooltip tests', () => {
    test('barTooltip with week renders correctly', () => {
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
      expect(component.getByText((content, node) => findWithSpan(node, 'week 4 of 2012')));
      expect(component.getByText((content, node) => findWithSpan(node, '40 reviews with')));
      expect(component.getByText((content, node) => findWithSpan(node, 'average rating 4.2')));
    });
    test('barTooltip with month renders correctly', () => {
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
      expect(component.getByText((content, node) => findWithSpan(node, 'august of 2012')));
      expect(component.getByText((content, node) => findWithSpan(node, '40 reviews with')));
      expect(component.getByText((content, node) => findWithSpan(node, 'average rating 4.2')));
    });
  });
  describe('dropDownSortMenu tests', () => {
    test('dropDownSorMenu renders', () => {
      const mockSet = jest.fn();
      const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
      addStyling(component);

      const container = component.container.querySelector('#test');
      const openButton = component.getByText('sort');

      const allButtons = component.getAllByRole('button');
      const sortOneAsc = component.container.querySelector('#test__reviews__asc');

      expect(container).toBeVisible();
      expect(openButton).toBeVisible();
      expect(allButtons).toHaveLength(2);
      expect(sortOneAsc).not.toBeNull();
      expect(sortOneAsc).not.toBeVisible();
    });
    test('dropDown toggle works', async () => {
      const mockSet = jest.fn();
      const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
      addStyling(component);

      const container = component.container.querySelector('#test');
      const openButton = component.getByText('sort');

      const allButtons = component.getAllByRole('button');
      const sortOneAsc = component.container.querySelector('#test__reviews__asc');

      expect(allButtons).toHaveLength(2);
      expect(container).toBeVisible();
      expect(openButton).toBeVisible();

      await userEvent.click(openButton);

      const openButtons = component.getAllByRole('button');

      expect(openButtons).toHaveLength(5);
      expect(sortOneAsc).toBeVisible();

      const closeButton = component.container.querySelector('#test__arrow');
      await userEvent.click(closeButton);

      const closedButtons = component.getAllByRole('button');

      expect(closedButtons).toHaveLength(2);
      expect(sortOneAsc).not.toBeVisible();
      expect(component.getByText('sort'));
    });
    test('dropDown sort selection works', async () => {
      const mockSet = jest.fn();
      const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
      addStyling(component);

      const container = component.container.querySelector('#test');
      const sortOneAsc = component.container.querySelector('#test__reviews__asc');
      const sortTwoAsc = component.container.querySelector('#test__rating__asc');
      expect(container).toBeVisible();
      expect(sortOneAsc).not.toBeNull();
      expect(sortOneAsc).not.toBeVisible();
      expect(sortTwoAsc).not.toBeNull();
      expect(sortTwoAsc).not.toBeVisible();

      const openButton = component.getByText('sort');
      await userEvent.click(openButton);

      expect(sortOneAsc).toBeVisible();
      expect(sortTwoAsc).toBeVisible();

      await userEvent.click(sortOneAsc);

      await waitFor(() => {
        const allButtons = component.getAllByRole('button');
        expect(allButtons).toHaveLength(2);
        expect(sortOneAsc).toBeVisible();
        expect(sortTwoAsc).not.toBeVisible();
        expect(mockSet.mock.calls).toHaveLength(1);
        expect(container).toHaveStyle('width: 73.896484375px');
      });
    });
    test('if open and selected closing keeps the selected sort displayed', async () => {
      const mockSet = jest.fn();
      const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
      addStyling(component);

      const container = component.container.querySelector('#test');
      const sortOneAsc = component.container.querySelector('#test__reviews__asc');
      const sortTwoAsc = component.container.querySelector('#test__rating__asc');
      expect(container).toBeVisible();
      expect(sortOneAsc).not.toBeNull();
      expect(sortOneAsc).not.toBeVisible();
      expect(sortTwoAsc).not.toBeNull();
      expect(sortTwoAsc).not.toBeVisible();

      const openButton = component.getByText('sort');
      await userEvent.click(openButton);

      expect(sortOneAsc).toBeVisible();
      expect(sortTwoAsc).toBeVisible();

      await userEvent.click(sortOneAsc);

      expect(sortOneAsc).toBeVisible();
      expect(sortTwoAsc).not.toBeVisible();

      const arrow = component.container.querySelector('#test__arrow');
      await userEvent.click(arrow);

      expect(sortOneAsc).toBeVisible();
      expect(sortTwoAsc).toBeVisible();

      await userEvent.click(arrow);

      expect(sortOneAsc).toBeVisible();
      expect(sortTwoAsc).not.toBeVisible();
    });
  });
  describe('footer tests', () => {
    test('footer renders', () => {
      const component = render(<Footer id="test" />);
      const container = component.container.querySelector('#test');

      expect(container).toBeVisible();
      expect(container).toHaveAttribute('class', 'footer');
      expect(component.getByText('about this website'));
      expect(component.getByText('this application is my personal project. It mocks a online shops site for sellers. There is a lot more information about the site and how it works on github, please refer it if you would like to know more.'));
      expect(component.getByText('iiro.s.partanen@gmail.com'));
      expect(component.getByText('iispar@github.com'));
    });
  });
  describe('header tests', () => {
    test('header renders', async () => {
      const component = render(<Header id="test" />);
      addStyling(component);
      const container = component.container.querySelector('#test');

      expect(container).toBeVisible();

      const buttons = component.getAllByRole('button');
      const home = component.getByRole('link', { name: 'home' });
      const all = component.getByRole('link', { name: 'all items' });
      const settings = component.getByRole('link', { name: 'settings' });

      expect(buttons).toHaveLength(2);

      const navBar = component.container.querySelector('#test__navBar');
      expect(navBar).not.toBeNull();
      expect(navBar).toHaveAttribute('class', 'headerContainer__navBar');

      expect(home).toHaveAttribute('href', '/home');
      expect(all).toHaveAttribute('href', '/all');
      expect(settings).toHaveAttribute('href', '/settings');
    });
    test('toggle navBar works', async () => {
      const component = render(<Header id="test" />);
      addStyling(component);
      const container = component.container.querySelector('#test');

      expect(container).toBeVisible();

      const hamburgerBtn = component.getAllByRole('button')[0];
      const hamburger = component.container.querySelector('#test__header__hamburger');

      const navBar = component.container.querySelector('#test__navBar');

      expect(navBar).not.toBeNull();

      await userEvent.click(hamburgerBtn);

      expect(navBar).toHaveStyle('transform: scaleX(1)');
      expect(hamburger).toHaveAttribute('class', 'headerContainer__header__hamburger clicked');

      await userEvent.click(hamburgerBtn);

      expect(navBar).toHaveStyle('transform: scaleX(0)');
      expect(hamburger).toHaveAttribute('class', 'headerContainer__header__hamburger');
    });
    test('logout works', async () => {
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });

      window.localStorage.setItem('token', 'testToken');
      window.localStorage.setItem('accountId', 'testId');
      const component = render(<Header id="test" />);
      const container = component.container.querySelector('#test');

      expect(container).toBeVisible();

      const logOutBtn = component.getAllByRole('button')[1];

      await userEvent.click(logOutBtn);

      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('accountId')).toBeNull();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
