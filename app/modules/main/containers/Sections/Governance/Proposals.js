// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsGovernanceProposals from '../../../../../shared/components/Tools/Governance/Proposals';

import * as ProposalsActions from '../../../../../shared/actions/governance/proposals';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';

class GovernenceProposalsContainer extends Component<Props> {
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
      ...ProposalsActions,
      ...SystemStateActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceProposalsContainer));
