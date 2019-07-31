// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { find } from 'lodash';

import DevTest from '../../../../shared/components/Dev/Test';

import * as AccountsActions from '../../../../shared/actions/accounts';
import * as BEOSWithdrawActions from '../../../../shared/actions/blockchains/beos/withdraw';
import * as BidNameActions from '../../../../shared/actions/system/bidname';
import * as ContractsActions from '../../../../shared/actions/contracts';
import * as ClaimAirgrabActions from '../../../../shared/actions/system/claimairgrab';
import * as CreateAccountActions from '../../../../shared/actions/createaccount';
import * as CustomTokensActions from '../../../../shared/actions/customtokens';
import * as DelegateBWActions from '../../../../shared/actions/system/delegatebw';
import * as GlobalsActions from '../../../../shared/actions/globals';
import * as HardwareLedgerActions from '../../../../shared/actions/hardware/ledger';
import * as NameBidsActions from '../../../../shared/actions/namebids';
import * as ProducersActions from '../../../../shared/actions/producers';
import * as ProposalsActions from '../../../../shared/actions/governance/proposals';
import * as RegProxyActions from '../../../../shared/actions/system/regproxy';
import * as RegproxyinfoActions from '../../../../shared/actions/system/community/regproxyinfo';
import * as SettingsActions from '../../../../shared/actions/settings';
import * as StakeActions from '../../../../shared/actions/stake';
import * as SystemStateActions from '../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../shared/actions/table';
import * as TransactionActions from '../../../../shared/actions/transaction';
import * as TransferActions from '../../../../shared/actions/transfer';
import * as UnregProxyActions from '../../../../shared/actions/system/unregproxy';
import * as UpdateAuthActions from '../../../../shared/actions/system/updateauth';
import * as VoteActions from '../../../../shared/actions/system/voteproducer';
import * as WalletActions from '../../../../shared/actions/wallet';
import * as WalletsActions from '../../../../shared/actions/wallets';
import * as AppActions from '../../../../shared/actions/app';

class DevTestContainer extends Component<Props> {
  render() {
    return (
      <DevTest {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const blockchain = find(state.blockchains, { chainId: state.settings.chainId });
  return {
    blockExplorers: state.blockexplorers[blockchain._id],
    connection: state.connection,
    settings: state.settings,
    system: state.system,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...BEOSWithdrawActions,
      ...BidNameActions,
      ...ClaimAirgrabActions,
      ...ContractsActions,
      ...CreateAccountActions,
      ...CustomTokensActions,
      ...DelegateBWActions,
      ...GlobalsActions,
      ...HardwareLedgerActions,
      ...NameBidsActions,
      ...ProducersActions,
      ...ProposalsActions,
      ...RegProxyActions,
      ...RegproxyinfoActions,
      ...SettingsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
      ...TransferActions,
      ...UnregProxyActions,
      ...UpdateAuthActions,
      ...VoteActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DevTestContainer));
