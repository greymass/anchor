// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Image, Segment } from 'semantic-ui-react';

import ContentContainer from './Content';
import MenuContainer from './Menu';
import SidebarContainer from './Sidebar';
import Notifications from '../../../shared/components/Notifications';
import WelcomeContainer from '../../../shared/containers/Welcome';

import background from '../../../renderer/assets/images/geometric-background.svg';

class WalletContainer extends Component<Props> {
  render() {
    const {
      actions,
      app,
      settings,
      validate,
      wallet,
    } = this.props;
    if (validate.NODE !== 'SUCCESS') {
      return (
        <WelcomeContainer />
      )
    }
    return (
      <React.Fragment>
        <div
          style={{
            zIndex: 999,
            position: 'fixed',
            top: 0,
            left: 0,
            WebkitBoxFlex: 0,
          }}
        >
          <SidebarContainer />
        </div>
        <div
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
            top: 50,
            transform: 'rotate(0.5turn)',
          // filter: FlipV;
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
    app: state.app,
    actions: state.actions,
    locked: state.locked,
    prompt: state.prompt,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));
