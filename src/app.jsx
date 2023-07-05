import {
  BrowserRouter as Router,
  Routes,
  Route,
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
   */
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LayoutsWithNav />}>
        <Route exact path="/home" element=<Home /> />
        <Route exact path="/all" element=<AllItems /> />
        <Route exact path="/item/:id" element=<Item /> />
        <Route exact path="/settings" element=<Settings /> />
      </Route>
      <Route exact path="/login" element=<Login /> />
    </Routes>
  </Router>
);

export default App;
