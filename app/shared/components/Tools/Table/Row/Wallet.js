// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { find, findIndex } from 'lodash';

import { Button, Dropdown, Header, Icon, Label, Popup, Table } from 'semantic-ui-react';

import GlobalAccountEdit from '../../../../containers/Global/Account/Edit';
import GlobalButtonElevate from '../../../../containers/Global/Button/Elevate';
import GlobalFragmentAuthorization from '../../../Global/Fragment/Authorization';
import GlobalFragmentBlockchain from '../../../Global/Fragment/Blockchain';
import GlobalFragmentChainLogo from '../../../Global/Fragment/ChainLogo';
import GlobalFragmentWalletType from '../../../Global/Fragment/WalletType';
import GlobalButtonWalletUpgrade from '../../../../containers/Global/Button/Wallet/Upgrade';
import GlobalAccountConvertLedger from '../../../../containers/Global/Account/Convert/Ledger';
import EOSAccount from '../../../../utils/EOS/Account';
import WalletLockState from '../../../Wallet/LockState';

const initialLedgerState = {
  convertToLedgerAccount: undefined,
  convertToLedgerAuthorization: undefined,
  convertToLedgerKey: undefined,
};

const initialEditState = {
  editAccount: undefined,
  editAuthorization: undefined,
};

