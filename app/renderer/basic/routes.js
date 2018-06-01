/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import BasicVoter from '../../shared/containers/BasicVoter';
import Welcome from '../../shared/containers/Welcome';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/voter" component={BasicVoter} />
    </Switch>
  </HashRouter>
);
