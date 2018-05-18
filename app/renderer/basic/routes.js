/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import Index from './containers/Index';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
    </Switch>
  </HashRouter>
);