class ToolsTableRowWallet extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {},
      initialEditState,
      initialLedgerState,
    );
  }
  editWallet = (account, authorization) => {
    this.setState({
      editAccount: account,
      editAuthorization: authorization,
    });
  };
  removeWallet = (account, authorization) => {
    const { actions, settings, walletCount } = this.props;

    actions.removeWallet(settings.chainId, account, authorization);

    if (walletCount === 1) {
      actions.changeModule('');
    }
  };
  swapWallet = (account, authorization, password = false) => {
    const { actions, settings } = this.props;
    actions.useWallet(settings.chainId, account, authorization);
    if (password) {
      actions.unlockWallet(password);
    }
  };
  convertToLedger = (account, authorization, key = undefined) => this.setState({
    convertToLedgerAccount: account,
    convertToLedgerAuthorization: authorization,
    convertToLedgerKey: key,
  });
  resetLedgerConversion = () => this.setState(Object.assign(
    this.state,
    initialLedgerState
  ));
  resetEditWallet = () => this.setState(Object.assign(
    this.state,
    initialEditState
  ));
  render() {
    const {
      current,
      blockchains,
      pubkeys,
      settings,
      status,
      t,
      validate,
      wallet,
    } = this.props;
    const {
      account,
      authorization,
      chainId,
      mode,
      pubkey
    } = wallet;
    const {
      accountData
    } = current;
    const blockchain = find(blockchains, { chainId });
    const data = new EOSAccount(accountData).getPermission(authorization);
    const {
      convertToLedgerAccount,
      convertToLedgerAuthorization,
      convertToLedgerKey,
      editAccount,
      editAuthorization,
    } = this.state;
    let modal;
    let color = 'grey';
    if (convertToLedgerAccount && convertToLedgerAuthorization) {
      modal = (
        <GlobalAccountConvertLedger
          account={convertToLedgerAccount}
          authorization={convertToLedgerAuthorization}
          data={data}
          pubkey={convertToLedgerKey}
          onClose={this.resetLedgerConversion}
        />
      );
    }
    if (editAccount && editAuthorization) {
      modal = (
        <GlobalAccountEdit
          account={editAccount}
          authorization={editAuthorization}
          data={wallet}
          onClose={this.resetEditWallet}
        />
      );
    }
    const items = [
      (
        <Dropdown.Header key="advanced-header" icon="warning sign" content={t('wallet:wallet_advanced_header')} />
      ),
      (
        <Dropdown.Item
          content={t('wallet:view')}
          icon="edit"
          key="edit"
          onClick={() => this.editWallet(account, authorization)}
        />
      ),
      (
        <Dropdown.Item
          content={t('tools_form_duplicate_duplicate')}
          icon="copy"
          key="duplicate"
          onClick={() => this.props.duplicateWallet(account, authorization)}
        />
      )
    ];
    // Is this the current wallet? Account + Authorization must match
    const isCurrentWallet = (
      account === current.account
      && authorization === current.authorization
    );
    // Is this either a Hot/Watch wallet and is there
    //   a Ledger currently connected? If so, append convert
    if (isCurrentWallet && ['hot', 'watch'].indexOf(mode) >= 0 && status === 'connected') {
      items.push((
        <Dropdown.Item
          content={t('wallet:wallet_convert_to_ledger')}
          // disabled={isCurrentWallet}
          icon="usb"
          key="ledger"
          onClick={() => this.convertToLedger(account, authorization, pubkey)}
        />
      ));
    }
    let icon = 'disk';
    // Create delete button based on wallet
    switch (mode) {
      case 'ledger': {
        color = 'purple';
        icon = 'usb';
        items.push((
          <Dropdown.Item
            content={t('wallet:wallet_remove')}
            icon="trash"
            key="delete"
            onClick={() => this.removeWallet(account, authorization)}
          />
        ));
        break;
      }
      case 'watch': {
        color = 'grey';
        icon = 'eye';
        items.push((
          <Dropdown.Item
            content={t('wallet:wallet_remove')}
            icon="trash"
            key="delete"
            onClick={() => this.removeWallet(account, authorization)}
          />
        ));
        break;
      }
      case 'cold': {
        color = 'blue';
        icon = 'snowflake';
        items.push((
          <Dropdown.Item
            content={t('wallet:wallet_remove')}
            icon="trash"
            key="delete"
            onClick={() => this.removeWallet(account, authorization)}
          />
        ));
        break;
      }
      default: {
        color = 'green';
        icon = 'id card';
        items.push((
          <GlobalButtonElevate
            key="remove"
            onSuccess={() => this.removeWallet(account, authorization)}
            settings={settings}
            trigger={(
              <Dropdown.Item
                icon="trash"
                key="delete"
                text={t('wallet:wallet_remove')}
              />
            )}
            validate={validate}
            wallet={wallet}
          />
        ));
      }
    }
    const unlocked = (pubkeys.unlocked.includes(pubkey));
    return (
      <Table.Row key={`${account}-${authorization}`}>
        <Table.Cell collapsing>
          {modal}
          <Header size="small">
            <GlobalFragmentAuthorization
              account={account}
              authorization={authorization}
              pubkey={pubkey}
            />
          </Header>
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          <GlobalFragmentChainLogo
            avatar
            chainId={blockchain.chainId}
            name={blockchain.name}
          />
        </Table.Cell>
        <Table.Cell>
          <GlobalFragmentWalletType
            mode={mode}
          />
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          {(mode === 'hot')
            ? (
              <WalletLockState
                actions={this.props.actions}
                key="lockstate"
                locked={!unlocked}
                pubkeys={pubkeys}
                validate={validate}
                wallet={wallet}
              />
            )
            : false
          }
        </Table.Cell>
        <Table.Cell collapsing textAlign="right">
          <GlobalButtonWalletUpgrade
            wallet={wallet}
          />
          {(!unlocked && (mode === 'hot' || mode === 'cold'))
            ? (
              <GlobalButtonElevate
                onSuccess={(password) => this.swapWallet(account, authorization, password)}
                settings={settings}
                trigger={(
                  <Button
                    color="green"
                    content={t('tools_wallets_swap')}
                    disabled={isCurrentWallet}
                    icon="random"
                  />
                )}
                validate={validate}
                wallet={wallet}
              />
            )
            : false
          }
          {(mode === 'watch' || mode === 'ledger' || unlocked)
            ? (
              <Button
                color="green"
                content={t('tools_wallets_swap')}
                disabled={isCurrentWallet}
                icon="random"
                onClick={() => this.swapWallet(account, authorization)}
              />
            )
            : false
          }
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
    );
  }
}

export default translate('tools')(ToolsTableRowWallet);
