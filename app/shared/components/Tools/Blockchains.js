// @flow
import React, { PureComponent } from 'react';
import { translate } from 'react-i18next';
import { sumBy } from 'lodash';

import {
  Button,
  Dropdown,
  Header,
  Label,
  Popup,
  Segment,
  Table
} from 'semantic-ui-react';

import GlobalButtonBlockchainImport from '../Global/Button/Blockchain/Import';

class ToolsBlockchains extends PureComponent<Props> {
  render() {
    const {
      actions,
      blockchains,
      connection,
      settings,
      t,
      wallets
    } = this.props;
    const items = [
      (
        <Dropdown.Header icon="warning sign" content={t('wallet:wallet_advanced_header')} />
      ),
      (
        <Dropdown.Item
          content={t('wallet:view')}
          icon="edit"
          key="edit"
          onClick={() => this.editWallet(account, authorization)}
        />
      )
    ];
    return (
      <Segment basic>
        <Button.Group floated="right">
          <GlobalButtonBlockchainImport
            connection={connection}
            settings={settings}
          />
        </Button.Group>
        <Header floated="left">
          {t('tools_blockchains_header')}
          <Header.Subheader>
            {t('tools_blockchains_subheader')}
          </Header.Subheader>
        </Header>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing />
              <Table.HeaderCell>{t('tools_blockchains_blockchain')}</Table.HeaderCell>
              <Table.HeaderCell collapsing>{t('tools_blockchains_wallets')}</Table.HeaderCell>
              <Table.HeaderCell>{t('tools_blockchains_chainid')}</Table.HeaderCell>
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(blockchains)
                .filter((b) => (!b.testnet))
                .sort((a, b) => {
                  const v1 = `${a.testnet}@${a.symbol}`;
                  const v2 = `${b.testnet}@${b.symbol}`;
                  return v1 > v2;
                })
                .map((b) => {
                  // const wallets =
                  const count = sumBy(
                    wallets,
                    (w) => (w.chainId === b.chainId) ? 1 : 0
                  );
                  return (
                    <Table.Row>
                      <Table.Cell>
                        {(b.testnet)
                          ? (
                            <Popup
                              content={t('tools_blockchains_testnet_content')}
                              floated="right"
                              header={t('tools_blockchains_testnet_header')}
                              horizontal
                              inverted
                              size="large"
                              trigger={(
                                <Label
                                  color="black"
                                  content={t('tools_blockchains_testnet_label')}
                                  size="small"
                                />
                              )}
                              wide
                            />
                          )
                          : (
                            <Popup
                              content={t('tools_blockchains_mainnet_content')}
                              floated="right"
                              header={t('tools_blockchains_mainnet_header')}
                              horizontal
                              inverted
                              size="large"
                              trigger={(
                                <Label
                                  color="green"
                                  content={t('tools_blockchains_mainnet_label')}
                                  size="small"
                                />
                              )}
                              wide
                            />
                          )
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <Header
                          content={b.name}
                          size="small"
                          subheader={b.symbol}
                        />
                      </Table.Cell>
                      <Table.Cell
                        content={count}
                        textAlign="center"
                      />
                      <Table.Cell>
                        <Popup
                          content={b.chainId}
                          inverted
                          hoverable
                          trigger={(<span>{b.chainId.substr(0, 5)}...{b.chainId.substr(-5)}</span>)}
                        />
                      </Table.Cell>
                      <Table.Cell style={{ display: 'none' }}>
                        <Dropdown
                          direction="left"
                          floating
                          button
                          className="icon"
                          icon="ellipsis vertical"
                        >
                          <Dropdown.Menu>
                            {items}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  )
                }))}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('tools')(ToolsBlockchains);
