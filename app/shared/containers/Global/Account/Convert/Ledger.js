// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Form, Header, Icon, Message, Modal, Segment, Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';

import * as AccountActions from '../../../../actions/accounts';
import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';
import * as SettingsActions from '../../../../actions/settings';
import * as SystemStateActions from '../../../../actions/system/systemstate';
import * as TransactionActions from '../../../../actions/transaction';
import * as UpdateAuthActions from '../../../../actions/system/updateauth';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

import WalletPanelButtonBroadcast from '../../../../components/Wallet/Panel/Button/Broadcast';
import ToolsModalPermissionAuthSet from '../../../../components/Tools/Modal/Permissions/Auth/Set';

import EOSAccount from '../../../../utils/EOS/Account';

class GlobalAccountConvertLedger extends Component<Props> {
  state = {
    keyIndex: 0,
  }
  componentDidMount() {
    const { status } = this.props;
    if (status === 'connected') {
      this.loadKey();
    }
  }
  completePrepare = () => {
    const {
      account,
      actions,
      authorization,
      wallets,
    } = this.props;
    const wallet = find(wallets, {
      account,
      authorization,
    });
    if (wallet && wallet.convertParameters) {
      const {
        path,
        publicKey
      } = wallet.convertParameters;
      const {
        wif
      } = publicKey;
      actions.completeConvertToLedger(
        account,
        authorization,
        wif,
        path
      );
      this.onClose();
    }
  }
  onChange = (e, { value }) => this.setState({ keyIndex: parseInt(value, 10) });
  onClose = () => {
    this.reset();
    this.props.onClose();
  }
  onFormSubmit = () => {
    const {
      account,
      actions,
      authorization,
      ledger
    } = this.props;
    const {
      path,
      publicKey
    } = ledger;
    this.setState({
      awaitingUpdate: true
    });
    actions.prepareConvertToLedger(account, authorization, path, publicKey);
  }
  loadKey = () => {
    const { actions } = this.props;
    actions.ledgerGetPublicKey(this.state.keyIndex);
  }
  reset = () => {
    const { actions } = this.props;
    actions.ledgerResetPublicKey();
    this.setState({
      keyIndex: 0
    });
  }
  stopPrepare = () => {
    const {
      actions,
      account,
      authorization
    } = this.props;
    actions.prepareConvertToLedgerAbort(account, authorization);
  }
  updateAccount = () => {
    const { account, actions } = this.props;
    actions.getAccount(account);
  }
  verify = () => {
    const { actions } = this.props;
    actions.ledgerGetPublicKey(this.state.keyIndex, true);
  }
  render() {
    const {
      account,
      accounts,
      actions,
      authorization,
      blockExplorers,
      data,
      pubkey,
      ledger,
      settings,
      system,
      t,
      transaction,
      wallets
    } = this.props;
    const {
      displayingKey,
      path,
      publicKey
    } = ledger;
    const {
      awaitingUpdate
    } = this.state;
    const accountData = accounts[account];
    const newkey = (publicKey) ? publicKey.wif : '';
    const wallet = find(wallets, {
      account,
      authorization,
    });
    let auth = {};
    const auths = new EOSAccount(accountData).getKeysForAuthorization(authorization);
    if (auths.length) {
      [auth] = auths;
    }
    let isConverting = false;
    let keysMatch = (newkey === auth.pubkey);
    if (wallet && wallet.convertParameters) {
      isConverting = true;
      keysMatch = (wallet.convertParameters.publicKey.wif === auth.pubkey);
    }
    const loading = (system.LEDGER_GET_PUBLIC_KEY === 'PENDING');
    const isValid = true;
    return (
      <Modal
        centered={false}
        closeIcon
        closeOnDimmerClick={false}
        onClose={this.onClose}
        open
        size
      >
        <Modal.Header>
          <Header
            content={t('ledger_account_convert_ledger_header')}
            icon="usb"
            subheader={t('ledger_account_convert_ledger_subheader')}
          />
        </Modal.Header>
        {(displayingKey)
          ? (
            <Modal.Content>
              <React.Fragment>
                <Header
                  content={t('ledger_account_convert_ledger_verify_header')}
                  subheader={t('ledger_account_convert_ledger_verify_subheader')}
                  textAlign="center"
                />
                <Segment
                  basic
                  size="large"
                  textAlign="center"
                >
                  {newkey}
                </Segment>
              </React.Fragment>
            </Modal.Content>
          )
          : false
        }
        {(loading)
          ? (
            <Modal.Content>
              <Header
                icon
                textAlign="center"
              >
                <Icon loading name="circle notched" />
                {t('ledger_account_convert_ledger_loading_key_header')}
                <Header.Subheader>
                  {t('ledger_account_convert_ledger_loading_key_subheader')}
                </Header.Subheader>
              </Header>
            </Modal.Content>
          )
          : false
        }
        {(!displayingKey && !newkey && !loading)
          ? (
            <React.Fragment>
              <Form
                as={Modal.Content}
              >
                <Message
                  content={t('ledger_account_convert_ledger_index_content')}
                  icon="help"
                  info
                  header={t('ledger_account_convert_ledger_index_header')}
                />
                <Form.Input
                  autoFocus
                  placeholder="0"
                  label={t('ledger_account_convert_ledger_index_label')}
                  name="index"
                  onChange={this.onChange}
                  value={this.state.index}
                />
              </Form>
              <Modal.Actions>
                <Form.Button
                  content={t('ledger_account_convert_ledger_key_button')}
                  onClick={this.loadKey}
                  primary
                />
              </Modal.Actions>
            </React.Fragment>
          )
          : false
        }
        {(!displayingKey && newkey && isConverting)
          ? (
            <React.Fragment>
              <Modal.Content>
                <Header
                  icon
                  textAlign="center"
                >
                  {(keysMatch)
                    ? (
                      <React.Fragment>
                        <Icon color="green" name="checkmark" />
                        {t('ledger_account_convert_ledger_converting_ready_header')}
                        <Header.Subheader>
                          {t('ledger_account_convert_ledger_converting_ready_subheader')}
                        </Header.Subheader>
                      </React.Fragment>
                    )
                    : (
                      <React.Fragment>
                        <Icon loading name="circle notched" />
                        {t('ledger_account_convert_ledger_converting_waiting_header')}
                        <Header.Subheader>
                          {t('ledger_account_convert_ledger_converting_waiting_subheader')}
                        </Header.Subheader>
                      </React.Fragment>
                    )
                  }
                </Header>
                <Table
                  definition
                  verticalAlign="middle"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Field</Table.HeaderCell>
                      <Table.HeaderCell>Value</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        {t('account_authority')}
                      </Table.Cell>
                      <Table.Cell>
                        {account}@{authorization}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('ledger_account_convert_ledger_key_current')}
                      </Table.Cell>
                      <Table.Cell>
                        {auth.pubkey}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        {(!keysMatch)
                          ? (
                            <Header
                              size="small"
                            >
                              <Header.Subheader>
                                {t('ledger_account_convert_ledger_key_updated')}
                              </Header.Subheader>
                              <TimeAgo date={`${accountData.head_block_time}z`} />
                            </Header>
                          )
                          : false
                        }
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('ledger_account_convert_ledger_key_selected')}
                      </Table.Cell>
                      <Table.Cell>
                        {newkey}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('ledger_account_convert_ledger_key_path')}
                      </Table.Cell>
                      <Table.Cell>
                        {path}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Modal.Content>
              <Modal.Actions>
                {(!keysMatch)
                  ? (
                    <React.Fragment>
                      <Button
                        content={t('ledger_account_convert_ledger_converting_force_update')}
                        floated="left"
                        onClick={this.updateAccount}
                      />
                      {(wallet.mode !== 'hot')
                        ? (
                          <Button
                            content={t('ledger_account_convert_ledger_converting_reset')}
                            floated="left"
                            onClick={this.stopPrepare}
                          />
                        )
                        : false
                      }
                    </React.Fragment>
                  )
                  : false
                }
                {(isValid && !keysMatch && ['FAILURE', 'PENDING', 'SUCCESS'].includes(system.UPDATEAUTH))
                  ? (
                    <ToolsModalPermissionAuthSet
                      account={account}
                      actions={actions}
                      authorization={authorization}
                      auth={data}
                      blockExplorers={blockExplorers}
                      newkey={newkey}
                      onFormSubmit={this.onFormSubmit}
                      open
                      path={path}
                      pubkey={pubkey}
                      settings={settings}
                      system={system}
                    />
                  )
                  : false
                }
                {(isValid && !keysMatch && settings.walletMode === 'watch')
                  ? (
                    <WalletPanelButtonBroadcast
                      actions={actions}
                      blockExplorers={blockExplorers}
                      button={{
                        color: 'purple',
                        content: t('wallet:wallet_panel_wallet_broadcast'),
                        icon: 'wifi'
                      }}
                      settings={settings}
                      system={system}
                      transaction={transaction}
                    />
                  )
                  : false
                }
                {(keysMatch)
                  ? (
                    <Button
                      content={t('ledger_account_convert_ledger_converting_complete')}
                      onClick={this.completePrepare}
                      primary
                    />
                  )
                  : false
                }
              </Modal.Actions>
            </React.Fragment>
          )
          : false
        }
        {(!displayingKey && newkey && !isConverting)
          ? (
            <React.Fragment>
              <Modal.Content>
                <Message
                  content={t('ledger_account_convert_ledger_confirm_content')}
                  icon="help"
                  info
                  header={t('ledger_account_convert_ledger_confirm_header')}
                />
                <Table
                  definition
                  verticalAlign="middle"
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Field</Table.HeaderCell>
                      <Table.HeaderCell>Value</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        {t('account_authority')}
                      </Table.Cell>
                      <Table.Cell>
                        {account}@{authorization}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('ledger_account_convert_ledger_key_current')}
                      </Table.Cell>
                      <Table.Cell>
                        {auth.pubkey}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('ledger_account_convert_ledger_key_selected')}
                      </Table.Cell>
                      <Table.Cell>
                        {newkey}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Button
                          basic
                          content={t('ledger_account_convert_ledger_verify_key_button')}
                          icon="usb"
                          onClick={this.verify}
                          primary
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        {t('ledger_account_convert_ledger_key_path')}
                      </Table.Cell>
                      <Table.Cell>
                        {path}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Button
                          basic
                          content={t('ledger_account_convert_ledger_change_path_button')}
                          icon="pencil"
                          onClick={this.reset}
                          primary
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Modal.Content>
              <Modal.Actions>
                {(isValid && !keysMatch)
                  ? (
                    <ToolsModalPermissionAuthSet
                      account={account}
                      actions={actions}
                      authorization={authorization}
                      auth={data}
                      blockExplorers={blockExplorers}
                      button={{
                        color: 'purple',
                        content: t('ledger_account_convert_ledger_complete_button'),
                        fluid: false,
                        icon: 'lock',
                        size: 'small'
                      }}
                      newkey={newkey}
                      onFormSubmit={this.onFormSubmit}
                      path={path}
                      pubkey={pubkey}
                      settings={settings}
                      system={system}
                    />
                  )
                  : false
                }
                {(isValid && keysMatch)
                  ? (
                    <Button
                      content={t('ledger_account_convert_ledger_convert_wallet')}
                      onClick={this.onSubmit}
                      primary
                    />
                  )
                  : false
                }
              </Modal.Actions>
            </React.Fragment>
          )
          : false
        }
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    blockExplorers: state.blockexplorers,
    ledger: state.ledger,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    system: state.system,
    transaction: state.transaction,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...HardwareLedgerActions,
      ...SettingsActions,
      ...SystemStateActions,
      ...TransactionActions,
      ...UpdateAuthActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('ledger'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountConvertLedger);
