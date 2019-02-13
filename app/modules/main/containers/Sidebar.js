// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';
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
          Overview
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
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
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
