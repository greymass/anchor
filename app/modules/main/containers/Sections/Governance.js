// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

import Producers from '../../../../shared/components/Producers';

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

class GovernenceContainer extends Component<Props> {
  render() {
    return (
      <Producers
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    actions: state.actions,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    blockchains: state.blockchains,
    connection: state.connection,
    globals: state.globals,
    history: state.history,
    keys: state.keys,
    producers: state.producers,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet,
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // ...AccountsActions,
      // ...AppActions,
      // ...BEOSWithdrawActions,
      // ...BlockExplorersActions,
      // ...BuyRamActions,
      // ...BuyRamBytesActions,
      // ...ChainActions,
      // ...ConnectionActions,
      // ...ContractsActions,
      // ...CreateAccountActions,
      // ...GlobalsActions,
      ...ProducersActions,
      // ...ProposalsActions,
      // ...SellRamActions,
      // ...SettingsActions,
      // ...StakeActions,
      // ...SystemStateActions,
      ...TableActions,
      // ...TransactionActions,
      // ...TransferActions,
      // ...ValidateActions,
      // ...VoteProducerActions,
      // ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceContainer));
