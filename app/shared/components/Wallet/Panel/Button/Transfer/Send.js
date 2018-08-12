// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormTransfer from '../../Form/Transfer/Send';

type Props = {
  actions: {
    clearSystemState: () => void
  },
  blockExplorers: {},
  balances: {},
  settings: {},
  system: {},
  t: () => void
};

class WalletPanelButtonTransfer extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      blockExplorers,
      balances,
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="TRANSFER"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('transfer_send_button_cta'),
          fluid: true,
          icon: 'arrow circle up'
        }}
        content={(
          <WalletPanelFormTransfer
            actions={actions}
            balances={balances}
            settings={settings}
            system={system}
          />
        )}
        icon="arrow circle up"
        title={t('transfer_modal_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('transfer')(WalletPanelButtonTransfer);
