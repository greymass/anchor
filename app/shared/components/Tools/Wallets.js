// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Label, Popup, Segment, Table } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import GlobalButtonAccountImport from '../Global/Button/Account/Import';

class ToolsWallets extends Component<Props> {
  removeWallet = (account) => {
    const { actions } = this.props;
    actions.removeWallet(account);
  }
  swapWallet = (account) => {
    const { actions } = this.props;
    actions.useWallet(account);
  }
  render() {
    const {
      settings,
      t,
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
                  <Table.Row>
                    <Table.Cell>
                      <strong>{account.account}</strong>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Popup
                        content={t(`wallet:wallet_mode_explain_${account.mode}`)}
                        inverted
                        trigger={(
                          <Label
                            basic
                            position="left center"
                          >
                            {t(`global:global_modal_account_import_${account.mode}_wallet`)}
                          </Label>
                        )}
                      />
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button
                        color="green"
                        content={t('tools_wallets_swap')}
                        disabled={(account.account === wallet.account)}
                        icon="random"
                        onClick={() => this.swapWallet(account.account)}
                      />
                      <Button
                        color="red"
                        disabled={(account.account === wallet.account)}
                        icon="trash"
                        onClick={() => this.removeWallet(account.account)}
                      />
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
