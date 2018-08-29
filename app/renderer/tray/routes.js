/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import TrayMenu from '../../shared/containers/Tray/Menu';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={TrayMenu} />
    </Switch>
  </HashRouter>
);
