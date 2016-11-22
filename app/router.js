import React from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

import Layout from 'views/Layout';
import Home from 'views/Home';

const history = useRouterHistory(createHistory)({
  basename: window.location.pathname,
  // basename: process.env.BASENAME,
});

export default function Root() {
  return (
    <Router history={history}>
      <Route path="/" component={Layout} >
          <IndexRoute component={Home} />
          <Route path="/home" component={Home} />
      </Route>
    </Router>
  );
}
