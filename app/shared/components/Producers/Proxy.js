// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header } from 'semantic-ui-react';

import ProducersButtonProxy from './Button/Proxy';

class ProducersProxy extends Component<Props> {
  render() {
    const {
      actions,
      keys,
      proxyAccount,
      system,
      t
    } = this.props;
    return (
      <div style={{ marginBottom: '20px' }}>
        {(proxyAccount)
          ? (
            <Header style={{ lineHeight: '50px', textAlign: 'center' }}>
              {`${t('producers_table_votes_proxied')} ${proxyAccount}.`}
            </Header>
          ) : ''}

        {((keys && keys.key))
          ? (
            <ProducersButtonProxy
              actions={actions}
              proxyAccount={proxyAccount}
              system={system}
            />
          ) : ''}
      </div>
    );
  }
}

export default translate('producers')(ProducersProxy);
