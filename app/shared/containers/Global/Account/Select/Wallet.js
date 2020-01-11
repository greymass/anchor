// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find, debounce } from 'lodash';
import { Button, Dropdown, Header, Icon, Input, List, Menu, Modal, Segment, Table, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import GlobalButtonAccountImport from '../../../../components/Global/Button/Account/Import';
import GlobalButtonElevate from '../../Button/Elevate';
import GlobalBlockchainDropdown from '../../Blockchain/Dropdown';
import * as ChainActions from '../../../../actions/chain';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';
import * as ValidateActions from '../../../../actions/validate';
import * as SettingsActions from '../../../../actions/settings';

import GlobalFragmentWalletType from '../../../../components/Global/Fragment/WalletType';

class GlobalAccountSelectWallet extends Component<Props> {
  state = {
    isNodeAddressEditing: false,
    editedNodeAddress: null,
  }

  swapAccount = (chainId, account, authorization, mode, password = false) => {
    const { actions, settings } = this.props;
    if (!['cold'].includes(settings.walletMode)) {
      actions.getInfo();
    }
    actions.useWallet(chainId, account, authorization, mode);
    if (password) {
      actions.unlockWallet(password);
    }
  }

  toggleNodeAddressEditing = () => {
    this.setState(({ isNodeAddressEditing }) => ({ isNodeAddressEditing: !isNodeAddressEditing }));
  }

  onNodeAddressEdit = debounce((e, { name, value }) => {
    this.setState({ editedNodeAddress: value })
    this.props.actions.validateNode(value)
  }, 250)

  onSaveNodeAddress = () => {
    const { editedNodeAddress } = this.state
    const { settings: { node }, actions: { setSettingWithValidation }, validate } = this.props;
    if (editedNodeAddress && node !== editedNodeAddress) {
      if (validate.NODE === 'SUCCESS') {
        setSettingWithValidation('node', editedNodeAddress);
        this.toggleNodeAddressEditing();
      }
    } else {
      this.toggleNodeAddressEditing();
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
    if (!blockchain) return false;
    return (
      <Modal
        centered={false}
        open
        scrolling
        size="small"
      >
        <Menu
          attached="top"
          inverted
          size="large"
        >
          <GlobalBlockchainDropdown />
          <Menu.Item header>
            {t('global_account_select_wallet')}
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <GlobalButtonAccountImport
                connection={connection}
                settings={settings}
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <Segment attached>
          <Header>
            <Header.Content>
            {t('global_account_select_wallet_connected_to_header', { name: blockchain.name })}</Header.Content>
            <Header.Subheader>
              <label>
                {t('global_account_select_wallet_connected_to_subheader')}
                {!this.state.isNodeAddressEditing ? (
                  <React.Fragment>
                    { settings.node } <div style={{float: 'right'}}><a href="javascript:void(0)" onClick={this.toggleNodeAddressEditing}>Change Server <Icon name='pencil'/></a></div>
                  </React.Fragment>
                ) : (
                  <Input
                    fluid
                    size="small"
                    defaultValue={settings.node}
                    action
                    onChange={this.onNodeAddressEdit}>
                    <input />
                    <Button
                      size="tiny"
                      color={validate.NODE === 'SUCCESS' ? "green" : "red"}
                      loading={validate.NODE === 'PENDING' && !!this.state.editedNodeAddress}
                      icon={validate.NODE === 'SUCCESS' ? "check" : "close"}
                      disabled={validate.NODE !== 'SUCCESS'}
                      onClick={() => this.onSaveNodeAddress()}/>
                    <Button loading={false} size="tiny" icon="close" onClick={this.toggleNodeAddressEditing}/>
                </Input>
              )}
              </label>
            </Header.Subheader>
          </Header>
        </Segment>
        <Table
          attached="bottom"
          size="small"
          verticalAlign="middle"
        >
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
                  <Table.Row key={`${w.account}@${w.authorization}@${w.mode}`}>
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
                      {(w.data)
                        ? (
                          <GlobalButtonElevate
                            onSuccess={(password) => this.swapAccount(chainId, w.account, w.authorization, w.mode, password)}
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
                      {(['ledger', 'watch'].includes(mode))
                        ? (
                          <Button
                            color="green"
                            content={t('tools:tools_wallets_swap')}
                            icon="random"
                            onClick={() => this.swapAccount(chainId, w.account, w.authorization, w.mode)}
                          />
                        )
                        : false
                      }
                    </Table.Cell>
                  </Table.Row>
                );
              })
              : (
                <Table.Row key="noWallets">
                  <Table.Cell colSpan="3">
                    <Segment basic padded textAlign="center">
                      <Header>
                        {t('global_account_select_wallet_no_wallets', { name: blockchain.name })}
                      </Header>
                    </Segment>
                  </Table.Cell>
                </Table.Row>
              )
            }
          </Table.Body>
        </Table>
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
      ...ChainActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate(['global', 'tools']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountSelectWallet);
