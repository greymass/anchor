// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash'

import { Header, Segment, Divider } from 'semantic-ui-react';

import ToolsButtonRegisterProxy from './Button/RegisterProxy';
import ToolsButtonUnregisterProxy from './Button/UnregisterProxy';
import WalletPanelLocked from '../Wallet/Panel/Locked';
import ToolsFormProxyInfo from './Form/ProxyInfo';

class ToolsProxy extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      contracts,
      keys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    const account = accounts[settings.account];
    let isProxy = false;
    if (account && account.voter_info && account.voter_info.is_proxy) {
      isProxy = account.voter_info.is_proxy;
    }

    return ((keys && keys.key) || settings.walletMode === 'watch')
      ? (
        <React.Fragment>
          <Header>
            {t('tools_proxy_header_registration')}
          </Header>
          <Segment style={(isProxy) ? ({ display: 'none' }) : {}} basic>
            <p>
              {t('tools_proxy_text_not_registered')}
            </p>
            <Divider />
            <ToolsButtonRegisterProxy
              account={account}
              actions={actions}
              blockExplorers={blockExplorers}
              settings={settings}
              system={system}
            />
          </Segment>
          <Segment textAlign="center" style={(!isProxy) ? ({ display: 'none' }) : {}} basic>
            <p>
              {t('tools_proxy_text_registered')}
            </p>
            <Divider />
            <p>
              {settings.account}
            </p>
            <Divider />
            <ToolsButtonUnregisterProxy
              account={account}
              actions={actions}
              blockExplorers={blockExplorers}
              settings={settings}
              system={system}
            />

            {(isProxy && findIndex(contracts, { account: settings.account }) === -1)
              ? (
                <ToolsFormProxyInfo
                  account={account}
                  actions={actions}
                  blockExplorers={blockExplorers}
                  settings={settings}
                  system={system}
                />
              ) : ''}

          </Segment>
        </React.Fragment>
      )
      : (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
  }
}

export default translate('tools')(ToolsProxy);
