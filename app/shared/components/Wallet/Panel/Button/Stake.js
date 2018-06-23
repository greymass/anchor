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
  settings: {},
  validate: {},
  system: {}
};

class WalletPanelButtonStake extends Component<Props> {
  props: Props;

  state = {
    open: false
  }

  render() {
    const {
      actions,
      accounts,
      balances,
      settings,
      validate,
      system,
      t
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <GlobalTransactionModal
        actionName="STAKE"
        actions={actions}
        button={{
          color: 'blue',
          content: t('stake_button_cta'),
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
