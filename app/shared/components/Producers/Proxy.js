// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Header } from 'semantic-ui-react';

import ProducersButtonProxy from './Button/Proxy';

class ProducersProxy extends Component<Props> {
  render() {
    const {
      account,
      actions,
      isProxying,
      isValidUser,
      settings,
      system,
      t
    } = this.props;
    const proxyAccount = (account && account.voter_info) ? account.voter_info.proxy : '';
    return (
      <React.Fragment>
        {(isValidUser)
          ? (
            <ProducersButtonProxy
              actions={actions}
              isProxying={isProxying}
              proxyAccount={proxyAccount}
              settings={settings}
              system={system}
            />
          )
          : ''
        }
        {(isProxying)
          ? (
            <Header block color="blue" size="large">
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
