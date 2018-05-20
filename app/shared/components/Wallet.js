// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

import WalletConfig from './Wallet/Config';
import WalletStatus from './Wallet/Status';

type Props = {
  actions: {
    getAccount: () => void,
    getProducers: () => void
  },
  accounts: {},
  settings: {},
  wallet: {}
};

export default class Producers extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const { settings } = this.props;
    if (settings && settings.account) {
      this.getAccount();
    }
  }

  getAccount = () => {
    const { getAccount } = this.props.actions;
    const { settings } = this.props;
    getAccount(settings);
  }

  render() {
    const {
      actions,
      accounts,
      settings,
      wallet
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <WalletConfig
                actions={actions}
                settings={settings}
                wallet={wallet}
              />
              <WalletStatus
                accounts={accounts}
                settings={settings}
              />
            </div>
          )
        }
      </I18n>
    );
  }
}
