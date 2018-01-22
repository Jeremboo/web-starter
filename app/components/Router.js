
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from 'containers/Layout';
import Home from 'containers/Home';

const basename = process.env.BASENAME;

// Hash router to have multi basename
const Root = () => (
  <BrowserRouter basename={basename}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Layout>
        <Route exact path="/home" component={Home} />
      </Layout>
    </Switch>
  </BrowserRouter>
);

export default Root;
