// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon, Image, Menu } from 'semantic-ui-react';
import Logo from '../../../renderer/assets/images/anchor-shape.svg';

import packageJson from '../../../package.json';
import NavigationActions from '../actions/navigation';

import GreymassLogoHorizontal from '../../../renderer/assets/images/anchor-text.svg';

class SidebarContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  render() {
    const {
      navigation,
      settings,
      wallets,
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
          minHeight: '100vh',
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
        {(
          settings.walletMode !== 'cold'
          && settings.walletInit
          && settings.chainId
          && wallets > 0
        )
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
                active={module && module.startsWith('wallet')}
                onClick={this.onClick}
                name="wallet"
                color="blue"
              >
                <Icon name="money bill" />
                Wallet
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module && module.startsWith('governance')}
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
          active={module && module.startsWith('tools')}
          onClick={this.onClick}
          name="tools"
          color="violet"
        >
          <Icon name="wrench" />
          Tools
        </Menu.Item>
        <Menu.Header
          style={{
            flexGrow: 1
          }}
        />
        <Menu.Item
          as="a"
          name="version"
          onClick={this.onClick}
          style={{ padding: '0.5em 0' }}
        >
          {packageJson.version}
          <Image centered src={GreymassLogoHorizontal} style={{ marginTop: '0.25em', maxWidth: '6em', width: '6em' }} />
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    settings: state.settings,
    wallets: state.wallets.length,
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
