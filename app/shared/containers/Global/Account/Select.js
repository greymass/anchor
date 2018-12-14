// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Dropdown, Header, Icon, Input, Segment, Tab } from 'semantic-ui-react';

import GlobalAccountSelectWallet from './Select/Wallet';
import GlobalButtonElevate from '../Button/Elevate';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

class GlobalAccountSelect extends Component<Props> {
  render() {
    return (
      <Segment>
        <GlobalAccountSelectWallet />
      </Segment>
    );
  }
}


function mapStateToProps(state) {
  return {
    // blockchains: state.blockchains,
    // settings: state.settings,
    // validate: state.validate,
    // wallet: state.wallet,
    // wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // ...WalletActions,
      // ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountSelect);
