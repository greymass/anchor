/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import ColdWallet from '../../shared/containers/ColdWallet';
import Wallet from '../../modules/main/containers/Wallet';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Wallet} />
      <Route exact path="/coldwallet" component={ColdWallet} />
    </Switch>
  </HashRouter>
);
