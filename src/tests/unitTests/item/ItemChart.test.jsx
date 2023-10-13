import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ItemChart from '../../../pages/item/ItemChart';
import { itemSuccess, itemNoTopWords } from '../../mockData/Item.json';
import { getChartForItem } from '../../../services/reviewsService';

jest.mock('../../../components/DoubleLineChart.jsx');

const getChartForItemMock = () => Promise.resolve(itemNoTopWords.chart);
jest.mock('../../../services/reviewsService', () => ({
  getChartForItem: jest.fn(),
}));

beforeEach(() => {
  getChartForItem.mockImplementation(getChartForItemMock);
});

describe('ItemChart tests', () => {
  describe('render tests', () => {
    test('ItemChart successful render works', () => {
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={0} />);

      const container = component.container.querySelector('#test');

      expect(container).not.toBeNull();
      expect(container).toBeVisible();
      expect(container.className).toBe('itemChart');

      expect(component.getByRole('button', { name: 'week' })).toBeVisible();
      expect(component.getByRole('button', { name: 'month' })).toBeVisible();

      expect(component.getByText(/888/)).toBeVisible();
      expect(component.getByText(/887/)).toBeVisible();
      expect(component.getByText(/testTime/)).toBeVisible();
      expect(component.getByText(/testYear/)).toBeVisible();
    });
    test('ItemChart no items render works', () => {
      const component = render(<ItemChart id="test" initData={[]} initLoading={0} />);

      expect(component.getByText('no data')).toBeVisible();
    });
    test('ItemChart loading (1) render works', () => {
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={1} />);

      expect(component.container.querySelector('#loading__beat')).toBeVisible();
    });
    test('ItemChart loading (2) render works', () => {
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={2} />);

      expect(component.container.querySelector('#loading__ellipsis')).toBeVisible();
      expect(component.getByRole('button', { name: 'week' })).toBeVisible();
      expect(component.getByRole('button', { name: 'month' })).toBeVisible();
    });
    test('ItemChart loading (2) render works', () => {
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={3} />);

      expect(component.getByText('an error ocurred, please reload')).toBeVisible();
      expect(component.getByRole('button', { name: 'week' })).toBeVisible();
      expect(component.getByRole('button', { name: 'month' })).toBeVisible();
    });
  });
  describe('functions work', () => {
    const states = [0, 2];
    test.each(states)('change to week works', async (state) => {
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={state} />);

      const week = component.getByRole('button', { name: 'week' });
      expect(component.queryByText(/loadedTime/)).not.toBeInTheDocument();

      await userEvent.click(week);

      expect(component.getByText(/loadedTime/)).toBeVisible();

      const selection = component.container.querySelector('#test__selector__active');
      expect(selection).toHaveStyle({
        left: '106px',
        width: '32px',
      });
    });
    test.each(states)('change to month works', async (state) => {
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={state} />);

      const month = component.getByRole('button', { name: 'month' });
      expect(component.queryByText(/loadedTime/)).not.toBeInTheDocument();

      await userEvent.click(month);

      expect(component.getByText(/loadedTime/)).toBeVisible();

      const selection = component.container.querySelector('#test__selector__active');
      expect(selection).toHaveStyle({
        left: '63px',
        width: '38px',
      });
    });
    test('change to month/week error works', async () => {
      getChartForItem.mockImplementation(() => Promise.reject());
      const component = render(<ItemChart id="test" initData={itemSuccess.chart} initLoading={0} />);

      const month = component.getByRole('button', { name: 'month' });

      await userEvent.click(month);

      expect(component.getByText('an error ocurred, please reload')).toBeVisible();
    });
  });
});
