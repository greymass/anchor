// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Header } from 'semantic-ui-react';

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
      <React.Fragment>
        {((keys && keys.key))
          ? (
            <ProducersButtonProxy
              actions={actions}
              proxyAccount={proxyAccount}
              system={system}
            />
          )
          : ''
        }
        {(proxyAccount)
          ? (
            <Header block size="large">
              <Icon name="circle info" />
              <Header.Content>
                <Header.Subheader>
                  {t('producers_table_votes_proxied')}
                </Header.Subheader>
                {proxyAccount}
              </Header.Content>
            </Header>
          )
          : ''
        }
      </React.Fragment>
    );
  }
}

export default translate('producers')(ProducersProxy);
