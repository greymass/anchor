// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsContactsComponent from '../../../../../shared/components/Tools/Contacts';

import * as SettingsActions from '../../../../../shared/actions/settings';

class ToolsContacts extends Component<Props> {
  render = () => (
    <ToolsContactsComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsContacts));
