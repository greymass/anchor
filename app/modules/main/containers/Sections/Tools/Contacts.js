// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsContactsComponent from '../../../../../shared/components/Tools/Contacts';

import * as SettingsActions from '../../../../../shared/actions/settings';
import * as NavigationActions from '../../../actions/navigation';

class ToolsContacts extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }
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
      ...NavigationActions,
      ...SettingsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsContacts));
