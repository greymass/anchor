// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormRamSell from '../../Form/Ram/Sell';

type Props = {
  account: {},
  actions: {
    clearSystemState: () => void
  },
  balances: {},
  blockExplorers: {},
  globals: {},
  settings: {},
  system: {},
  t: () => void
};

class WalletPanelButtonRamSell extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      account,
      balances,
      blockExplorers,
      connection,
      globals,
      settings,
      system,
      disabled,
      t,
      trigger
    } = this.props;
    let button = {
      color: 'blue',
      content: t('ram_sell_button_cta'),
      fluid: true,
      icon: 'database',
      disabled
    };
    if (trigger) {
      button = trigger;
    }
    return (
      <GlobalTransactionModal
        actionName="SELLRAM"
        actions={actions}
        blockExplorers={blockExplorers}
        content={(
          <WalletPanelFormRamSell
            account={account}
            actions={actions}
            balances={balances}
            connection={connection}
            globals={globals}
            settings={settings}
            system={system}
          />
        )}
        customTrigger={button}
        title={t('ram_sell_modal_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('ram')(WalletPanelButtonRamSell);
