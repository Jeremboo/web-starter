import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'mobx-react';

import Layout from 'views/Layout';
import HomeView from 'views/HomeView';

import store from './store';

const history = useRouterHistory(createHistory)({
  basename: window.location.pathname,
  // basename: process.env.BASENAME,
});

export default function Root() {
  return (

    <Provider {...store} >
      <Router history={history}>
        <Route path="/" component={Layout} >
          <IndexRoute component={HomeView} />
          <Route path="/home" component={HomeView} />
        </Route>
      </Router>
    </Provider>
  );
}
