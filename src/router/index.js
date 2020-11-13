import React, { Suspense } from 'react';
import {
    HashRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import config from './config';

export default (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                {config.map((item) => (
                    <Route
                        exact={item.path === '/'}
                        path={item.path}
                        component={item.component}
                    />
                ))}
            </Switch>
        </Suspense>
    </Router>
);
