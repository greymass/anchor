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
      globals,
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="SELLRAM"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('ram_sell_button_cta'),
          fluid: true,
          icon: 'database'
        }}
        content={(
          <WalletPanelFormRamSell
            account={account}
            actions={actions}
            balances={balances}
            globals={globals}
            settings={settings}
            system={system}
          />
        )}
        icon="database"
        title={t('ram_sell_modal_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('ram')(WalletPanelButtonRamSell);
