/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import Prompt from '../../modules/handler/containers/Prompt';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Prompt} />
    </Switch>
  </HashRouter>
);
