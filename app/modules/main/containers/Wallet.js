// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Container, Dimmer, Divider, Dropdown, Grid, Header, Icon, Image, List, Loader, Menu, Placeholder, Rail, Segment, Sidebar, Sticky } from 'semantic-ui-react';
import ReactJson from 'react-json-view';
import Blockies from 'react-blockies';
import { times } from 'lodash';

import GlobalAccountDropdown from '../../../shared/containers/Global/Account/Dropdown';
import GlobalBlockchainDropdown from '../../../shared/containers/Global/Blockchain/Dropdown';
import GlobalHardwareLedgerStatus from '../../../shared/containers/Global/Hardware/Ledger/Status';
import WalletLockState from '../../../shared/components/Wallet/LockState';
import WalletMode from '../../../shared/components/Wallet/Mode';
import logo from '../../../renderer/assets/images/greymass.png';

const {ipcRenderer} = require('electron')

import Logo from '../../../renderer/assets/images/anchor-icon.png';

const accounts = [
  {
    key: 'developjesta@owner',
    text: 'developjesta@owner',
    value: 'developjesta@owner',
  },
  {
    key: 'developjesta@active',
    text: 'developjesta@active',
    value: 'developjesta@active',
  },
  {
    key: 'teamgreymass@active',
    text: 'teamgreymass@active',
    value: 'teamgreymass@active',
  },
]

class WalletContainer extends Component<Props> {
  state = {}
  handleContextRef = contextRef => this.setState({ contextRef })
  render() {
    const {
      settings,
      actions,
      locked,
      validate,
      wallet,
    } = this.props;
    const { contextRef } = this.state
    const sidebar = (
      <Menu
        as={Menu}
        animation='overlay'
        icon='labeled'
        // onHide={this.handleSidebarHide}
        vertical
        // visible={true}
        // size="huge"
        // width='thin'
        style={{
          height: '100vh',
          zIndex: 2,
        }}
      >
        <Menu.Item as='a'>
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
        <Menu.Item as='a'>
          <Icon name='id card' />
          Wallet
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='balance' />
          Governance
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='wrench' />
          Tools
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='settings' />
          Settings
        </Menu.Item>
      </Menu>
    )
    const menu = (
      <Menu
        fixed="top"
      >
        <GlobalBlockchainDropdown
          style={{
            marginLeft: '112px',
            paddingLeft: '1.5rem'
          }}
        />
        <Dropdown
          labeled
          item
          trigger={(
            <React.Fragment>
              <Header
                size="tiny"
                style={{
                  margin: 0
                }}
              >
                <Blockies
                  className="ui image"
                  seed={"greymassvote@active"}
                />
                <Header.Content>
                  greymassvote
                  <Header.Subheader>
                    watch / active
                  </Header.Subheader>
                </Header.Content>
              </Header>
            </React.Fragment>
          )}
        >
          <Dropdown.Menu>
            {accounts.map(option => {
              const [accountName, permission] = option.value.split('@');
              return (
                <Dropdown.Item key={option.value}>
                  <Header
                    size="tiny"
                    style={{
                      margin: 0
                    }}
                  >
                    <Blockies
                      className="ui image"
                      seed={option.value}
                    />
                    <Header.Content>
                      {accountName}
                      <Header.Subheader>
                        {permission} / watch
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Menu position="right">
          <WalletMode
            settings={settings}
          />
          <WalletLockState
            actions={actions}
            key="lockstate"
            locked={locked}
            validate={validate}
            wallet={wallet}
          />
          <GlobalHardwareLedgerStatus />
          <Menu.Item
            name="about"
            position="right"
            // active={activeItem === 'about'}
            onClick={this.handleItemClick}
          >
            <img alt="Greymass" src={logo} />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
    const content = (
      <Segment vertical>
        {times(10, i => (
          <Placeholder fluid key={i}>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        ))}
      </Segment>
    )
    return (
      <React.Fragment>
        <div style={{
          zIndex: 999,
          position: 'fixed',
          top: 0,
          left: 0,
          WebkitBoxFlex: 0,
        }}>
          {sidebar}
        </div>
        <div style={{
          flex: '1 1 auto',
          WebkitBoxFlex: 1,
          paddingTop: '66px',
          paddingLeft: '118px'
        }}>
          <Segment basic >
            <Segment>
              {content}
            </Segment>
          </Segment>
          {menu}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    actions: state.actions,
    locked: state.locked,
    validate: state.validate,
    wallet: state.wallet,
    prompt: state.prompt,
    system: state.system,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));
