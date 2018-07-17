// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment, Divider, Grid } from 'semantic-ui-react';

import ToolsButtonCreateAccount from './Button/CreateAccount';
import WalletPanelLocked from '../Wallet/Panel/Locked';

class ToolsNewAccount extends Component<Props> {
  render() {
    const {
      accounts,
      actions,
      blockExplorers,
      keys,
      settings,
      system,
      validate,
      wallet,
      t
    } = this.props;

    const account = accounts[settings.account];
    let isProxy = false;
    if (account && account.voter_info && account.voter_info.is_proxy) {
      isProxy = account.voter_info.is_proxy;
    }

    return (
      <Grid centered>
        <Grid.Column width={8} style={{ textAlign: 'center' }} >
          {((keys && keys.key) || settings.walletMode === 'watch') ?
          (
            <div>
              <Header>
                {t('tools_new_account_header')}
              </Header>
              <Segment basic>
                <p>
                  {t('tools_new_account_text')}
                </p>
                <Divider />
                <ToolsButtonCreateAccount
                  account={account}
                  actions={actions}
                  blockExplorers={blockExplorers}
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

export default translate('tools')(ToolsNewAccount);
