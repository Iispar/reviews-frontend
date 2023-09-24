import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionWait from '../components/ActionWait';
import BarChart from '../components/BarChart';
import { barChart } from './mockData/barChart.json';
import { chart } from './mockData/lineChart.json';
import { items } from './mockData/items.json';
import BarTooltip from '../components/BarTooltip';
import DoubleLineChart from '../components/DoubleLineChart';
import LineTooltip from '../components/LineTooltip';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { findWithSpan, addStyling } from './testHelpers';
import DropDownSortMenu from '../components/DropDownSortMenu';
import InputField from '../components/InputField';
import ItemList from '../components/ItemList';
import JsonInputField from '../components/JsonFileInput';
import SmallItem from '../components/SmallItem';
import LargeItem from '../components/LargeItem';
import LargeInputField from '../components/LargeInputField';
import LargeReview from '../components/LargeReview';
import LayoutsWithNav from '../components/LayoutsWithNav';
import LoadingBar from '../components/LoadingBar';
import Pagination from '../components/Pagination';

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
      expect(component.getByText((content, node) => findWithSpan(node, 'week 4 of 2012')));
      expect(component.getByText((content, node) => findWithSpan(node, '40 reviews with')));
      expect(component.getByText((content, node) => findWithSpan(node, 'average rating 4.2')));
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
      expect(container.className).toBe('dropDownSortMenu');
      expect(openButton).toBeVisible();
      expect(allButtons).toHaveLength(2);

      expect(sortOneAsc).not.toBeNull();
      expect(sortOneAsc).not.toBeVisible();
    });
    test('dropDown toggle works', async () => {
      const mockSet = jest.fn();
      const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
      addStyling(component);

      const openButton = component.getByText('sort');

      const allButtons = component.getAllByRole('button');
      const sortOneAsc = component.container.querySelector('#test__reviews__asc');

      expect(allButtons).toHaveLength(2);
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

    const table = [
      ['#test__reviews__asc', '73.896484375px'],
      ['#test__reviews__desc', '73.896484375px'],
      ['#test__rating__asc', '65.0146484375px'],
      ['#test__rating__desc', '65.0146484375px'],
    ];
    test.each(table)('dropDown sort selection works', async (id, width) => {
      const mockSet = jest.fn();
      const component = render(<DropDownSortMenu id="test" sortOne="reviews" sortTwo="rating" setSort={mockSet} />);
      addStyling(component);

      const container = component.container.querySelector('#test');
      const sort = component.container.querySelector(id);
      expect(sort).not.toBeNull();
      expect(sort).not.toBeVisible();

      const openButton = component.getByText('sort');
      await userEvent.click(openButton);

      expect(sort).toBeVisible();

      await userEvent.click(sort);

      await waitFor(() => {
        expect(sort).toBeVisible();
        expect(mockSet.mock.calls).toHaveLength(1);
        expect(container).toHaveStyle(`width: ${width}`);
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
      expect(container.className).toBe('footer');
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
      expect(container.className).toBe('headerContainer');

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

      const logOutBtn = component.getAllByRole('button')[1];

      await userEvent.click(logOutBtn);

      expect(window.localStorage.getItem('token')).toBeNull();
      expect(window.localStorage.getItem('accountId')).toBeNull();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
  describe('inputField tests', () => {
    test('inputField renders', () => {
      const component = render(<InputField id="test" title="test title" width="200px" height="20px" type="text" error="test error" />);
      addStyling(component);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('searchField');

      expect(container).toHaveStyle('width: 200px');
      expect(container).toHaveStyle('height: 20px');

      const error = component.getByText('test error');
      const input = component.getByText('test title');
      const cutout = component.container.querySelector('#test__container__cutout');
      const label = component.container.querySelector('#test__container__label');

      expect(error).toHaveStyle('width: 56.013671875px');
      expect(cutout).toHaveStyle('width: 55.1328125px');
      expect(label).toHaveStyle('top: 5px');
      expect(error).not.toBeVisible();
      expect(input).toBeVisible();
    });
    test('input works', async () => {
      const mockSet = jest.fn();
      const userNameRehexp = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      const component = render(<InputField id="test" title="test title" width="200px" height="20px" type="text" error="test error" regex={userNameRehexp} onChange={mockSet} />);
      addStyling(component);

      const input = component.getByPlaceholderText('test title');

      await userEvent.type(input, 'testing');

      expect(input).toHaveValue('testing');
      expect(mockSet.mock.calls).toHaveLength(7);
      // because on change so changes t > te > tes > test > testi > testin > testing.
    });
    test('error works', async () => {
      const userNameRehexp = /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
      const component = render(<InputField id="test" title="test title" width="200px" height="20px" type="text" error="test error" regex={userNameRehexp} />);
      addStyling(component);

      const input = component.getByPlaceholderText('test title');
      const error = component.getByText('test error');
      expect(error).not.toBeVisible();

      await userEvent.type(input, 't.12"#!');

      expect(error).toBeVisible();
    });
  });
  describe('itemList tests', () => {
    const table = [
      SmallItem,
      LargeItem,
    ];
    test.each(table)('smallItem works', (item) => {
      const component = render(<ItemList items={items} View={item} id="test" />);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('itemList');

      expect(container.children).toHaveLength(2);
    });
  });
  describe('jsonFileInput tests', () => {
    test('jsonFileInput renders', () => {
      const component = render(<JsonInputField id="test" heigth="200px" />);
      addStyling(component);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('jsonFileInput');

      const error = component.getByText('needs to be a JSON file!');
      const success = component.container.querySelector('#test__label__succesful');

      expect(component.getByText('file'));
      expect(error).not.toBeNull();
      expect(error).not.toBeVisible();
      expect(success).not.toBeNull();
      expect(success).not.toBeVisible();
      expect(component.container.querySelector('#test__label')).toHaveStyle('height: 200px');
    });
    test('input works', async () => {
      const component = render(<JsonInputField id="test" heigth="200px" />);
      addStyling(component);

      const input = component.container.querySelector('#test__form');

      const file = new File([''], 'filename.json', { type: 'text/html' });
      await userEvent.upload(input, file);

      expect(input).toHaveValue('C:\\fakepath\\filename.json');
    });
    test('error works', async () => {
      const component = render(<JsonInputField id="test" heigth="200px" />);
      addStyling(component);

      const input = component.container.querySelector('#test__form');
      const error = component.getByText('needs to be a JSON file!');

      expect(error).not.toBeVisible();

      const file = new File([''], 'filename.txt', { type: 'text/html' });
      await userEvent.upload(input, file);

      expect(error).toBeVisible();
    });

    test('success works', async () => {
      const component = render(<JsonInputField id="test" heigth="200px" />);
      addStyling(component);

      const input = component.container.querySelector('#test__form');
      const success = component.container.querySelector('#test__label__succesful');

      expect(success).not.toBeVisible();

      const file = new File([''], 'filename.json', { type: 'text/html' });
      await userEvent.upload(input, file);

      expect(success).toBeVisible();
    });
  });
  describe('LargeInputField tests', () => {
    test('LargeInputField renders', () => {
      const component = render(<LargeInputField id="test" title="test title" width="200px" height="40px" error="error text" />);
      addStyling(component);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('largeField');

      const inputContainer = component.container.querySelector('#test__container');

      expect(inputContainer).toHaveStyle('width: 200px');
      expect(inputContainer).toHaveStyle('height: 40px');

      const error = component.getByText('error text');
      const cutout = component.container.querySelector('#test__container__cutout');

      expect(error).not.toBeNull();
      expect(error).not.toBeVisible();
      expect(error).toHaveStyle('width: 60.017578125px');

      expect(component.getByText('test title'));
      expect(cutout).toHaveStyle('width: 55.1328125px');
    });
    test('input works', async () => {
      const component = render(<LargeInputField id="test" title="test title" width="200px" height="40px" error="error text" />);
      addStyling(component);

      const container = component.container.querySelector('#test__container__input');

      await userEvent.type(container, 'testing');

      expect(container).toHaveValue('testing');
    });
  });
  describe('LargeItem tests', () => {
    test('LargeItem renders', () => {
      const component = render(<LargeItem id="test" reviews="20" rating={4.2} item="test item" />);

      const container = component.container.querySelector('#largeItem__test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('largeItem');

      expect(component.getByText('test item'));
      expect(component.getByText('4.2'));
      expect(component.getByText((content, node) => findWithSpan(node, '20reviews')));
    });
    test('clicking works', async () => {
      const component = render(<LargeItem id="testId" reviews="20" rating={4.2} item="test item" />);
      const name = component.getByText('test item');

      await userEvent.click(name);

      expect(mockedUsedNavigate.mock.calls).toHaveLength(1);
      expect(mockedUsedNavigate.mock.calls[0][0]).toBe('/item/testId');
    });
  });
  describe('LargeReview tests', () => {
    test('LargeReview renders', () => {
      const component = render(<LargeReview id="test" rating={4.2} body="this is a test body" title="test title" date="2022-12-02" item={2} />);
      addStyling(component);

      const container = component.container.querySelector('#largeReview__test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('largeReview');

      const item = component.getByText('item');
      const title = component.getByText('test title');
      const date = component.getByText('2022-12-02');

      expect(component.getByText('this is a test body'));
      expect(component.getByText('4.2'));
      expect(title).not.toBeNull();
      expect(title).not.toBeVisible();
      expect(date).not.toBeNull();
      expect(date).not.toBeVisible();
      expect(item).not.toBeNull();
      expect(item).not.toBeVisible();
      expect(component.getAllByRole('button')).toHaveLength(1);
    });
    test('LargeReview toggles', async () => {
      const component = render(<LargeReview id="test" rating={4.2} body="this is a test body" title="test title" date="2022-12-02" item={2} />);
      addStyling(component);

      const container = component.container.querySelector('#largeReview__test');
      const item = component.getByText('item');
      const title = component.getByText('test title');
      const date = component.getByText('2022-12-02');

      expect(title).not.toBeNull();
      expect(title).not.toBeVisible();
      expect(date).not.toBeNull();
      expect(date).not.toBeVisible();
      expect(item).not.toBeNull();
      expect(item).not.toBeVisible();
      expect(item).toHaveAttribute('href', '/item/2');

      const openBtn = component.getByRole('button');
      await userEvent.click(openBtn);

      expect(title).toBeVisible();
      expect(date).toBeVisible();
      expect(item).toBeVisible();
      expect(container).toHaveStyle('flex-grow: 2.4');

      const closeBtn = component.getByRole('button');
      await userEvent.click(closeBtn);

      expect(title).not.toBeVisible();
      expect(date).not.toBeVisible();
      expect(item).not.toBeVisible();
      expect(container).toHaveStyle('flex-grow: 1');
    });
  });
  describe('LayoutsWithNav tests', () => {
    test('LayoutsWithNav renders', () => {
      const component = render(
        <BrowserRouter>
          <LayoutsWithNav />
        </BrowserRouter>,
      );
      const container = component.container.querySelector('#layout');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('layout');
      expect(container.children).toHaveLength(3);
    });
  });
  describe('LoadingBar tests', () => {
    test('LoadingBar renders', () => {
      const component = render(<LoadingBar />);
      const container = component.container.querySelector('#loading__ellipsis');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('loading__ellipsis');
      expect(container.children).toHaveLength(4);
    });
  });
  describe('Pagination tests', () => {
    test('Pagination renders', () => {
      const component = render(<Pagination id="test" />);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('pagination');

      expect(component.getByText('next'));
      expect(component.getByText('previous'));
      expect(component.getByText('previous')).toBeDisabled();
    });
    test('Pagination works', async () => {
      const prev = jest.fn();
      const next = jest.fn();
      const component = render(<Pagination id="test" next={next} prev={prev} />);

      const nextBtn = component.getByText('next');
      const prevBtn = component.getByText('previous');

      prevBtn.removeAttribute('disabled');

      await userEvent.click(nextBtn);
      await userEvent.click(prevBtn);

      expect(prev.mock.calls).toHaveLength(1);
      expect(next.mock.calls).toHaveLength(1);
    });
  });
});
