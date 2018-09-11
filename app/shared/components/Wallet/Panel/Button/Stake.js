// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

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
      settings,
      validate,
      system,
      t,
      connection
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="STAKE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('stake_button_cta', {tokenSymbol:settings.blockchain.prefix}),
          fluid: true,
          icon: 'microchip'
        }}
        content={(
          <WalletPanelFormStake
            account={accounts[settings.account]}
            key="StakeForm"
            settings={settings}
            actions={actions}
            onClose={this.onClose}
            validate={validate}
            balance={balances[settings.account]}
            system={system}
            connection={connection}
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
