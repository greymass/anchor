// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Segment, Header } from 'semantic-ui-react';

import GlobalTransactionModal from '../../../Global/Transaction/Modal';

class WalletPanelButtonBroadcast extends Component<Props> {
  claimUnstaked = () => {
    const {
      actions,
      settings
    } = this.props;

    const {
      claimUnstaked
    } = actions;

    claimUnstaked(settings.account);
  }

  render() {
    const {
      actions,
      blockExplorers,
      connection,
      settings,
      system,
      t,
      totalBeingUnstaked,
      transaction
    } = this.props;
    let {
      button
    } = this.props;

    if (!button) {
      button = {
        color: 'blue',
        content: t('wallet_status_resources_claim_unstaked'),
        floated: 'right',
        fluid: false,
        size: 'mini'
      };
    }

    const { chainSymbol } = connection;

    return (
      <GlobalTransactionModal
        actionName="REFUND"
        actions={actions}
        blockExplorers={blockExplorers}
        button={button}
        content={(
          <Segment
            basic
            style={{ height: '150px' }}
            textAlign="center"
            loading={system.REFUND === 'PENDING'}
          >
            <Header
              content={t('wallet_status_resources_to_unstake', { totalBeingUnstaked, chainSymbol })}
            />
            <Button
              color="blue"
              content={t('wallet_status_resources_claim_unstaked')}
              onClick={this.claimUnstaked}
            />
          </Segment>
        )}
        title={t('wallet_status_resources_claim_unstaked')}
        settings={settings}
        system={system}
        transaction={transaction}
      />
    );
  }
}

export default translate('wallet')(WalletPanelButtonBroadcast);
