import React from "react";
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from "./views/Layout";
import Home from './views/Home';

// -----------------------------
// Core

export default class Root extends React.Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Home} />
                    <Route path="home/" component={Home}/>
                </Route>
            </Router>
        );
    }
}
