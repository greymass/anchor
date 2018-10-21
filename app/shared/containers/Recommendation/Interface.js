// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecommendationInterfaceList from '../../components/Recommendation/Interface/List';

import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';

type Props = {
  actions: {},
  history: {},
  keys: {},
  settings: {},
  validate: {},
  wallet: {}
};

class RecommendationsInterfaceContainer extends Component<Props> {
  props: Props;

  render() {
    const {
      actions,
      history,
      keys,
      settings,
      validate
    } = this.props;
    return (
      <RecommendationInterfaceList
        actions={actions}
        history={history}
        keys={keys}
        settings={settings}
        validate={validate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendationsInterfaceContainer));
