// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import { setSetting } from '../../../../../shared/actions/settings';
import { swapBlockchain } from '../../../../../shared/actions/blockchains';

import GlobalButtonAccountImport from '../../../../../shared/components/Global/Button/Account/Import';

class HomeAccountsContainer extends Component<Props> {
  render() {
    const {
      settings,
    } = this.props;
    return (
      <Segment style={{ marginTop: 0 }}>
        <Header
          content="No wallets"
          subheader="import to continue"
        />
        <Segment basic padded>
          <GlobalButtonAccountImport
            settings={settings}
          />
        </Segment>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
      swapBlockchain,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeAccountsContainer));
