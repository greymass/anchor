// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DevTest from '../components/Dev/Test';

import * as AccountsActions from '../actions/accounts';
import * as AppActions from '../actions/app';
import * as BlockExplorersActions from '../actions/blockexplorers';
import * as BuyRamBytesActions from '../actions/system/buyrambytes';
import * as BuyRamActions from '../actions/system/buyram';
import * as ChainActions from '../actions/chain';
import * as ClaimAirgrabActions from '../actions/system/claimairgrab';
import * as ConnectionActions from '../actions/connection';
import * as CreateAccountActions from '../actions/createaccount';
import * as DelegateActions from '../actions/system/delegatebw';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as RexActions from '../actions/system/rex';
import * as SellRamActions from '../actions/system/sellram';
import * as SettingsActions from '../actions/settings';
import * as StakeActions from '../actions/stake';
import * as TableActions from '../actions/table';
import * as TransactionActions from '../actions/transaction';
import * as TransferActions from '../actions/transfer';
import * as ValidateActions from '../actions/validate';
import * as VoteProducerActions from '../actions/system/voteproducer';
import * as WalletActions from '../actions/wallet';
import * as SystemStateActions from '../actions/system/systemstate';
import * as Jurisdictions from '../actions/jurisdictions';

import Airgrabs from '../components/Tools/Airgrabs';

class TestContainer extends Component<Props> {
  render() {
    return <DevTest {...this.props} />;
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...BlockExplorersActions,
      ...BuyRamActions,
      ...BuyRamBytesActions,
      ...ClaimAirgrabActions,
      ...ChainActions,
      ...ConnectionActions,
      ...CreateAccountActions,
      ...DelegateActions,
      ...GlobalsActions,
      ...ProducersActions,
      ...RexActions,
      ...SellRamActions,
      ...SettingsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
      ...TransferActions,
      ...ValidateActions,
      ...VoteProducerActions,
      ...Jurisdictions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestContainer));
