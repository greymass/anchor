// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Dropdown, Header, Label, Popup, Table } from 'semantic-ui-react';

import GlobalButtonElevate from '../../../../containers/Global/Button/Elevate';
import GlobalFragmentAuthorization from '../../../Global/Fragment/Authorization';
import GlobalButtonWalletUpgrade from '../../../../containers/Global/Button/Wallet/Upgrade';
import GlobalAccountConvertLedger from '../../../../containers/Global/Account/Convert/Ledger';
import EOSAccount from '../../../../utils/EOS/Account';

const initialLedgerState = {
  convertToLedgerAccount: undefined,
  convertToLedgerAuthorization: undefined,
  convertToLedgerKey: undefined,
};

class ToolsTableRowWallet extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {},
      initialLedgerState
    );
  }
  removeWallet = (account, authorization) => {
    const { actions } = this.props;
    actions.removeWallet(account, authorization);
  }
  swapWallet = (account, authorization, password = false) => {
    const { actions } = this.props;
    actions.useWallet(account, authorization);
    if (password) {
      actions.unlockWallet(password);
    }
  }
  convertToLedger = (account, authorization, key = undefined) => this.setState({
    convertToLedgerAccount: account,
    convertToLedgerAuthorization: authorization,
    convertToLedgerKey: key,
  });
  resetLedgerConversion = () => this.setState(Object.assign(
    this.state,
    initialLedgerState
  ));
  render() {
    const {
      current,
      settings,
      status,
      t,
      validate,
      wallet,
    } = this.props;
    const {
      account,
      authorization,
      mode,
      pubkey
    } = wallet;
    const {
      accountData
    } = current;
    const data = new EOSAccount(accountData).getPermission(authorization);
    const {
      convertToLedgerAccount,
      convertToLedgerAuthorization,
      convertToLedgerKey,
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
    const items = [
      (
        <Dropdown.Header icon="warning sign" content={t('wallet:wallet_advanced_header')} />
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
            disabled={isCurrentWallet}
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
            disabled={isCurrentWallet}
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
            onSuccess={() => this.removeWallet(account, authorization)}
            settings={settings}
            trigger={(
              <Dropdown.Item
                disabled={isCurrentWallet}
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
    return (
      <Table.Row key={`${account}-${authorization}`}>
        <Table.Cell collapsing>
          {modal}
          <Header>
            <GlobalFragmentAuthorization
              account={account}
              authorization={authorization}
              pubkey={pubkey}
            />
            {(wallet.blockchain)
              ? (
                <Header.Subheader>
                  {t('blockchain')}: {wallet.blockchain}
                </Header.Subheader>
              )
              : false
            }
          </Header>
        </Table.Cell>
        <Table.Cell>
          <Popup
            content={t(`wallet:wallet_mode_explain_${mode}`)}
            inverted
            trigger={(
              <Label
                basic
                color={color}
                content={t(`global:global_modal_account_import_${mode}_wallet`)}
                icon={icon}
                position="left center"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell collapsing textAlign="right">
          <GlobalButtonWalletUpgrade
            wallet={wallet}
          />
          {(mode === 'hot' || mode === 'cold')
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
          {(mode === 'watch' || mode === 'ledger')
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
