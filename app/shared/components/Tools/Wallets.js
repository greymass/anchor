// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Segment, Table } from 'semantic-ui-react';

import GlobalButtonAccountImport from '../Global/Button/Account/Import';
import ToolsTableRowWallet from './Table/Row/Wallet';

class ToolsWallets extends Component<Props> {
  render() {
    const {
      actions,
      blockchains,
      connection,
      settings,
      status,
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
            connection={connection}
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
              <Table.HeaderCell>{t('tools_wallets_blockchain')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_wallets_mode')}</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">{t('tools_wallets_controls')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(wallets)
                .filter((w) => (w.chainId === settings.chainId))
                .sort((a, b) => {
                  const k1 = `${a.account}@${a.authorization}`;
                  const k2 = `${b.account}@${b.authorization}`;
                  return k1 > k2;
                })
                .map((w) => (
                  <ToolsTableRowWallet
                    actions={actions}
                    blockchains={blockchains}
                    current={wallet}
                    key={`${w.account}@${w.authorization}`}
                    settings={settings}
                    status={status}
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
