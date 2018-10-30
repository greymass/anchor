// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormDelegation from '../Form/Delegation';

class ToolsModalDelegation extends Component<Props> {
  render() {
    const {
      account,
      actions,
      balance,
      blockExplorers,
      delegationToEdit,
      delegationToRemove,
      keys,
      onClose,
      openModal,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="STAKE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_delegation_modal_button_add'),
          floated: 'right',
          icon: 'plus'
        }}
        content={(
          <ToolsFormDelegation
            account={account}
            actions={actions}
            balance={balance}
            delegationToEdit={delegationToEdit}
            delegationToRemove={delegationToRemove}
            key="DelegationForm"
            keys={keys}
            onClose={onClose}
            settings={settings}
            system={system}
            validate={validate}
            wallet={wallet}
          />
        )}
        icon="microchip"
        onClose={onClose}
        openModal={openModal}
        settings={settings}
        system={system}
        title={t('tools_modal_delegation_header')}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
