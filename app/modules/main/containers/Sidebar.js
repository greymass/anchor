// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { withTranslation } from 'react-i18next';
import { Header, Icon, Image, Menu } from 'semantic-ui-react';
import { find } from 'lodash';

import Logo from '../../../renderer/assets/images/anchor-logo-white.svg';
import AnchorTextHorizontal from '../../../renderer/assets/images/anchor-text-white.svg';

import packageJson from '../../../package.json';
import { clearSystemState } from '../../../shared/actions/system/systemstate';
import * as NavigationActions from '../actions/navigation';
import * as SettingsActions from '../../../shared/actions/settings';
import * as TransactionActions from '../../../shared/actions/transaction';
import WalletPanelButtonBroadcast from '../../../shared/components/Wallet/Panel/Button/Broadcast';


class SidebarContainer extends Component<Props> {
  onClick = (e, data) => this.props.actions.changeModule(data.name)
  toggleCollapsed = () => {
    const {
      actions,
      settings,
    } = this.props;
    actions.setSetting('sidebarCollapsed', !settings.sidebarCollapsed);
  };
  render() {
    const {
      actions,
      blockExplorers,
      connection,
      navigation,
      settings,
      system,
      t,
      transaction,
      wallets,
    } = this.props;
    const {
      module
    } = navigation;
    const background = '#5169B1';
    const color = '#d1d5d8';
    const devMode = false;
    return (
      <Menu
        animation="overlay"
        className="nav-sidebar"
        inverted
        icon={settings.sidebarCollapsed}
        pointing
        style={{
          display: 'flex',
          background: '#1E2229',
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
            backgroundColor: '#3650A2',
            backgroundSize: 'contain',
            borderRadius: 0,
            color,
            textAlign: 'center'
          }}
        >
          <Image
            centered
            src={Logo}
            size="large"
            style={{
              width: ((settings.sidebarCollapsed) ? '3em' : '7em'),
            }}
          />
          {(!settings.sidebarCollapsed)
            ? (
                <p style={{
                  marginTop: '0.5rem',
                }}>
                <Image
                  centered
                  src={AnchorTextHorizontal}
                  style={{
                    fill: 'currentColor',
                    marginTop: '1em',
                    maxWidth: ((settings.sidebarCollapsed) ? '3em' : '6em'),
                    width: ((settings.sidebarCollapsed) ? '3em' : '6em')
                  }}
                />
                </p>
              )
            : false
          }
        </Menu.Item>
        <Menu.Item
          as="a"
          active={(!module)}
          onClick={this.onClick}
          name=""
          style={{
            backgroundColor: (!module) ? background : '',
            color,
          }}
        >
          <Icon name="home" size="large" />
          {(!settings.sidebarCollapsed)
            ? <p>{t('home')}</p>
            : false
          }
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
                style={{
                  backgroundColor: (module && module.startsWith('wallet')) ? background : '',
                  color,
                }}
              >
                <Icon name="id card" size="large" />
                {(!settings.sidebarCollapsed)
                  ? <p>{t('wallet')}</p>
                  : false
                }
              </Menu.Item>
              {(connection.stakedResources)
                ? (
                  <Menu.Item
                    as="a"
                    active={module && module.startsWith('account')}
                    onClick={this.onClick}
                    name={`account/${settings.account}`}
                    style={{
                      backgroundColor: (module && module.startsWith('account')) ? background : '',
                      color,
                    }}
                  >
                    <Icon name="tachometer alternate" size="large" />
                    {(!settings.sidebarCollapsed)
                      ? <p>{t('resources')}</p>
                      : false
                    }
                  </Menu.Item>
                )
                : false
              }
              <Menu.Item
                as="a"
                active={module && module.startsWith('governance')}
                onClick={this.onClick}
                name="governance/producers"
                style={{
                  backgroundColor: (module && module.startsWith('governance')) ? background : '',
                  color,
                }}
              >
                <Icon name="balance" size="large" />
                {(!settings.sidebarCollapsed)
                  ? <p>{t('governance')}</p>
                  : false
                }
              </Menu.Item>
              {(devMode === true)
                ? (
                  <React.Fragment>
                    <Menu.Item
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
                    </Menu.Item>
                  </React.Fragment>
                )
                : false
              }
            </React.Fragment>
          )
          : false
        }
        <Menu.Item
          as="a"
          active={module && module.startsWith('tools')}
          onClick={this.onClick}
          name="tools"
          style={{
            backgroundColor: (module && module.startsWith('tools')) ? background : '',
            color,
          }}
        >
          <Icon
            name="wrench"
            size="large"
          />
          {(!settings.sidebarCollapsed)
            ? <p>{t('tools')}</p>
            : false
          }
        </Menu.Item>
        <Menu.Header
          style={{
            flexGrow: 1
          }}
        />
        {(
          settings.walletInit
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
            name={(settings.sidebarCollapsed) ? 'caret square right outline' : 'caret square left outline'}
            size={(settings.sidebarCollapsed) ? 'large' : 'large'}
            style={{
              color,
            }}
          />
          {(!settings.sidebarCollapsed)
            ? <p>Minimize Menu</p>
            : false
          }
        </Menu.Item>
        <Menu.Item
          as="a"
          name="version"
          onClick={this.onClick}
          style={{
            borderRadius: 0,
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
            src={AnchorTextHorizontal}
            style={{
              fill: 'currentColor',
              marginTop: '0.25em',
              maxWidth: ((settings.sidebarCollapsed) ? '3em' : '4em'),
              width: ((settings.sidebarCollapsed) ? '3em' : '4em')
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
    connection: state.connection,
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
      ...TransactionActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('menu'),
  connect(mapStateToProps, mapDispatchToProps)
)(SidebarContainer);
