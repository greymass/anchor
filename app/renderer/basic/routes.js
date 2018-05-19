/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import Producers from '../../shared/containers/Producers';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Producers} />
    </Switch>
  </HashRouter>
);
