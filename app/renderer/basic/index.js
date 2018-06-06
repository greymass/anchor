import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';


import Root from '../../shared/containers/Root';
import Routes from './routes';


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
