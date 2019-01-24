// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';
import { push } from 'react-router-redux'
import Logo from '../../../renderer/assets/images/anchor-icon.png';

import NavigationActions from '../actions/navigation';

class SidebarContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    const {
      navigation
    } = this.props;
    const {
      module
    } = navigation;
    console.log(this.props)
    return (
      <Menu
        animation="overlay"
        className="nav-sidebar"
        icon="labeled"
        vertical
      >
        <Menu.Item as="a" onClick={this.onClick} name="">
          <Image
            centered
            src={Logo}
            size="tiny"
            style={{
              marginBottom: '0.5rem',
            }}
          />
          Home
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
          active={module === 'governance'}
          onClick={this.onClick}
          name="governance"
          color="purple"
        >
          <Icon name="balance" />
          Governance
        </Menu.Item>
        <Menu.Item
          as="a"
          active={module === 'tools'}
          onClick={this.onClick}
          name="tools"
          color="violet"
        >
          <Icon name="wrench" />
          Tools
        </Menu.Item>
        <Menu.Item
          as="a"
          active={module === 'settings'}
          onClick={this.onClick}
          name="settings"
          color="pink"
        >
          <Icon name="settings" />
          Settings
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    actions: state.actions,
    locked: state.locked,
    navigation: state.navigation,
    validate: state.validate,
    wallet: state.wallet,
    prompt: state.prompt,
    system: state.system,
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
