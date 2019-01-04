// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormCreateAccount from '../Form/CreateAccount';
import ToolsFormCreateBitsharesEosAccount from '../Form/CreateBitsharesEosAccount';

class ToolsButtonCreateAccount extends Component<Props> {
  props: Props;

  render() {
    const {
      account,
      actions,
      balance,
      blockExplorers,
      connection,
      globals,
      settings,
      system,
      t
    } = this.props;

    return (
      <GlobalTransactionModal
        actionName="CREATEACCOUNT"
        actions={actions}
        blockExplorers={blockExplorers}
        button={{
          color: 'blue',
          content: t('tools_button_create_account'),
          icon: 'share square'
        }}
        content={ connection.chain === "BEOS" ? (
          <ToolsFormCreateBitsharesEosAccount
            account={account}
            actions={actions}
            balance={balance}
            connection={connection}
            contacts={settings.contacts}
            globals={globals}
            key="CreateAccountForm"
            system={system}
          /> : (
            <ToolsFormCreateAccount
            account={account}
            actions={actions}
            balance={balance}
            connection={connection}
            contacts={settings.contacts}
            globals={globals}
            key="CreateAccountForm"
            system={system}
          />
          )
        )}
        icon="share square"
        title={t('tools_create_account_header')}
        settings={settings}
        size="large"
        system={system}
      />
    );
  }
}

export default translate('tools')(ToolsButtonCreateAccount);
