// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import Welcome from '../components/Welcome';
//
// import * as SettingsActions from '../actions/settings';
// import * as ValidateActions from '../actions/validate';

type Props = {
  actions: {},
  settings: {},
  validate: {}
};

class ColdStorageContainer extends Component<Props> {
  props: Props;
  render() {
    const {
      actions,
      history,
      settings,
      validate
    } = this.props;
    return (
      <span>
        offline
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    // settings: state.settings,
    // validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // ...SettingsActions,
      // ...ValidateActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ColdStorageContainer));
