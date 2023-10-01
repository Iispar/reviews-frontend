import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import GuardedRoute from '../../../helpers/GuardedRoute';

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
