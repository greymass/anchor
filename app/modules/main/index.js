import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from '../../shared/store/renderer/configureStore';
import Root from './containers/Root';
import Routes from './routes';

const { store } = configureStore();

class Index extends Component<Props> {
  render() {
    return (
      <AppContainer>
        <Root
          history={history}
          routes={this.props.routes}
          store={store}
        />
      </AppContainer>
    );
  }
}

Index.childContextTypes = {
  persistor: PropTypes.object
};

const renderApp = routes => {
  render(
    <Index routes={routes} />,
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
