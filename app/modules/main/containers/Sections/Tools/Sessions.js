// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavigationActions from '../../../actions/navigation';
import SessionsActions from '../../../../../shared/actions/sessions';
import ToolsSessionsComponent from '../../../../../shared/components/Tools/Sessions';

class ToolsSessions extends Component<Props> {
  render = () => (
    <ToolsSessionsComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => ({
    sessions: state.sessions,
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...SessionsActions,
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsSessions));
