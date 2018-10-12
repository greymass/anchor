// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';

import GlobalTransactionHandler from '../Global/Transaction/Handler';
import ToolsFormCreateAccount from './Form/CreateAccount';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsCreateAccount extends Component<Props> {
  onClose = () => {
    this.props.actions.clearSystemState();
  }

  render() {
    const {
      accounts,
      actions,
      allBlockExplorers,
      balances,
      connection,
      globals,
      keys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    if (settings.walletMode === 'ledger') {
      return (
        <Segment>
          <Header
            content={t('tools_create_account_unavailable_header')}
            icon="warning sign"
            subheader={t('tools_create_account_unavailable_subheader')}
          />
        </Segment>
      );
    }

    const account = accounts[settings.account];

    const transaction = system && system.CREATEACCOUNT_LAST_TRANSACTION;

    return (
      <div>
        {((keys && keys.key) || ['watch', 'ledger'].includes(settings.walletMode))
        ? (
          <Segment basic>
            <Header>
              {t('tools_create_account_header')}
              <Header.Subheader>
                {t('tools_create_account_description', { chainSymbol: connection.chainSymbol })}
              </Header.Subheader>
            </Header>
            <GlobalTransactionHandler
              actionName="CREATEACCOUNT"
              actions={actions}
              blockExplorers={allBlockExplorers[connection.chainKey]}
              content={(
                <ToolsFormCreateAccount
                  account={account}
                  balance={balances[settings.account]}
                  connection={connection}
                  contacts={settings.contacts}
                  globals={globals}
                  hideCancel
                  key="CreateAccountForm"
                  system={system}
                />
              )}
              onClose={this.onClose}
              settings={settings}
              system={system}
              transaction={transaction}
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
      </div>
    );
  }
}

export default translate('tools')(ToolsCreateAccount);
