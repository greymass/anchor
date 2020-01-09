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
import * as SellRamActions from '../../../../../../../shared/actions/system/sellram';

import isUnlocked from '../../../../../../../shared/utils/Anchor/Unlocked';
import WalletPanelButtonRamSell from '../../../../../../../shared/components/Wallet/Panel/Button/Ram/Sell';

class AccountOverviewRamSell extends Component<Props> {
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
      unlocked,
    } = this.props;
    if (!unlocked) return false;
    return (
      <WalletPanelButtonRamSell
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
            color="red"
            content="Sell"
            floated="right"
            icon="minus circle"
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
    unlocked: isUnlocked(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getRamStats,
      ...SellRamActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountOverviewRamSell));
