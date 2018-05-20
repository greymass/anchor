// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Segment } from 'semantic-ui-react';

import ProducersTable from './Producers/Table';
import WalletConfig from './Wallet/Config';

type Props = {
  actions: {
    getAccount: () => void,
    getProducers: () => void
  },
  accounts: {},
  producers: {},
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
    this.getProducers();
  }

  getAccount = () => {
    const { getAccount } = this.props.actions;
    const { settings } = this.props;
    getAccount(settings);
  }

  getProducers = () => {
    const { getProducers } = this.props.actions;
    const { settings } = this.props;
    getProducers(settings);
  }

  render() {
    const {
      accounts,
      actions,
      producers,
      settings,
      wallet
    } = this.props;
    return (
      <I18n ns="basic">
        {
          (t) => (
            <div>
              <WalletConfig
                accounts={accounts}
                actions={actions}
                settings={settings}
                wallet={wallet}
              />
              {(producers.list.length > 0)
                ? <ProducersTable producers={producers} />
                : "Loading"
              }
            </div>
          )
        }
      </I18n>
    );
  }
}
