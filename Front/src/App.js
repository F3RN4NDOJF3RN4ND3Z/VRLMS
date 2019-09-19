import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history"

import './App.css';
import routerList from "./Share/Router/Router";

const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
          {routerList.map( route => (<Route {...route}/>))}
      </Router>
    </div>
  );
}

export default App;
