// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import RecommendationInterfaceList from '../../components/Recommendation/Interface/List';

type Props = {
  accounts: {},
  settings: {}
};

class RecommendationsInterfaceContainer extends Component<Props> {
  props: Props;

  render() {
    const {
      accounts,
      settings
    } = this.props;

    return (
      <RecommendationInterfaceList
        account={accounts[settings.account]}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(RecommendationsInterfaceContainer));
