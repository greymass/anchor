// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormBidName from '../Form/BidName';

class ToolsModalDelegation extends Component<Props> {
  render() {
    const {
      account,
      actions,
      balance,
      blockExplorers,
      bidNameToRemove,
      connection,
      keys,
      onClose,
      onOpen,
      openModal,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="BIDNAME"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_bid_name_modal_button_add'),
          floated: 'right',
          icon: 'plus'
        }}
        content={(
          <ToolsFormBidName
            account={account}
            actions={actions}
            balance={balance}
            bidNameToRemove={bidNameToRemove}
            connection={connection}
            key="BidNameForm"
            keys={keys}
            onClose={onClose}
            settings={settings}
            system={system}
            validate={validate}
            wallet={wallet}
          />
        )}
        icon="sticky note outline"
        onClose={onClose}
        onOpen={onOpen}
        openModal={openModal}
        settings={settings}
        system={system}
        title={t('tools_modal_bid_name_header')}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
