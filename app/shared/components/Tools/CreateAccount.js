// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment, Divider, Grid } from 'semantic-ui-react';

import ToolsButtonCreateAccount from './Button/CreateAccount';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsCreateAccount extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      globals,
      keys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    const account = accounts[settings.account];

    return (
      <Grid centered>
        <Grid.Column width={8} textAlign="center">
          {((keys && keys.key) || settings.walletMode === 'watch') ?
          (
            <div>
              <Header>
                {t('tools_create_account_header')}
              </Header>
              <Segment basic>
                <p>
                  {t('tools_create_account_text')}
                </p>
                <Divider />
                <ToolsButtonCreateAccount
                  account={account}
                  actions={actions}
                  balance={balances[settings.account]}
                  blockExplorers={blockExplorers}
                  globals={globals}
                  settings={settings}
                  system={system}
                />
              </Segment>
            </div>
          ) : (
            <WalletPanelLocked
              actions={actions}
              settings={settings}
              validate={validate}
              wallet={wallet}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default translate('tools')(ToolsCreateAccount);
