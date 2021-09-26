// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
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
        resetApp
      } = actions;
      resetApp();
      if (this.props.onReset) {
        this.props.onReset();
      }
      actions.changeModule('');
    });
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Button
          content={t('tools_button_reset')}
          floated="right"
          icon="trash"
          onClick={this.open}
        />
        <Confirm
          content={t('tools_confirm_content_reset')}
          header={t('tools_confirm_header_reset')}
          open={this.state.open}
          onCancel={this.close}
          onConfirm={this.confirmRemoveWallet}
        />
      </React.Fragment>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    accounts: state.accounts,
    balances: state.balances,
    chain: state.chain,
    globals: state.globals,
    keys: state.keys,
    onReset: ownProps.onReset,
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
  withTranslation('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonResetContainer);
