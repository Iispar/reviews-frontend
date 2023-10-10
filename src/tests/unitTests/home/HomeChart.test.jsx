/* eslint-disable import/named */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomeChart from '../../../pages/home/HomeChart';
import { homeWithNextPage, homeWithNoNextPage } from '../../mockData/Home.json';
import { getChartForAccount } from '../../../services/reviewsService';

jest.mock('../../../components/DoubleLineChart.jsx');

const getChartForAccountMock = () => Promise.resolve(homeWithNoNextPage.chart);
const getChartReject = () => Promise.reject();
jest.mock('../../../services/reviewsService', () => ({
  getChartForAccount: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  getChartForAccount.mockImplementation(getChartForAccountMock);
});

describe('HomeChart tests', () => {
  describe('render tests', () => {
    test('HomeChart renders', () => {
      const component = render(<HomeChart id="test" initData={homeWithNextPage.chart} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('homeChart');

      expect(component.getByRole('button', { name: 'month' })).toBeVisible();
      expect(component.getByRole('button', { name: 'week' })).toBeVisible();

      expect(component.getByText(/2222/)).toBeVisible();
      expect(component.getByText(/1111/)).toBeVisible();
      expect(component.getByText(/testYear/)).toBeVisible();
      expect(component.getByText(/testTime/)).toBeVisible();
    });
    test('HomeChart renders with no data', () => {
      const component = render(<HomeChart id="test" initData={[]} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('homeChart');

      expect(component.getByText('no data')).toBeVisible();
    });

    test('HomeChart renders with loading (1)', () => {
      const component = render(<HomeChart id="test" initLoading={1} initData={homeWithNextPage.chart} />);

      const skeletonLoad = component.container.querySelector('#skeletonLoad');
      expect(skeletonLoad).not.toBeNull();
      expect(skeletonLoad).toBeVisible();
    });

    test('HomeChart renders with loading (2)', () => {
      const component = render(<HomeChart id="test" initLoading={2} initData={homeWithNextPage.chart} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('homeChart');

      expect(component.getByRole('button', { name: 'month' })).toBeVisible();
      expect(component.getByRole('button', { name: 'week' })).toBeVisible();

      expect(component.container.querySelector('#loading__ellipsis')).not.toBeNull();
    });
    test('HomeChart renders with loading (3)', () => {
      const component = render(<HomeChart id="test" initLoading={3} initData={homeWithNextPage.chart} />);

      const container = component.container.querySelector('#test');
      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('homeChart');

      expect(component.getByRole('button', { name: 'month' })).toBeVisible();
      expect(component.getByRole('button', { name: 'week' })).toBeVisible();

      expect(component.getByText('an error ocurred, please reload')).toBeVisible();
    });
  });
  describe('function tests', () => {
    const load = [0, 2];
    test.each(load)('month change works', async (state) => {
      const component = render(<HomeChart id="test" initLoading={state} token="testToken" accountId="testId" initData={homeWithNextPage.chart} />);

      const monthBtn = component.getByRole('button', { name: 'month' });
      await userEvent.click(monthBtn);

      expect(component.getByText(/loadedNewTime/)).toBeVisible();
      expect(component.container.querySelector('#test__selector__active')).toHaveStyle({
        left: '63px',
        width: '38px',
      });
    });
    test.each(load)('week change works', async (state) => {
      const component = render(<HomeChart id="test" initLoading={state} token="testToken" accountId="testId" initData={homeWithNextPage.chart} />);

      const monthBtn = component.getByRole('button', { name: 'week' });
      await userEvent.click(monthBtn);

      expect(component.getByText(/loadedNewTime/)).toBeVisible();
      expect(component.container.querySelector('#test__selector__active')).toHaveStyle({
        left: '106px',
        width: '32px',
      });
    });
    test('error change works', async () => {
      getChartForAccount.mockImplementation(getChartReject);
      const component = render(<HomeChart id="test" token="testToken" accountId="testId" initData={homeWithNextPage.chart} />);

      const monthBtn = component.getByRole('button', { name: 'week' });
      await userEvent.click(monthBtn);

      expect(component.getByText('an error ocurred, please reload')).toBeVisible();
    });
  });
});
