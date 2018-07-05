// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Menu, Message, Modal } from 'semantic-ui-react';

import WalletModalUnlock from '../Modal/Unlock';

export default class WalletLockStateLocked extends Component<Props> {
  state = {
    password: '',
    open: false
  }

  onChange = (e, { value }) => this.setState({ password: value })

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
      password
    } = this.state;
    actions.unlockWallet(password);
  }
  render() {
    const {
      validate
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <WalletModalUnlock
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              onClose={this.onClose}
              onSubmit={this.onSubmit}
              open={open}
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
              validate={validate}
            />
          )
        }
      </I18n>
    );
  }
}
