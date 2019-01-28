import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';

const renderApp = () => {
  render(
    <AppContainer>
      <Root />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderApp();
