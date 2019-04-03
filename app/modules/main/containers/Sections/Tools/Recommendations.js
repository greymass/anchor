// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecommendationInterfaceList from '../../../../../shared/components/Recommendation/Interface/List';

class ToolsRecommendations extends Component<Props> {
  render = () => (
    <RecommendationInterfaceList
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(ToolsRecommendations));
