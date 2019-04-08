// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsGovernanceProposals from '../../../../../shared/components/Tools/Governance/Proposals';

import * as ProposalsActions from '../../../../../shared/actions/governance/proposals';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as NavigationActions from '../../../actions/navigation';

class GovernenceProposalsContainer extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render() {
    return (
      <ToolsGovernanceProposals {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    proposals: state.proposals,
    settings: state.settings,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...ProposalsActions,
      ...SystemStateActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceProposalsContainer));
