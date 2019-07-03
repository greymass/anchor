// @flow
import React, { Component } from 'react';

import WalletPanelLocked from './Panel/Locked';
import WalletPanelUnlocked from './Panel/Unlocked';
import WalletPanelWaiting from './Panel/Waiting';

export default class WalletPanel extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      app,
      balances,
      blockchains,
      blockExplorers,
      chain,
      connection,
      globals,
      keys,
      settings,
      system,
      transaction,
      validate,
      wallet,
      jurisdictions
    } = this.props;

    let panel = false;

    if (settings.walletMode === 'wait') {
      return (
        <WalletPanelWaiting />
      );
    }

    if (wallet.data) {
      panel = (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
    }
    if ((keys && keys.key) || settings.walletMode === 'watch' || settings.walletMode === 'ledger') {
      panel = (
        <WalletPanelUnlocked
          accounts={accounts}
          actions={actions}
          app={app}
          balances={balances}
          blockchains={blockchains}
          blockExplorers={blockExplorers}
          chain={chain}
          connection={connection}
          globals={globals}
          settings={settings}
          system={system}
          transaction={transaction}
          validate={validate}
          jurisdictions={jurisdictions}
        />
      );
    }
    return (
      <div>
        {panel}
      </div>
    );
  }
}
