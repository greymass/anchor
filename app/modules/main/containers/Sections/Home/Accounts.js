// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

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

    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(HomeAccountsContainer);
