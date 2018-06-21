// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Button, Confirm } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import * as SettingsActions from '../../../actions/settings';

class GlobalButtonResetContainer extends Component<Props> {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  confirmRemoveWallet = () => {
    this.setState({ open: false }, () => {
      const {
        actions,
        history
      } = this.props;
      const {
        resetApp
      } = actions;
      resetApp();
      history.push('/');
    });
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Button
          color="red"
          content={t('wallet_panel_wallet_remove')}
          fluid
          icon="trash"
          onClick={this.open}
        />
        <Confirm
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
      ...SettingsActions,
    }, dispatch)
  };
}


export default compose(
  withRouter,
  translate('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonResetContainer);
