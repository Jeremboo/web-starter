import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from 'views/Layout';
import Home from 'views/Home';

export default function Root() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout} >
          <IndexRoute component={Home} />
          <Route path="home/" component={Home} />
      </Route>
    </Router>
  );
}
