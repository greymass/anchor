// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionModal from '../../Global/Transaction/Modal';
import ToolsFormCreateAccount from '../Form/CreateAccount';

class ToolsButtonCreateAccount extends Component<Props> {
  props: Props;

  render() {
    const {
      account,
      actions,
      blockExplorers,
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
        content={(
          <ToolsFormCreateAccount
            account={account}
            actions={actions}
            key="CreateAccountForm"
            system={system}
          />
        )}
        icon="share square"
        title={t('tools_create_account_header')}
        settings={settings}
        system={system}
      />
    );
  }
}

export default translate('tools')(ToolsButtonCreateAccount);
