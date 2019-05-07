// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Dimmer, Grid, Header, Image, Loader, Segment } from 'semantic-ui-react';
import Either from 'eitherx'

import ContentContainer from './Content';
import ContentErrorContainer from './ContentError';
import MenuContainer from './Menu';
import SidebarContainer from './Sidebar';
import Notifications from '../../../shared/components/Notifications';
import WelcomeContainer from '../../../shared/containers/Welcome';
import { setWalletMode } from '../../../shared/actions/wallet';
import * as ValidateActions from '../../../shared/actions/validate';

import anchorLogo from '../../../renderer/assets/images/anchor-logo.svg';
import anchorText from '../../../renderer/assets/images/anchor-text.svg';
import background from '../../../renderer/assets/images/geometric-background.svg';

class MainIndexContainer extends Component<Props> {
  constructor(props) {
    super(props);
    const { actions, connectionStatus, settings } = props;
    if (connectionStatus !== 'SUCCESS' && settings.node) {
      const { validateNode } = actions;
      validateNode(settings.node, settings.chainId, false, true);
      this.state = {
        initialized: true
      };
    }
    if (settings.walletInit && settings.walletMode) {
      actions.setWalletMode(settings.walletMode);
    }
  }
  state = {
    initialized: true,
    errorBoundaryKey: 0,
  };
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
      errorBoundaryKey,
      initialized,
    } = this.state;
    console.log(initialized)
    if (!initialized) {
      return (
        <Grid
          style={{
            height: '100%'
          }}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column>
            <Segment basic style={{ marginTop: 0 }}>
              <Image
                alt="Anchor Logo"
                centered
                src={anchorLogo}
                style={{
                  width: '256px',
                }}
              />
              <Image
                alt="Anchor"
                centered
                src={anchorText}
                style={{
                  width: '256px',
                  marginTop: '1em',
                }}
              />
            </Segment>
            Loading...
          </Grid.Column>
        </Grid>
      );
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        // alignContent: 'stretch',
        alignItems: 'flex-start',
      }}>
        <div style={{
          flex: '0 1 auto',
          position: 'sticky',
          top: 0,
        }}>
          <SidebarContainer />
        </div>
        <div style={{
          flex: '1 1 auto',
        }}>
          <div style={{
            position: 'sticky',
            top: 0,
            zIndex: 999
          }}>
            <MenuContainer />
          </div>
          <div style={{
            padding: '1.25em'
          }}>
            <Image
              fluid
              src={background}
              style={{
                bottom: 0,
                // top: 62,
                // transform: 'rotate(0.5turn)',
                right: '-1em',
                opacity: 0.5,
                position: 'fixed',
                zIndex: -1
              }}
            />
            <Either
              catchError={({ error }) => (
                <ContentErrorContainer
                  error={error}
                />
              )}
              key={errorBoundaryKey}
              render={() => <ContentContainer />}
            />
          </div>
        </div>
      </div>

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
      setWalletMode,
      ...ValidateActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainIndexContainer));
