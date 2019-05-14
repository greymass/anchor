// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { filter, find } from 'lodash';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { Grid, Header, Segment, Table } from 'semantic-ui-react';

import GlobalAccountDropdownSelect from '../../../../../shared/containers/Global/Account/Dropdown/Select';
import GlobalAccountFragmentTokenBalance from '../../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountRequired from '../../../../../shared/containers/Global/Account/Required';
import GlobalUnlock from '../../../../../shared/containers/Global/Unlock';
import GlobalTransactionHandler from '../../../../../shared/components/Global/Transaction/Handler';
import WalletPanelFormTransferSend from '../../../../../shared/components/Wallet/Panel/Form/Transfer/Send';

import { clearSystemState } from '../../../../../shared/actions/system/systemstate';
import { getActions, getContractHash } from '../../../../../shared/actions/accounts';
import { transfer } from '../../../../../shared/actions/transfer';
import { useWallet } from '../../../../../shared/actions/wallets';

class WalletTransferContainer extends Component<Props> {
  setAsset = (asset, amount) => this.refs.transfer.wrappedInstance.updateState({
    asset,
    quantity: `${amount} ${asset}`,
    quantitySet: Date.now(),
  })
  swapAccount = (e, { value }) => {
    const { actions } = this.props;
    const { chainId, account, authorization } = value;
    actions.useWallet(chainId, account, authorization);
  }
  render() {
    const {
      actions,
      app,
      balances,
      blockExplorers,
      connection,
      isLocked,
      settings,
      system,
      wallet,
    } = this.props;


    if (!balances) return false;

    if (!settings.account || !balances[settings.account]) return (
      <p>Select an account</p>
    );

    const transaction = system.TRANSFER_LAST_TRANSACTION;
    const tokens = Object.keys(balances[settings.account])

    // Determine which tokens are being tracked
    const trackedTokens = (settings.customTokens || []).map((tokenName) => {
      const [chainId, contract, symbol] = tokenName.split(':');
      return { contract, symbol };
    });

    const filteredTokens = filter(tokens, (token) => {
      const isSystemToken = (token === connection.chainSymbol);
      const isTracked = find(trackedTokens, { symbol: token });
      const hasBalance = balances[settings.account][token] > 0;
      // console.log(token, isTracked, hasBalance, connection)
      return ((isTracked || isSystemToken) && hasBalance)
    });

    return (
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment color="blue" piled>
                <Header>
                  Transfer Tokens
                  <Header.Subheader>
                    Send tokens to another account, an exchange, or one of your contacts.
                  </Header.Subheader>
                </Header>
                <GlobalAccountRequired>
                  {(isLocked && wallet.mode === 'hot')
                    ? (
                      <GlobalUnlock />
                    )
                    : (
                      <GlobalTransactionHandler
                        actionName="TRANSFER"
                        actions={actions}
                        blockExplorers={blockExplorers}
                        content={(
                          <WalletPanelFormTransferSend
                            actions={actions}
                            app={app}
                            balances={balances}
                            connection={connection}
                            ref="transfer"
                            settings={settings}
                            system={system}
                          />
                        )}
                        icon="arrow circle up"
                        onClose={actions.clearSystemState}
                        settings={settings}
                        system={system}
                        transaction={transaction}
                      />
                    )
                  }

                </GlobalAccountRequired>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header
                content="Selected Account"
                size="small"
                subheader="The currently selected account will be used to perform the transfer."
              />
              <GlobalAccountDropdownSelect
                account={settings.account}
                authorization={settings.authorization}
                fluid
                mode={settings.walletMode}
                pubkey={settings.pubkey}
                chainId={settings.chainId}
                onSelect={this.swapAccount}
              />
              <Header
                content="Tracked Balances"
                size="small"
                subheader="Click any balance to automatically fill in the transfer form for that amount."
              />
              <Table definition>
                {filteredTokens.map((symbol) => (
                  <Table.Row>
                    <Table.Cell textAlign="right">{symbol}</Table.Cell>
                    <Table.Cell
                      onClick={() => this.setAsset(symbol, balances[settings.account][symbol])}
                      style={{ cursor: 'pointer' }}
                    >
                      <GlobalAccountFragmentTokenBalance
                        account={settings.account}
                        chainId={settings.chainId}
                        contract={balances.__contracts[symbol]}
                        token={symbol}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    actionHistory: state.actions[state.settings.account],
    app: state.app,
    auths: state.auths,
    balances: state.balances,
    connection: state.connection,
    isLocked: !find(state.auths.keystore, { pubkey: state.wallet.pubkey }),
    settings: state.settings,
    system: state.system,
    wallet: state.wallet,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getActions,
      getContractHash,
      transfer,
      useWallet,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletTransferContainer));
