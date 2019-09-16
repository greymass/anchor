// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import { clearSystemState } from '../../../../../../../shared/actions/system/systemstate';
import { getRamStats } from '../../../../../../../shared/actions/globals';
import * as BuyRamBytesActions from '../../../../../../../shared/actions/system/buyrambytes';
import * as BuyRamActions from '../../../../../../../shared/actions/system/buyram';

import WalletPanelButtonRamBuy from '../../../../../../../shared/components/Wallet/Panel/Button/Ram/Buy';

class AccountOverviewRamBuy extends Component<Props> {
  render() {
    const {
      account,
      actions,
      balances,
      blockExplorers,
      connection,
      globals,
      settings,
      system,
    } = this.props;
    return (
      <WalletPanelButtonRamBuy
        account={account}
        actions={actions}
        balances={balances}
        blockExplorers={blockExplorers}
        connection={connection}
        globals={globals}
        settings={settings}
        system={system}
        trigger={(
          <Button
            color="blue"
            content="Purchase"
            icon="plus circle"
            size="tiny"
          />
        )}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    account: state.accounts[ownProps.account],
    blockExplorers: state.blockexplorers,
    connection: state.connection,
    balances: state.balances,
    globals: state.globals,
    settings: state.settings,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getRamStats,
      ...BuyRamBytesActions,
      ...BuyRamActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountOverviewRamBuy));
