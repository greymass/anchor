// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

import { Header, Icon, Segment } from 'semantic-ui-react';

class GlobalAccountRequired extends Component<Props> {
  render() {
    const { settings } = this.props;
    if (!settings.account) {
      return (
        <Segment color="orange" piled style={{ margin: 0 }}>
          <Header>
            <Icon name="stop circle" />
            <Header.Content>
              Account Required
              <Header.Subheader>
                To access this portion of Anchor, please select an account.
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
      );
    }
    return this.props.children;
  }
}


function mapStateToProps(state) {
  return {
    // blockchains: state.blockchains,
    settings: state.settings,
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
)(GlobalAccountRequired);
