// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormRamBuy from '../../Form/Ram/Buy';

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
  t: () => void,
  jurisdictions: {}
};

class WalletPanelButtonRamBuy extends Component<Props> {
  props: Props;

  render() {
    const {
      account,
      actions,
      balances,
      blockExplorers,
      connection,
      globals,
      settings,
      system,
      disabled,
      t,
      jurisdictions
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="BUYRAM"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('ram_buy_button_cta'),
          fluid: true,
          icon: 'database',
          disabled: disabled
        }}
        content={(
          <WalletPanelFormRamBuy
            account={account}
            actions={actions}
            balance={balances[settings.account]}
            connection={connection}
            globals={globals}
            settings={settings}
            system={system}
            jurisdictions={jurisdictions}
          />
        )}
        icon="database"
        title={t('ram_buy_modal_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('ram')(WalletPanelButtonRamBuy);
