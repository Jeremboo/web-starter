
import React from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from 'views/Layout';
import Home from 'views/Home';

const history = createBrowserHistory({
  basename: process.env.BASENAME.length > 0 ? process.env.BASENAME : window.location.pathname,
});

export const openPath = (path) => {
  if (history.getCurrentLocation().pathname !== path) {
    history.push(path);
  }
};

const Root = () => (
  <Router history={history}>
    <Layout>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
    </Layout>
  </Router>
);

export default Root;
