// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Header } from 'semantic-ui-react';

import ProducersButtonProxy from './Proxy/Button/Proxy';

class ProducersProxy extends Component<Props> {
  render() {
    const {
      account,
      accounts,
      actions,
      addProxy,
      blockExplorers,
      currentProxy,
      isProxying,
      isValidUser,
      onClose,
      removeProxy,
      settings,
      system,
      t,
      tables
    } = this.props;
    const proxyAccount = (account && account.voter_info) ? account.voter_info.proxy : '';

    return (
      <React.Fragment>
        {(isValidUser)
          ? (
            <ProducersButtonProxy
              accounts={accounts}
              actions={actions}
              addProxy={addProxy}
              blockExplorers={blockExplorers}
              currentProxy={currentProxy}
              onClose={onClose}
              isProxying={isProxying}
              proxyAccount={proxyAccount}
              removeProxy={removeProxy}
              settings={settings}
              system={system}
              tables={tables}
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
