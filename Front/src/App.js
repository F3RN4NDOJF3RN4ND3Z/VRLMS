import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import { createBrowserHistory } from "history"

import './App.css';
import routerList from "./Share/Router/Router";

const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
    
      <Router history={history}>
        <Navigation></Navigation>
          {routerList.map( route => (<Route {...route}/>))}
      </Router>
    </div>
  );
}

export default App;
