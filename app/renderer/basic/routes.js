/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import BasicVoter from '../../shared/containers/BasicVoter';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={BasicVoter} />
    </Switch>
  </HashRouter>
);
