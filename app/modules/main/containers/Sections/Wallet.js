// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { times } from 'lodash';

import Wallet from '../../../../shared/components/Wallet';

import * as AccountsActions from '../../../../shared/actions/accounts';
import * as AppActions from '../../../../shared/actions/app';
import * as BlockExplorersActions from '../../../../shared/actions/blockexplorers';
import * as BuyRamBytesActions from '../../../../shared/actions/system/buyrambytes';
import * as BuyRamActions from '../../../../shared/actions/system/buyram';
import * as ChainActions from '../../../../shared/actions/chain';
import * as ConnectionActions from '../../../../shared/actions/connection';
import * as ContractsActions from '../../../../shared/actions/contracts';
import * as CreateAccountActions from '../../../../shared/actions/createaccount';
import * as GlobalsActions from '../../../../shared/actions/globals';
import * as ProducersActions from '../../../../shared/actions/producers';
import * as ProposalsActions from '../../../../shared/actions/governance/proposals';
import * as SellRamActions from '../../../../shared/actions/system/sellram';
import * as SettingsActions from '../../../../shared/actions/settings';
import * as StakeActions from '../../../../shared/actions/stake';
import * as TableActions from '../../../../shared/actions/table';
import * as TransactionActions from '../../../../shared/actions/transaction';
import * as TransferActions from '../../../../shared/actions/transfer';
import * as ValidateActions from '../../../../shared/actions/validate';
import * as VoteProducerActions from '../../../../shared/actions/system/voteproducer';
import * as WalletActions from '../../../../shared/actions/wallet';
import * as SystemStateActions from '../../../../shared/actions/system/systemstate';
import * as BEOSWithdrawActions from '../../../../shared/actions/blockchains/beos/withdraw';

class WalletContainer extends Component<Props> {
  render() {
    return (
      <Wallet {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    // app: state.app,
    actionHistories: state.actions,
    balances: state.balances,
    // blockchains: state.blockchains,
    allBlockExplorers: state.blockexplorers,
    // chain: state.chain,
    connection: state.connection,
    // contracts: state.contracts,
    // globals: state.globals,
    keys: state.keys,
    // ledger: state.ledger,
    // producers: state.producers,
    // proposals: state.proposals,
    settings: state.settings,
    system: state.system,
    // tables: state.tables,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet,
    // wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      // ...AppActions,
      // ...BEOSWithdrawActions,
      // ...BlockExplorersActions,
      ...BuyRamActions,
      ...BuyRamBytesActions,
      // ...ChainActions,
      // ...ConnectionActions,
      // ...ContractsActions,
      // ...CreateAccountActions,
      ...GlobalsActions,
      // ...ProducersActions,
      // ...ProposalsActions,
      ...SellRamActions,
      // ...SettingsActions,
      // ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      // ...TransactionActions,
      // ...TransferActions,
      // ...ValidateActions,
      // ...VoteProducerActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));
