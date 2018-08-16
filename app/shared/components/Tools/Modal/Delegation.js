// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormDelegation from '../Form/Delegation';

class ToolsModalDelegation extends Component<Props> {
  render() {
    const {
      actions,
      blockExplorers,
      delegationToEdit,
      delegationToRemove,
      onClose,
      open,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="STAKE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_modal_delegation_add'),
          fluid: true,
          icon: 'share square'
        }}
        content={(
          <ToolsFormDelegation
            actions={actions}
            delegationToEdit={delegationToEdit}
            delegationToRemove={delegationToRemove}
            key="DelegationForm"
            system={system}
          />
        )}
        icon="share square"
        title={t('tools_modal_delegation_header')}
        onClose={onClose}
        open={open}
        system={system}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
