// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { filter, find } from 'lodash';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Grid, Header, Segment, Table } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import GlobalAccountDropdownSelect from '../../../../../shared/containers/Global/Account/Dropdown/Select';
import GlobalAccountFragmentTokenBalance from '../../../../../shared/containers/Global/Account/Fragment/TokenBalance';
import GlobalAccountRequired from '../../../../../shared/containers/Global/Account/Required';
import GlobalUnlock from '../../../../../shared/containers/Global/Unlock';
import GlobalTransactionHandler from '../../../../../shared/components/Global/Transaction/Handler';
import WalletPanelFormTransferSend from '../../../../../shared/components/Wallet/Panel/Form/Transfer/Send';

import { clearSystemState } from '../../../../../shared/actions/system/systemstate';
import { getActions, getContractHash } from '../../../../../shared/actions/accounts';
import { transfer, transferSetAsset } from '../../../../../shared/actions/transfer';
import { useWallet } from '../../../../../shared/actions/wallets';

class WalletTransferContainer extends Component<Props> {
  state = {
    isConfirming: false
  };
  isConfirming = (value) => this.setState({ isConfirming: value })
  onClose = () => {
    this.props.actions.clearSystemState();
    this.setState({
      isConfirming: false
    });
  };
  swapAccount = (e, { value }) => {
    const { actions } = this.props;
    const { chainId, account, authorization } = value;
    actions.useWallet(chainId, account, authorization);
  };
  render() {
    const {
      isConfirming
    } = this.state;
    const {
      actions,
      app,
      balances,
      blockExplorers,
      connection,
      isLocked,
      settings,
      system,
      t,
      wallet,
    } = this.props;

    if (!balances) return false;

    if (!settings.account || !balances[settings.account]) {
      return (
        <p>
          {t('main_sections_wallet_transfer_select')}
        </p>
      );
    }

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

      return ((isTracked || isSystemToken) && hasBalance);
    });

    const hasTransaction = (transaction && transaction.transaction_id);

    return (
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={(hasTransaction || isConfirming) ? 16 : 10}>
              <Segment color="blue" piled>
                <Header>
                  {t('main_sections_wallet_transfer_header')}
                  <Header.Subheader>
                    {t('main_sections_wallet_transfer_subheader')}
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
                            isConfirming={this.isConfirming}
                            settings={settings}
                            system={system}
                          />
                        )}
                        icon="arrow circle up"
                        onClose={this.onClose}
                        settings={settings}
                        system={system}
                        transaction={transaction}
                      />
                    )
                  }
                </GlobalAccountRequired>
              </Segment>
            </Grid.Column>
            <Grid.Column
              style={{
                display: (hasTransaction || isConfirming) ? 'none' : 'inline-block'
              }}
              width={6}
            >
              <Header
                content={t('main_sections_wallet_transfer_grid_header_one')}
                size="small"
                subheader={t('main_sections_wallet_transfer_grid_header_one')}
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
                content={t('main_sections_wallet_transfer_grid_header_two')}
                size="small"
                subheader={t('main_sections_wallet_transfer_grid_subheader_two')}
              />
              <Table definition>
                {(!filteredTokens || !filteredTokens.length)
                  ? (
                    <Table.Row>
                      <Table.Cell textAlign="center">
                        {t('main_sections_wallet_transfer_table_cell')}
                      </Table.Cell>
                    </Table.Row>
                  )
                  : false
                }
                {filteredTokens.map((symbol) => (
                  <Table.Row>
                    <Table.Cell textAlign="right">{symbol}</Table.Cell>
                    <Table.Cell
                      onClick={() => this.props.actions.transferSetAsset(
                        balances[settings.account][symbol],
                        symbol
                      )}
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
      transferSetAsset,
      useWallet,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('main'),
  connect(mapStateToProps, mapDispatchToProps)
)(WalletTransferContainer);
