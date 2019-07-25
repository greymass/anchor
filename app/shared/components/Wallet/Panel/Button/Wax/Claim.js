// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';
import WalletPanelFormRamBuy from '../../Form/Ram/Buy';
import { Button } from 'semantic-ui-react';

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

class WalletPanelButtonRamBuy extends Component<Props> {
  props: Props;

  onConfirm = () => {
    const { actions, settings } = this.props;

    actions.waxClaimGenesis(settings.account);
  }

  render() {
    const {
      account,
      actions,
      balances,
      blockExplorers,
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="WAX_CLAIMGENESIS"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('ram_buy_button_cta'),
          fluid: true,
          icon: 'arrow down',
        }}
        content={(
          <Segment>
            <Header
              content={t('wac_claim_confirmation_message')}
            />
            <Button
              style={{ margin: 20 }}
              content={t('shared:confirm')}
              onClick={this.onConfirm}
            />
          </Segment>
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
