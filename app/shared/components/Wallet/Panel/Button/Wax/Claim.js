// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Segment } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../../Global/Transaction/Modal';

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

class WalletPanelButtonWaxClaim extends Component<Props> {
  props: Props;

  onConfirm = () => {
    const { actions, settings } = this.props;

    actions.claimgbmrewards(settings.account);
  };

  render() {
    const {
      actions,
      blockExplorers,
      settings,
      system,
      t
    } = this.props;
    return (
      <GlobalTransactionModal
        actionName="WAX_CLAIMGBMREWARDS"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('wax_claim_title'),
          fluid: true,
          icon: 'arrow down',
        }}
        content={(
          <Segment loading={system.WAX_CLAIMGBMREWARDS === 'PENDING'}>
            <Header
              content={t('wax_claim_confirmation_message')}
            />
            <Button
              style={{ margin: 20 }}
              content={t('shared:confirm')}
              onClick={this.onConfirm}
            />
          </Segment>
        )}
        icon="arrow down"
        title={t('wax_claim_title')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('wax')(WalletPanelButtonWaxClaim);
