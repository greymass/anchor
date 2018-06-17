/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import BasicVoter from '../../shared/containers/BasicVoter';
import ColdStorage from '../../shared/containers/ColdStorage';
import Welcome from '../../shared/containers/Welcome';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/coldstorage" component={ColdStorage} />
      <Route exact path="/voter" component={BasicVoter} />
    </Switch>
  </HashRouter>
);
