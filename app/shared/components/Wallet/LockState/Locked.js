// @flow
import React, { Component } from 'react';
import { Button, Form, Header, Icon, Input, Menu, Message, Modal, Popup } from 'semantic-ui-react';

import WalletModalUnlock from '../Modal/Unlock';

export default class WalletLockStateLocked extends Component<Props> {
  state = {
    all: true,
    password: '',
    open: false
  }

  onChange = (e, { value }) => this.setState({ password: value })
  onChangeAll = (e, { checked }) => this.setState({ all: checked })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  onSubmit = () => {
    const {
      actions
    } = this.props;
    const {
      all,
      password
    } = this.state;
    actions.unlockWallet(
      password, // password
      false, // use immediately?
      all, // unlock all?
    );
  };
  render() {
    const {
      validate
    } = this.props;
    const {
      all,
      open,
    } = this.state;
    return (
      <WalletModalUnlock
        all={all}
        onChange={this.onChange}
        onChangeAll={this.onChangeAll}
        onKeyPress={this.onKeyPress}
        onClose={this.onClose}
        onSubmit={this.onSubmit}
        open={open}
        trigger={(
          <Popup
            content="The wallet is currently locked. Click this menu item and enter its password to unlock it."
            inverted
            trigger={(
              <Menu.Item
                color="yellow"
                key="lockstate"
                inverted="true"
                onClick={this.onOpen}
              >
                <Icon
                  color="green"
                  name="lock"
                />
              </Menu.Item>
            )}
          />
        )}
        validate={validate}
      />
    );
  }
}
