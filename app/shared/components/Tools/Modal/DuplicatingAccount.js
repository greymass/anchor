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
      connection,
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
      <Modal
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
          <div>
            <Select onSelect={() => actions.swapBlockchain(chainId)}>
              Select Blockchain
            </Select>
          </div>
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
