import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import Layout from 'views/Layout';
import HomeView from 'views/HomeView';

const history = useRouterHistory(createHistory)({
  basename: window.location.pathname,
});

export default function Root() {
  return (
    <Router history={history}>
      <Route path="/" component={Layout} >
        <IndexRoute component={HomeView} />
        <Route path="/home" component={HomeView} />
      </Route>
    </Router>
  );
}
