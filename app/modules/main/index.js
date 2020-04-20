import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import Routes from './routes';

const { withTranslation, translate } = require('react-i18next')
// import i18n from 'react-i18next';
console.log({withTranslation});
console.log({translate})

const renderApp = routes => {
  render(
    <AppContainer>
      <Root routes={routes} />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes');
    renderApp(newRoutes);
  });
}
