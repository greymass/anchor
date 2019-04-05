// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';
import Logo from '../../../renderer/assets/images/anchor-shape.svg';

import packageJson from '../../../package.json';
import NavigationActions from '../actions/navigation';

class SidebarContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    const {
      navigation,
      settings,
    } = this.props;
    const {
      module
    } = navigation;
    return (
      <Menu
        animation="overlay"
        className="nav-sidebar"
        icon="labeled"
        style={{
          display: 'flex',
          minWidth: '7.67em',
        }}
        vertical
      >
        <Menu.Item as="a" onClick={this.onClick} name="">
          <Image
            centered
            src={Logo}
            size="large"
            style={{
              marginBottom: '0.5rem',
            }}
          />
          Home
        </Menu.Item>
        {(settings.walletInit)
          ? (
            <React.Fragment>
              <Menu.Item
                as="a"
                active={module === 'tests'}
                onClick={this.onClick}
                name="tests"
                color="blue"
              >
                <Icon name="lab" />
                TESTS
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module === 'wallet'}
                onClick={this.onClick}
                name="wallet"
                color="blue"
              >
                <Icon name="id card" />
                Wallet
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module.startsWith('governance')}
                onClick={this.onClick}
                name="governance/producers"
                color="purple"
              >
                <Icon name="balance" />
                Governance
              </Menu.Item>
            </React.Fragment>
          )
          : false
        }
        <Menu.Item
          as="a"
          active={module === 'tools'}
          onClick={this.onClick}
          name="tools"
          color="violet"
          style={{
            flexGrow: 1
          }}
        >
          <Icon name="wrench" />
          Tools
        </Menu.Item>
        <Menu.Item as="a" name="version">
          v{packageJson.version}
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarContainer));
