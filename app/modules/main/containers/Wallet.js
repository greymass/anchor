// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Dimmer, Header, Image, Loader, Segment } from 'semantic-ui-react';

import ContentContainer from './Content';
import MenuContainer from './Menu';
import SidebarContainer from './Sidebar';
import Notifications from '../../../shared/components/Notifications';
import WelcomeContainer from '../../../shared/containers/Welcome';
import * as ValidateActions from '../../../shared/actions/validate';

import background from '../../../renderer/assets/images/geometric-background.svg';

class WalletContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { actions, connectionStatus, settings } = props;
    if (connectionStatus !== 'SUCCESS' && settings.node) {
      const { validateNode } = actions;
      validateNode(settings.node, settings.chainId, false, true);
      this.state = { initialized: false };
    }
  }
  state = { initialized: true };
  componentDidUpdate(prevProps) {
    if (
      !this.state.initialized
      && this.props.connectionStatus !== prevProps.connectionStatus
      && this.props.connectionStatus === 'SUCCESS'
    ) {
      this.setState({ initialized: true });
    }
  }
  render() {
    const {
      settings,
    } = this.props;
    const {
      initialized
    } = this.state;
    if (!settings.walletInit) {
      return (
        <WelcomeContainer />
      )
    }
    if (!initialized) {
      return (
        <span>Loading...</span>
      )
    }
    return (
      <React.Fragment>
        <div
          style={{
            zIndex: 1002,
            position: 'fixed',
            top: 0,
            left: 0,
            WebkitBoxFlex: 0,
          }}
        >
          <SidebarContainer />
        </div>
        <div
          id="test-test"
          style={{
            flex: '1 1 auto',
            WebkitBoxFlex: 1,
            paddingTop: '61px',
            paddingLeft: '107px'
          }}
        >
          <Segment basic>
            <ContentContainer />
          </Segment>
          <MenuContainer />
        </div>
        <Image
          fluid
          src={background}
          style={{
            // bottom: 0,
            top: 50,
            transform: 'rotate(0.5turn)',
            right: '-1em',
            opacity: 0.5,
            position: 'fixed',
            zIndex: -1
          }}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    connectionStatus: state.validate.NODE,
    settings: state.settings,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ValidateActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));
