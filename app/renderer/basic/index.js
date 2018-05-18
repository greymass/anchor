import React from 'react';
import { render } from 'react-dom';

import Root from '../../shared/containers/Root';
import Routes from './routes';

const doc = document.getElementById('root');

render(<Root routes={Routes} />, doc);

if (module.hot) {
  module.hot.accept('../../shared/containers/Root', () => {
    const NextRoot = require('../../shared/containers/Root'); // eslint-disable-line global-require
    render(<NextRoot routes={Routes} />, doc);
  });
}
