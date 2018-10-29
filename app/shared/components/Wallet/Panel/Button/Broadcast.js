// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import WalletModalContentBroadcast from '../../Modal/Content/Broadcast';

class WalletPanelButtonBroadcast extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      settings,
      system,
      t,
      transaction
    } = this.props;
    let {
      button
    } = this.props;
    if (!button) {
      button = {
        color: 'purple',
        content: t('wallet_panel_wallet_broadcast'),
        fluid: true,
        icon: 'wifi'
      };
    }
    return (
      <GlobalTransactionModal
        actionName="TRANSACTION_BROADCAST"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <WalletModalContentBroadcast
            actions={actions}
          />
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
