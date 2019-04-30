// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Grid, Header, Segment, Table } from 'semantic-ui-react';

import GlobalButtonAccountImport from '../Global/Button/Account/Import';
import ToolsTableRowWallet from './Table/Row/Wallet';
import ToolsModalDuplicatingWallet from './Modal/DuplicatingWallet';

class ToolsWallets extends Component<Props> {
  state = {};
  duplicateWallet = (account, authorization) =>
    this.setState({ duplicatingWallet: { account, authorization } })
  render() {
    const {
      actions,
      blockchains,
      connection,
      pubkeys,
      settings,
      status,
      system,
      t,
      validate,
      wallet,
      wallets
    } = this.props;
    const {
      duplicatingWallet
    } = this.state;
    if (!wallets || !wallets.length) {
      return false;
    }
    console.log(this.props)
    return (
      <Segment style={{ marginTop: 0 }}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header>
                {t('tools_wallets_header')}
                <Header.Subheader>
                  {t('tools_wallets_subheader')}
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              {(duplicatingWallet) && (
                <ToolsModalDuplicatingWallet
                  actions={actions}
                  blockchains={blockchains}
                  duplicatingWallet={duplicatingWallet}
                  onClose={() => this.setState({ duplicatingWallet: null })}
                  settings={settings}
                  system={system}
                  wallets={wallets}
                />
              )}
              <GlobalButtonAccountImport
                connection={connection}
                settings={settings}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('tools_wallets_account')}</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>{t('tools_wallets_mode')}</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell textAlign="right">{t('tools_wallets_controls')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(wallets)
                .filter((w) => (w.chainId === settings.chainId))
                .sort((a, b) => {
                  const k1 = `${a.account}@${a.authorization}`;
                  const k2 = `${b.account}@${b.authorization}`;
                  return (k1 > k2) ? 1 : -1;
                })
                .map((w) => (
                  <ToolsTableRowWallet
                    actions={actions}
                    blockchains={blockchains}
                    current={wallet}
                    duplicateWallet={this.duplicateWallet}
                    key={`${w.account}@${w.authorization}`}
                    pubkeys={pubkeys}
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
