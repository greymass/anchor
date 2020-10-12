// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Segment, Divider } from 'semantic-ui-react';

import ToolsButtonRegisterProxy from './Button/RegisterProxy';
import ToolsButtonUnregisterProxy from './Button/UnregisterProxy';
import WalletPanelLocked from '../Wallet/Panel/Locked';
import ToolsFormProxyInfo from './Form/ProxyInfo';
import GlobalTransactionHandler from '../Global/Transaction/Handler';

class ToolsProxy extends Component<Props> {
  componentDidMount = () => {
    const { actions } = this.props;

    actions.getTable('regproxyinfo', 'regproxyinfo', 'proxies');
  };

  render() {
    const {
      accounts,
      actions,
      allBlockExplorers,
      connection,
      contracts,
      pubkeys,
      settings,
      system,
      validate,
      wallet,
      t,
      tables
    } = this.props;

    const account = accounts[settings.account];
    let isProxy = false;
    if (account && account.voter_info && account.voter_info.is_proxy) {
      isProxy = account.voter_info.is_proxy;
    }

    const contract = system && system.SET_REGPROXYINFO_LAST_CONTRACT;
    const transaction = system && system.SET_REGPROXYINFO_LAST_TRANSACTION;

    return (pubkeys.unlocked.includes(wallet.pubkey) || ['watch', 'ledger'].includes(settings.walletMode))
      ? (
        <Segment color="violet" piled style={{ margin: 0 }}>
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
              blockExplorers={allBlockExplorers[connection.chainKey]}
              settings={settings}
              system={system}
            />
          </Segment>
          <Segment style={(!isProxy) ? ({ display: 'none' }) : {}} basic>
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
              blockExplorers={allBlockExplorers[connection.chainKey]}
              settings={settings}
              system={system}
            />

            {(connection.supportedContracts.includes('regproxyinfo')) && (
              <GlobalTransactionHandler
                actionName="SET_REGPROXYINFO"
                actions={actions}
                blockExplorers={allBlockExplorers[connection.chainKey]}
                content={(
                  <ToolsFormProxyInfo
                    account={account}
                    actions={actions}
                    blockExplorers={allBlockExplorers[connection.chainKey]}
                    contracts={contracts}
                    isProxy={isProxy}
                    settings={settings}
                    system={system}
                    tables={tables}
                    transaction={transaction}
                  />
                )}
                contract={contract}
                hideClose
                onClose={this.onClose}
                settings={settings}
                system={system}
                transaction={transaction}
              />
            )}
          </Segment>
        </Segment>
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

export default withTranslation('tools')(ToolsProxy);
