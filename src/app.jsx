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
import Login from './pages/login'


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
      <Route exact path="/" element=<Login /> />
      <Route exact path="/home" element=<Home /> />
      <Route exact path="/all" element=<AllItems /> />
      <Route exact path="/item" element=<Item /> />
      <Route exact path="/settings" element=<Settings /> />
    </Routes>
  </Router>
);

export default App;
