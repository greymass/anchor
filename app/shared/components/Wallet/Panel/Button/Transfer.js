// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';
import WalletPanelFormTransfer from '../Form/Transfer';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  balances: {},
  settings: {},
  system: {}
};

class WalletPanelButtonTransfer extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      balances,
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="TRANSFER"
        actions={actions}
        button={{
          color: 'blue',
          content: t('transfer_button_cta'),
          icon: 'exchange'
        }}
        content={(
          <WalletPanelFormTransfer
            actions={actions}
            balances={balances}
            settings={settings}
            system={system}
          />
        )}
        icon="exchange"
        title={t('transfer_modal_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('transfer')(WalletPanelButtonTransfer);
