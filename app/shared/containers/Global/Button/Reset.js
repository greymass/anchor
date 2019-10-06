// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Button, Confirm } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import * as LedgerActions from '../../../actions/hardware/ledger';
import * as NavigationActions from '../../../../modules/main/actions/navigation';
import * as SettingsActions from '../../../actions/settings';

class GlobalButtonResetContainer extends Component<Props> {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  confirmRemoveWallet = () => {
    const { actions } = this.props;
    actions.ledgerStopListen();
    this.setState({ open: false }, () => {
      const {
        actions,
        history
      } = this.props;
      const {
        resetApp
      } = actions;
      resetApp();
      actions.changeModule('');
    });
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Button
          content="Reset Application"
          floated="right"
          icon="trash"
          onClick={this.open}
        />
        <Confirm
          content="This action will erase all private keys, settings, accounts and restore this application to its default state. Ensure you have a proper backup before proceeding."
          header="Warning"
          open={this.state.open}
          onCancel={this.close}
          onConfirm={this.confirmRemoveWallet}
        />
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balances: state.balances,
    chain: state.chain,
    globals: state.globals,
    keys: state.keys,
    producers: state.producers,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...LedgerActions,
      ...NavigationActions,
      ...SettingsActions,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  translate('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonResetContainer);
