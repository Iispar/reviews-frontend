import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { useTextWidth, useVerticalPoints } from '../helpers/componentHelpers';
import { useGetLocalStorage } from '../helpers/helperHooks';
import parseInputFile from '../helpers/ParseInputFile';
import GuardedRoute from '../helpers/GuardedRoute';

beforeEach(() => {
  window.localStorage.clear();
});

describe('helpers tests', () => {
  describe('componentHelpers tests', () => {
    const widths = [
      ['test text one', 54.4775390625],
      ['test two', 34.4580078125],
      ['test number three which is a bit longer', 168.974609375],
    ];
    test.each(widths)('useTextWidth works', (text, ans) => {
      expect(useTextWidth(text)).toBe(ans, 'mulish.ttf');
    });
    const verticalPoints = [
      [5, [
        138,
        280,
        422,
        564,
        706,
      ]],
      [7, [
        97.42857142857143,
        198.85714285714286,
        300.2857142857143,
        401.7142857142857,
        503.14285714285717,
        604.5714285714286,
        706,
      ]],
      [9, [
        74.88888888888889,
        153.77777777777777,
        232.66666666666666,
        311.55555555555554,
        390.44444444444446,
        469.33333333333337,
        548.2222222222223,
        627.1111111111112,
        706.0000000000001,
      ]],
    ];
    test.each(verticalPoints)('verticalPoints works', (text, ans) => {
      expect(useVerticalPoints(text)).toStrictEqual(ans);
    });
  });
  describe('GuarderRoute tests', () => {
    test('GuarderRoute loggedOut works', () => {
      const component = render(
        <BrowserRouter>
          <Routes>
            <Route element={(
              <GuardedRoute />
                )}
            >
              <Route path="*" element={(<div> test </div>)} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      expect(component.queryByText('test')).not.toBeInTheDocument();
    });
    test('GuarderRoute loggedIn works', () => {
      window.localStorage.setItem('token', 'test');
      const component = render(
        <BrowserRouter>
          <Routes>
            <Route element={(
              <GuardedRoute />
                  )}
            >
              <Route path="*" element={(<div> test </div>)} />
            </Route>
          </Routes>
        </BrowserRouter>,
      );

      expect(component.getByText('test')).toBeVisible();
    });
  });
  describe('helperHooks tests', () => {
    test('useGetLocalStorage works', () => {
      window.localStorage.setItem('token', 'test token');
      window.localStorage.setItem('accountId', 'test id');

      expect(useGetLocalStorage()).toStrictEqual({ accountId: 'test id', token: 'test token' });
    });
  });
  describe('parseInputFile tests', () => {
    test('parseInputFile works', async () => {
      const file = new File(['{"result":true, "count":42}'], 'filename.json', { type: 'text/html' });
      expect(await parseInputFile(file)).toStrictEqual({ result: true, count: 42 });
    });
  });
});
