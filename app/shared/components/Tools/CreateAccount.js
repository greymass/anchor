// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment } from 'semantic-ui-react';

import GlobalTransactionHandler from '../Global/Transaction/Handler';
import ToolsFormCreateAccount from './Form/CreateAccount';
import CreateBitsharesEosAccount from './Form/CreateBitsharesEosAccount';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsCreateAccount extends Component<Props> {
  onClose = () => {
    this.props.actions.clearSystemState();
  };

  render() {
    const {
      accounts,
      actions,
      allBlockExplorers,
      balances,
      connection,
      globals,
      pubkeys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    const account = accounts[settings.account];

    const transaction = system && system.CREATEACCOUNT_LAST_TRANSACTION;

    return (
      <div>
        {(pubkeys.unlocked.includes(wallet.pubkey) || ['watch', 'ledger'].includes(settings.walletMode))
        ? (
          <Segment color="violet" piled style={{ margin: 0 }}>
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
              content={connection.chain === 'BEOS' ? (
                <CreateBitsharesEosAccount
                  account={account}
                  balance={balances[settings.account]}
                  connection={connection}
                  contacts={settings.contacts}
                  globals={globals}
                  hideCancel
                  key="CreateAccountForm"
                  system={system}
                  settings={settings}
                />
              ) : (
                <ToolsFormCreateAccount
                  account={account}
                  balance={balances[settings.account]}
                  connection={connection}
                  contacts={settings.contacts}
                  globals={globals}
                  hideCancel
                  key="CreateAccountForm"
                  system={system}
                  settings={settings}
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
