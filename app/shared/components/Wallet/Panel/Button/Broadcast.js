// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Icon, Menu } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import WalletModalContentBroadcast from '../../Modal/Content/Broadcast';

class WalletPanelButtonBroadcast extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      color,
      settings,
      system,
      t,
      transaction
    } = this.props;
    // Prevent render in cold wallet
    if (settings.walletMode === 'cold') return false;
    return (
      <GlobalTransactionModal
        actionName="TRANSACTION_BROADCAST"
        actions={actions}
        blockExplorers={blockExplorers}
        content={(
          <WalletModalContentBroadcast
            actions={actions}
            settings={settings}
          />
        )}
        customTrigger={(
          <Menu.Item
            as="a"
            style={{ color }}
          >
            <Icon name="wifi" size="large" />
            {(!settings.sidebarCollapsed)
              ? <p>Broadcast Transaction</p>
              : false
            }
          </Menu.Item>
        )}
        icon="wifi"
        title={t('wallet_panel_wallet_broadcast')}
        settings={settings}
        system={system}
        transaction={transaction}
      />
    );
  }
}

export default translate('wallet')(WalletPanelButtonBroadcast);
