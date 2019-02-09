// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Segment, Header, Message } from 'semantic-ui-react';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import WalletPanelLocked from '../../Wallet/Panel/Locked';

class ToolsModalAirgrab extends Component<Props> {
  confirmClaim = () => {
    const { actions, airgrab } = this.props;

    actions.claimairgrab(airgrab);
  };

  render() {
    const {
      actions,
      airgrab,
      blockExplorers,
      keys,
      onClose,
      onOpen,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="CLAIMAIRGRAB"
        actions={actions}
        blockExplorers={blockExplorers}
        button={false}
        content={((keys && keys.key) || settings.walletMode === 'watch' || settings.walletMode === 'ledger') ? (
          <Segment loading={system.CLAIMAIRGRAB === 'PENDING'} basic>
            <Message
              content={t('tools_airgrabs_message_warning')}
              icon="warning sign"
              warning
            />
            <Header
              content={t('tools_modal_airgrab_header', { symbol: airgrab.symbol })}
            />
            <p>
              {t('tools_modal_airgrab_subheader')}
            </p>
            <hr style={{ marginTop: '30px', marginBottom: '30px' }} />
            <Button
              onClick={this.confirmClaim}
              content={t('tools_modal_airgrab_button')}
            />
          </Segment>
        ) : (
          <WalletPanelLocked
            actions={actions}
            settings={settings}
            validate={validate}
            wallet={wallet}
          />
          )}
        icon="arrow down"
        onClose={onClose}
        onOpen={onOpen}
        openModal
        settings={settings}
        system={system}
        title={t('tools_modal_airgrab_title')}
      />
    );
  }
}

export default translate('tools')(ToolsModalAirgrab);
