// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Segment, Tab } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { setSetting } from '../../../../../shared/actions/settings';
import { swapBlockchain } from '../../../../../shared/actions/blockchains';

import GlobalAccountImport from '../../../../../shared/containers/Global/Account/Import';

class HomeAccountsContainer extends Component<Props> {
  onClose = () => {
    const {
      history,
    } = this.props;
    history.push('/');
  }
  render() {
    return (
      <GlobalAccountImport onClose={this.onClose} />
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

export default compose(
  withRouter,
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeAccountsContainer);
