// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Icon, Input, List, Menu, Modal, Segment, Table } from 'semantic-ui-react';

import GlobalButtonAccountImport from '../../../../components/Global/Button/Account/Import';
import GlobalButtonElevate from '../../Button/Elevate';
import GlobalBlockchainDropdown from '../../Blockchain/Dropdown';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

import GlobalFragmentWalletType from '../../../../components/Global/Fragment/WalletType';

class GlobalAccountSelectWallet extends Component<Props> {
  swapAccount = (chainId, account, authorization, password = false) => {
    const { actions } = this.props;
    actions.useWallet(chainId, account, authorization);
    if (password) {
      actions.unlockWallet(password);
    }
  }
  render() {
    const {
      blockchains,
      connection,
      settings,
      t,
      wallets,
      validate,
    } = this.props;
    const {
      chainId
    } = settings;
    const blockchain = find(blockchains, { chainId });
    const options = wallets
      .filter(w => (
        w.chainId === settings.chainId
      ))
      .sort((a, b) => a.account > b.account);

    return (
      <Modal
        centered={false}
        open
        scrolling
        size="small"
      >
        <Modal.Header>
          {t('global_account_select_wallet')}
        </Modal.Header>
        <Modal.Content>
          <Header
            attached="top"
            block
            content={t('global_account_select_wallet_connected_to_header', { name: blockchain.name })}
            size="huge"
            subheader={t('global_account_select_wallet_connected_to_subheader', { node: blockchain.node })}
          />
          <Menu
            attached
            inverted
            size="large"
          >
            <GlobalBlockchainDropdown />
            <Menu.Menu position="right">
              <Menu.Item>
                <GlobalButtonAccountImport
                  connection={connection}
                  settings={settings}
                />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Table attached="bottom" size="small" verticalAlign="middle">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>{t('tools:tools_wallets_account')}</Table.HeaderCell>
                <Table.HeaderCell>{t('tools:tools_wallets_mode')}</Table.HeaderCell>
                <Table.HeaderCell textAlign="right">{t('tools:tools_wallets_controls')}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {(options.length > 0)
                ? options.map(w => {
                  const { mode } = w;
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <Header
                          content={`${w.account}@${w.authorization}`}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <GlobalFragmentWalletType
                          mode={w.mode}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        {(mode === 'hot' || mode === 'cold')
                          ? (
                            <GlobalButtonElevate
                              onSuccess={(password) => this.swapAccount(chainId, w.account, w.authorization, password)}
                              settings={settings}
                              trigger={(
                                <Button
                                  color="green"
                                  content={t('tools:tools_wallets_swap')}
                                  icon="random"
                                />
                              )}
                              validate={validate}
                              wallet={w}
                            />
                          )
                          : false
                        }
                        {(mode === 'watch' || mode === 'ledger')
                          ? (
                            <Button
                              color="green"
                              content={t('tools:tools_wallets_swap')}
                              icon="random"
                              onClick={() => this.swapAccount(chainId, w.account, w.authorization)}
                            />
                          )
                          : false
                        }
                      </Table.Cell>
                    </Table.Row>
                  );
                })
                : (
                  <Table.Row>
                    <Table.Cell colSpan="3">
                      <Header>
                        {t('global_account_select_wallet_no_wallets', { name: blockchain.name })}
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                )
              }
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    );
  }
}


function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    connection: state.connection,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate(['global', 'tools']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountSelectWallet);
