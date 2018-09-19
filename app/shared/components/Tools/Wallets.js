// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Label, Popup, Segment, Table } from 'semantic-ui-react';

import GlobalButtonAccountImport from '../Global/Button/Account/Import';
import ToolsTableRowWallet from './Table/Row/Wallet';

class ToolsWallets extends Component<Props> {
  render() {
    const {
      actions,
      settings,
      t,
      validate,
      wallet,
      wallets
    } = this.props;
    if (!wallets || !wallets.length) {
      return false;
    }
    console.log(wallets)
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
                .map((w) => (
                  <ToolsTableRowWallet
                    actions={actions}
                    current={wallet}
                    settings={settings}
                    wallet={w}
                    validate={validate}
                  />
                )))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsWallets);
