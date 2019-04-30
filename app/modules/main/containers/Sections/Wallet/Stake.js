// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get } from 'dot-prop-immutable';
import { Decimal } from 'decimal.js';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { Grid, Header, Segment } from 'semantic-ui-react';

import GlobalTransactionHandler from '../../../../../shared/components/Global/Transaction/Handler';
import WalletPanelFormStake from '../../../../../shared/components/Wallet/Panel/Form/Stake';

import { clearSystemState } from '../../../../../shared/actions/system/systemstate';
import { getContractHash } from '../../../../../shared/actions/accounts';
import { setStake } from '../../../../../shared/actions/stake';
import { transfer } from '../../../../../shared/actions/transfer';

class WalletStakeContainer extends Component<Props> {
  onClose = () => this.props.actions.clearSystemState()
  render() {
    const {
      account,
      actions,
      app,
      balances,
      blockExplorers,
      connection,
      settings,
      system,
      validate,
    } = this.props;
    const transaction = system.STAKE_LAST_TRANSACTION;
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;
    return (
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={10}>
              <Segment color="blue" piled>
                <Header>
                  Stake Tokens
                  <Header.Subheader>
                    Staking grants the accounts rights to resources on the network.
                  </Header.Subheader>
                </Header>
                <GlobalTransactionHandler
                  actionName="STAKE"
                  actions={actions}
                  blockExplorers={blockExplorers}
                  content={(
                    <WalletPanelFormStake
                      account={account}
                      accountName={settings.account}
                      actions={actions}
                      balance={balances[settings.account]}
                      connection={connection}
                      cpuAmount={Decimal(String(cpu_weight).split(' ')[0])}
                      key={`stake-form-${settings.account}`}
                      netAmount={Decimal(String(net_weight).split(' ')[0])}
                      onClose={this.onClose}
                      settings={settings}
                      system={system}
                      validate={validate}
                    />
                  )}
                  icon="microchip"
                  title="Update Staked"
                  settings={settings}
                  system={system}
                  transaction={transaction}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: get(state, `accounts.${state.settings.account}`),
    app: state.app,
    balances: state.balances,
    connection: state.connection,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getContractHash,
      setStake,
      transfer,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletStakeContainer));
