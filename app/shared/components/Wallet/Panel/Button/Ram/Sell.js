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
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="SELLRAM"
        actions={actions}
        button={{
          color: 'blue',
          content: t('sell_ram_send_button_cta'),
          icon: 'arrow circle up'
        }}
        content={(
          <WalletPanelFormRamSell
            account={account}
            actions={actions}
            balances={balances}
            settings={settings}
            system={system}
          />
        )}
        icon="arrow circle up"
        title={t('sell_ram_modal_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('ram')(WalletPanelButtonRamSell);
