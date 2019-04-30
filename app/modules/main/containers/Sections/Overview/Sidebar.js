// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { find } from 'lodash';

import OverviewSidebarBackupContainer from './Sidebar/Backup';
import GlobalSidebarUpdate from '../../../components/Overview/Sidebar/Update';

const latestUpdate = {
  version: '1.0.1',
  header: 'Release Title',
  description: `Some text

and more text for formatting testing

- Test 1
- Test 2
- Test 3`
};
// const latestUpdate = false;

class OverviewSidebarContainer extends Component<Props> {
  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Sidebar Prop '${key}' changed`)
    );
  }
  render() {
    const {
      app,
      settings
    } = this.props;
    const {
      constants
    } = app;
    return (
      <React.Fragment>
        <GlobalSidebarUpdate
          constants={constants}
          update={this.props.latestUpdate}
        />
        <OverviewSidebarBackupContainer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    blockchain: find(state.blockchains, { chainId: state.settings.chainId }),
    latestUpdate,
    node: state.connection.httpEndpoint,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewSidebarContainer);
