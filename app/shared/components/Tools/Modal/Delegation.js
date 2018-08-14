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
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="STAKE"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_proxy_button_register'),
          fluid: true,
          icon: 'share square'
        }}
        content={(
          <ToolsFormDelegation
            actions={actions}
            delegationToEdit={delegationToEdit}
            delegationToRemove={delegationToRemove}
            key="DelegationForm"
          />
        )}
        icon="share square"
        title={t('tools_proxy_header_register')}
        onClose={onClose}
        open={open}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
