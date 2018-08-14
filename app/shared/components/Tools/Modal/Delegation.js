// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormDelegation from '../Form/Delegation';

class ToolsModalDelegation extends Component<Props> {
  render() {
    const {
      actions,
      contacts,
      contactToEdit,
      deleteContact,
      onClose,
      onSuccess,
      open,
      t,
      trigger
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="REGPROXY"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_proxy_button_register'),
          icon: 'share square'
        }}
        content={(
          <ToolsFormDelegation
            account={account}
            actions={actions}
            key="RegisterProxyForm"
            system={system}
          />
        )}
        icon="share square"
        title={t('tools_proxy_header_register')}
        settings={settings}
        system={system}
        onClose={onClose}
        open={open}
      />
    );
  }
}

export default translate('tools')(ToolsModalDelegation);
