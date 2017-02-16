import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './Layout';
import HomeView from './HomeView';

const Root = ({ store }) => {
  const browserHistory = useRouterHistory(createHistory)({
    basename: process.env.BASENAME.length > 0 ? process.env.BASENAME : window.location.pathname,
  });

  const history = syncHistoryWithStore(
    browserHistory,
    store,
  );
  
  export const openPath = (path) => {
    if (history.getCurrentLocation().pathname !== path) {
      history.push(path);
    }
  };

  return (
    <Provider store={store} >
      <Router history={history}>
        <Route path="/" component={Layout} >
          <IndexRoute component={HomeView} />
          <Route path="/home" component={HomeView} />
        </Route>
      </Router>
    </Provider>
  );
};
Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
