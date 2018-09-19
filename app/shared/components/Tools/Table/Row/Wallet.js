// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Label, Popup, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../../../containers/Global/Button/Elevate';
import GlobalFragmentAuthorization from '../../../Global/Fragment/Authorization';
import EOSAccount from '../../../../utils/EOS/Account';

class ToolsTableRowWallet extends Component<Props> {
  removeWallet = (account) => {
    const { actions } = this.props;
    actions.removeWallet(account);
  }
  swapWallet = (account, password = false) => {
    const { actions } = this.props;
    actions.useWallet(account);
    if (password) {
      actions.unlockWallet(password);
    }
  }
  render() {
    const {
      current,
      settings,
      t,
      validate,
      wallet,
    } = this.props;
    const {
      account,
      accountData,
      mode,
      pubkey
    } = wallet;
    const authorization = new EOSAccount(accountData).getAuthorization(pubkey);
    return (
      <Table.Row key={`${account}-${pubkey}`}>
        <Table.Cell collapsing>
          <Header>
            <GlobalFragmentAuthorization
              account={account}
              authorization={authorization}
              pubkey={pubkey}
            />
            <Header.Subheader>
              {pubkey}
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Popup
            content={t(`wallet:wallet_mode_explain_${mode}`)}
            inverted
            trigger={(
              <Label
                basic
                content={t(`global:global_modal_account_import_${mode}_wallet`)}
                icon={(mode === 'wait') ? 'loading sync' : 'disk'}
                position="left center"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell collapsing>
          {(mode === 'watch')
            ? (
              <Button
                color="green"
                content={t('tools_wallets_swap')}
                disabled={(account === current.account)}
                icon="random"
                onClick={() => this.swapWallet(account)}
              />
            )
            : (
              <GlobalButtonElevate
                onSuccess={(password) => this.swapWallet(account, password)}
                settings={settings}
                trigger={(
                  <Button
                    color="green"
                    content={t('tools_wallets_swap')}
                    disabled={(account === current.account)}
                    icon="random"
                  />
                )}
                validate={validate}
                wallet={account}
              />
            )
          }
          {(mode === 'watch')
            ? (
              <Button
                color="red"
                disabled={(account === current.account)}
                icon="trash"
                onClick={() => this.removeWallet(account)}
              />
            )
            : (
              <GlobalButtonElevate
                onSuccess={() => this.removeWallet(account)}
                settings={settings}
                trigger={(
                  <Button
                    color="red"
                    disabled={(account === current.account)}
                    icon="trash"
                  />
                )}
                validate={validate}
                wallet={account}
              />
            )
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('tools')(ToolsTableRowWallet);
