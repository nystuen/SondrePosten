// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert } from './components/alerts/alerts';
import { caseService } from './services';
import { CaseFeed } from './pages/caseFeed/caseFeed';
import { Case } from './pages/case/case';
import { NavBar } from './components/header/header';
import { LiveFeed } from './components/header/liveFeed';
import { Footer } from './components/footer/footer';
import { Category } from './components/category/category';
import { NewCase } from './pages/newCase/newCase';
import { ImportantCases } from './components/importantCases/importantCases';
import { EditCase } from './pages/editCase/editCase';

// Reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let script = document.createElement('script');
  script.src = '/reload/reload.js';
  if (document.body) document.body.appendChild(script);
}
import createHashHistory from 'history/createHashHistory';
//import 'bootstrap/dist/css/bootstrap.min.css';

export const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <NavBar />
        <LiveFeed />
        <Route exact path="/" component={ImportantCases} />
        <Route path="/reg" component={NewCase} />
        <Route exact path="/sak/:id" component={Case} />
        <Route exact path="/kat/:kat" component={Category} />
        <Route exact path="/endre/:id" component={EditCase} />
        <Footer />
      </div>
    </HashRouter>,
    root
  );
