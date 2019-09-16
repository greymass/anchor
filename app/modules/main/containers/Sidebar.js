// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Image, Menu } from 'semantic-ui-react';
import { find } from 'lodash';

import Logo from '../../../renderer/assets/images/anchor-shape.svg';

import packageJson from '../../../package.json';
import { clearSystemState } from '../../../shared/actions/system/systemstate';
import * as NavigationActions from '../actions/navigation';
import * as SettingsActions from '../../../shared/actions/settings';
import WalletPanelButtonBroadcast from '../../../shared/components/Wallet/Panel/Button/Broadcast';

import GreymassLogoHorizontal from '../../../renderer/assets/images/anchor-text-light.svg';

class SidebarContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  toggleCollapsed = () => {
    const {
      actions,
      settings,
    } = this.props;
    actions.setSetting('sidebarCollapsed', !settings.sidebarCollapsed);
  }
  render() {
    const {
      actions,
      blockExplorers,
      navigation,
      settings,
      system,
      transaction,
      wallets,
    } = this.props;
    const {
      module
    } = navigation;
    const color = '#d1d5d8';
    return (
      <Menu
        animation="overlay"
        className="nav-sidebar"
        inverted
        icon={settings.sidebarCollapsed}
        style={{
          display: 'flex',
          background: '#29242f',
          borderRadius: 0,
          borderRight: 'none',
          minHeight: '100vh',
        }}
        vertical
      >
        <Menu.Item
          as="a"
          onClick={this.onClick}
          name=""
          style={{
            color,
            textAlign: 'center'
          }}
        >
          <Image
            centered
            src={Logo}
            size="large"
            style={{
              marginBottom: '0.5rem',
              width: ((settings.sidebarCollapsed) ? '2em' : '7em'),
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
                active={module && module.startsWith('wallet')}
                onClick={this.onClick}
                name="wallet"
                color="teal"
                style={{ color }}
              >
                <Icon name="id card" size="large" />
                {(!settings.sidebarCollapsed)
                  ? <p>Wallet</p>
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module && module.startsWith('account')}
                onClick={this.onClick}
                name={`account/${settings.account}`}
                color="blue"
                style={{ color }}
              >
                <Icon name="tachometer alternate" size="large" />
                {(!settings.sidebarCollapsed)
                  ? <p>Resources</p>
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module && module.startsWith('governance')}
                onClick={this.onClick}
                name="governance/producers"
                color="purple"
                style={{ color }}
              >
                <Icon name="balance" size="large" />
                {(!settings.sidebarCollapsed)
                  ? <p>Governance</p>
                  : false
                }
              </Menu.Item>
              {/* <Menu.Item
                as="a"
                active={module === 'tests'}
                onClick={this.onClick}
                name="tests"
                color="red"
                style={{ color }}
              >
                <Icon name="external" />
                {(!settings.sidebarCollapsed)
                  ? 'URI TESTS'
                  : false
                }
              </Menu.Item>
              <Menu.Item
                as="a"
                active={module === 'devtest'}
                onClick={this.onClick}
                name="devtest"
                color="orange"
                style={{ color }}
              >
                <Icon name="lab" />
                {(!settings.sidebarCollapsed)
                  ? 'DevTests'
                  : false
                }
              </Menu.Item> */}
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
          style={{ color }}
        >
          <Icon
            name="wrench"
            size="large"
          />
          {(!settings.sidebarCollapsed)
            ? <p>Tools</p>
            : false
          }
        </Menu.Item>
        <Menu.Header
          style={{
            flexGrow: 1
          }}
        />
        {(
          blockExplorers
          && settings.walletInit
          && settings.chainId
        )
          ? (
            <WalletPanelButtonBroadcast
              actions={actions}
              blockExplorers={blockExplorers}
              color={color}
              settings={settings}
              system={system}
              transaction={transaction}
            />
          ) : false
        }
        <Menu.Item
          as="a"
          onClick={this.toggleCollapsed}
          style={{
            color,
          }}
        >
          <Icon
            name={(settings.sidebarCollapsed) ? 'list' : 'circle arrow left'}
            size={(settings.sidebarCollapsed) ? 'small' : 'large'}
            style={{
              color,
            }}
          />
          {(!settings.sidebarCollapsed)
            ? <p>Minimize Sidebar</p>
            : false
          }
        </Menu.Item>
        <Menu.Item
          as="a"
          name="version"
          onClick={this.onClick}
          style={{
            color,
            padding: '0.5em 0',
            textAlign: 'center',
          }}
        >
          <Header
            content={packageJson.version}
            size="small"
            style={{
              color,
              margin: 0,
            }}
          />
          <Image
            centered
            src={GreymassLogoHorizontal}
            style={{
              color: 'red',
              fill: 'currentColor',
              marginTop: '0.25em',
              maxWidth: ((settings.sidebarCollapsed) ? '4em' : '7em'),
              width: ((settings.sidebarCollapsed) ? '4em' : '7em')
            }}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  const blockchain = find(state.blockchains, { chainId: state.settings.chainId });
  return {
    blockExplorers: (blockchain) ? state.blockexplorers[blockchain._id] : false,
    navigation: state.navigation,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    wallets: state.wallets.length,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      clearSystemState,
      ...NavigationActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SidebarContainer));
