// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment, Divider } from 'semantic-ui-react';

import ToolsFormBidName from './Form/BidName';
import ToolsButtonProxyUnregister from './Button/Unregister';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsProxy extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
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

    return ((keys && keys.key) || settings.walletMode === 'watch') ?
      (
        <Segment basic>
          <Header>
            {t('tools_bid_name_header')}
            <Header.Subheader>
              {t('tools_bid_name_text')}
            </Header.Subheader>
          </Header>
          <GlobalTransactionHandler
            actionName="BIDNAME"
            actions={actions}
            blockExplorers={blockExplorers}
            content={(
              <ToolsFormBidName
                account={account}
                balance={balances[settings.account]}
                contacts={settings.contacts}
                globals={globals}
                hideCancel
                key="BidNameForm"
                system={system}
              />
            )}
            onClose={this.onClose}
            settings={settings}
            system={system}
            transaction={transaction}
          />
        </Segment>
      ) : (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      )
  }
}

export default translate('tools')(ToolsProxy);
