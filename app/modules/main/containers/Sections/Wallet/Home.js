// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import { Grid, Segment } from 'semantic-ui-react';

import GlobalTransactionHandler from '../../../../../shared/components/Global/Transaction/Handler';
import WalletPanelFormTransferSend from '../../../../../shared/components/Wallet/Panel/Form/Transfer/Send';

import { clearSystemState } from '../../../../../shared/actions/system/systemstate';
import { getContractHash } from '../../../../../shared/actions/accounts';
import { transfer } from '../../../../../shared/actions/transfer';

class WalletHomeContainer extends Component<Props> {
  onClose = () => this.props.actions.clearSystemState()
  render() {
    const {
      actions,
      app,
      balances,
      blockExplorers,
      connection,
      settings,
      system,
    } = this.props;
    console.log(this.props.actions.clearSystemState)
    return (
      <React.Fragment>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={12}>
              <Segment color="blue" piled>
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
                      settings={settings}
                      system={system}
                    />
                  )}
                  icon="arrow circle up"
                  onClose={this.onClose}
                  settings={settings}
                  system={system}
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
    app: state.app,
    balances: state.balances,
    connection: state.connection,
    settings: state.settings,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      getContractHash,
      transfer,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletHomeContainer));
