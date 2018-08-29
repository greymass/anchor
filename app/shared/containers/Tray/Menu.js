// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { Button, Segment } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';
import ReactJson from 'react-json-view';

import About from '../../components/About';

// import * as AccountsActions from '../actions/accounts';
// import * as SettingsActions from '../actions/settings';
// import * as TransactionActions from '../actions/transaction';
// import * as ValidateActions from '../actions/validate';
// import * as WalletActions from '../actions/wallet';

class TrayMenu extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        test
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    // keys: state.keys,
    // settings: state.settings,
    // system: state.system,
    // transaction: state.transaction,
    // validate: state.validate,
    // wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // ...AccountsActions,
      // ...SettingsActions,
      // ...TransactionActions,
      // ...ValidateActions,
      // ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('tray'),
  connect(mapStateToProps, mapDispatchToProps)
)(TrayMenu);
