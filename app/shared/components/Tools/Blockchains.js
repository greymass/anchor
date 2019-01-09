// @flow
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { sumBy } from "lodash";

import {
  Button,
  Dropdown,
  Header,
  Label,
  Popup,
  Segment,
  Table
} from "semantic-ui-react";

import GlobalButtonBlockchainImport from '../Global/Button/Blockchain/Import';
import ToolsModalBlockchain from './Modal/Blockchain';

class ToolsBlockchains extends PureComponent<Props> {
  state = {
    editing: false
  }
  edit = (chainId) => this.setState({ editing: chainId })
  cancel = (chainId) => this.setState({ editing: false })
  render() {
    const {
      actions,
      blockchains,
      connection,
      settings,
      t,
      wallets
    } = this.props;
    const {
      editing
    } = this.state;
    const items = [
      (
        <Dropdown.Header icon="warning sign" content={t('wallet:wallet_advanced_header')} />
      )
    ];
    return (
      <Segment basic>
        {(editing)
          ? (
            <ToolsModalBlockchain
              blockchain={editing}
              onClose={this.cancel}
              open
            />
          )
          : false
        }
        <Button.Group floated="right">
          <GlobalButtonBlockchainImport
            connection={connection}
            settings={settings}
          />
        </Button.Group>
        <Header floated="left">
          {t("tools_blockchains_header")}
          <Header.Subheader>
            {t("tools_blockchains_subheader")}
          </Header.Subheader>
        </Header>
        <Table definition striped unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing />
              <Table.HeaderCell>
                {t("tools_blockchains_blockchain")}
              </Table.HeaderCell>
              <Table.HeaderCell collapsing>
                {t("tools_blockchains_wallets")}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t("tools_blockchains_chainid")}
              </Table.HeaderCell>
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {([].concat(blockchains)
                .filter((b) => (!b.testnet || (b.testnet && settings.displayTestNetworks)))
                .sort((a, b) => {
                  const v1 = `${a.symbol}@${a.testnet}@${a.chainId}`;
                  const v2 = `${b.symbol}@${b.testnet}@${b.chainId}`;
                  return v1 > v2;
                })
                .map((b) => {
                  const count = sumBy(
                    wallets,
                    (w) => (w.chainId === b.chainId) ? 1 : 0
                  );
                  const currenItems = [...items,
                    (
                      <Dropdown.Item
                        content={t('tools_blockchains_edit')}
                        icon="edit"
                        key="edit"
                        onClick={() => this.edit(b.chainId)}
                      />
                    )
                  ];
                  return (
                    <Table.Row key={b.chainId}>
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
                        <Header
                          content={(
                            <Popup
                              content={b.chainId}
                              inverted
                              hoverable
                              trigger={(<span>{b.chainId.substr(0, 8)}...{b.chainId.substr(-8)}</span>)}
                            />
                          )}
                          size="tiny"
                          subheader={b.node}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          direction="left"
                          floating
                          button
                          className="icon"
                          icon="ellipsis vertical"
                        >
                          <Dropdown.Menu>
                            {currenItems}
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

export default translate("tools")(ToolsBlockchains);
