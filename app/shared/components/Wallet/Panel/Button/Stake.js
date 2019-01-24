// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import WalletPanelFormStake from '../Form/Stake';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  accounts: {},
  balances: {},
  blockExplorers: {},
  settings: {},
  validate: {},
  system: {},
  t: () => void
};

class WalletPanelButtonStake extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      connection,
      settings,
      validate,
      system,
      disabled,
      t
    } = this.props;

    const account = accounts[settings.account];
    if(!account) {
      return (null);
    }

    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    return (
      <GlobalTransactionModal
        actionName="STAKE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('stake_button_text', { chainSymbol: connection.chainSymbol }),
          fluid: true,
          icon: 'microchip',
          disabled: disabled
        }}
        content={(
          <WalletPanelFormStake
            account={account}
            accountName={settings.account}
            actions={actions}
            balance={balances[settings.account]}
            connection={connection}
            cpuAmount={Decimal(String(cpu_weight).split(' ')[0])}
            key="StakeForm"
            netAmount={Decimal(String(net_weight).split(' ')[0])}
            onClose={this.onClose}
            settings={settings}
            system={system}
            validate={validate}
          />
        )}
        icon="microchip"
        title={t('update_staked_coins')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('stake')(WalletPanelButtonStake);
