import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import AllItems from './pages/allItems';
import Item from './pages/item';
import Settings from './pages/settings';
import Login from './pages/login';
import './styles/main.scss';
import LayoutsWithNav from './components/LayoutsWithNav';

/**
   * Basic structure for the application.
   * Routes as following:
   * /home > normal home page
   * /all > list of all items
   * /item > stats for single item
   * /settings > user settings
   *
   * GuardedRoute (in LayoutsWithNav) checks if user is logged in.
   * If not directs to login page otherwise to correct route.
   */
const App = () => (
  <Router>
    <Routes>
      <Route element={(
        <LayoutsWithNav />
        )}
      >
        <Route exact path="/home" element=<Home /> />
        <Route exact path="/all" element=<AllItems /> />
        <Route exact path="/item/:itemId" element=<Item /> />
        <Route exact path="/settings" element=<Settings /> />
      </Route>
      <Route exact path="/login" element=<Login /> />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  </Router>
);

export default App;
