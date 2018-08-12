// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Label, Popup, Segment, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../containers/Global/Button/Elevate';
import GlobalButtonAccountImport from '../Global/Button/Account/Import';

class ToolsWallets extends Component<Props> {
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
      settings,
      t,
      validate,
      wallet,
      wallets
    } = this.props;
    if (!wallets || !wallets.length) {
      return false;
    }
    return (
      <Segment basic>
        <Button.Group floated="right">
          <GlobalButtonAccountImport
            settings={settings}
          />
        </Button.Group>
        <Header floated="left">
          {t('tools_wallets_header')}
          <Header.Subheader>
            {t('tools_wallets_subheader')}
          </Header.Subheader>
        </Header>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('tools_wallets_account')}</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">{t('tools_wallets_mode')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_wallets_controls')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(wallets)
                .sort((a, b) => a.account > b.account)
                .map((account) => (
                  <Table.Row key={account.account}>
                    <Table.Cell>
                      <Header size="small">
                        {account.account}
                      </Header>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Popup
                        content={t(`wallet:wallet_mode_explain_${account.mode}`)}
                        inverted
                        trigger={(
                          <Label
                            basic
                            content={t(`global:global_modal_account_import_${account.mode}_wallet`)}
                            icon={(account.mode === 'wait') ? 'loading sync' : 'disk'}
                            position="left center"
                          />
                        )}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      {(account.mode === 'watch')
                        ? (
                          <Button
                            color="green"
                            content={t('tools_wallets_swap')}
                            disabled={(account.account === wallet.account)}
                            icon="random"
                            onClick={() => this.swapWallet(account.account)}
                          />
                        )
                        : (
                          <GlobalButtonElevate
                            onSuccess={(password) => this.swapWallet(account.account, password)}
                            settings={settings}
                            trigger={(
                              <Button
                                color="green"
                                content={t('tools_wallets_swap')}
                                disabled={(account.account === wallet.account)}
                                icon="random"
                              />
                            )}
                            validate={validate}
                            wallet={account}
                          />
                        )
                      }
                      {(account.mode === 'watch')
                        ? (
                          <Button
                            color="red"
                            disabled={(account.account === wallet.account)}
                            icon="trash"
                            onClick={() => this.removeWallet(account.account)}
                          />
                        )
                        : (
                          <GlobalButtonElevate
                            onSuccess={() => this.removeWallet(account.account)}
                            settings={settings}
                            trigger={(
                              <Button
                                color="red"
                                disabled={(account.account === wallet.account)}
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
            )))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsWallets);
