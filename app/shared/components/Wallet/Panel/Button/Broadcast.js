// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import WalletModalContentBroadcast from '../../Modal/Content/Broadcast';

const { ipcRenderer } = require('electron');

class WalletPanelButtonBroadcast extends Component<Props> {
  broadcast = () => {
    ipcRenderer.send('openFile');
  }
  render() {
    const {
      actions,
      blockExplorers,
      settings,
      system,
      t,
      transaction
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="TRANSACTION_BROADCAST"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'purple',
          content: t('wallet_panel_wallet_broadcast'),
          fluid: true,
          icon: 'wifi'
        }}
        content={(
          <WalletModalContentBroadcast
            actions={actions}
          />
        )}
        icon="wifi"
        onOpen={this.broadcast}
        title={t('wallet_panel_wallet_broadcast')}
        settings={settings}
        system={system}
        transaction={transaction}
      />
    );
  }
}

export default translate('wallet')(WalletPanelButtonBroadcast);
