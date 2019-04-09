// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecommendationInterfaceList from '../../../../../shared/components/Recommendation/Interface/List';

class ToolsRecommendations extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render = () => (
    <RecommendationInterfaceList
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    account: state.accounts[state.settings.account],
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(ToolsRecommendations));
