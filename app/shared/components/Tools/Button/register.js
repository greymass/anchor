// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsModalRegister from '../Modal/Register';

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

class ToolsButtonRegister extends Component<Props> {
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
        actionName="PROXY"
        actions={actions}
        button={{
          color: 'blue',
          content: t('stake_button_cta'),
          icon: 'microchip'
        }}
        content={(
          <ToolsModalRegister
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

export default translate('stake')(ToolsButtonRegister);
