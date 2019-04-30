// @flow
import React, { Component } from 'react';
import { Header, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import ProducersProxy from './Proxy';
import ProxiesTable from './Proxies/Table';

class Proxies extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      addProxy: false,
      amount: 10,
      querying: false,
      removeProxy: false,
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 120000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  addProxy = (proxyAccout) => {
    this.setState({
      addProxy: proxyAccout
    });
  }

  removeProxy = () => {
    this.setState({
      removeProxy: true
    });
  }

  onClose = () => {
    this.setState({
      addProxy: false,
      removeProxy: false
    });
  }

  loadMore = () => this.setState({ amount: this.state.amount + 10 });

  resetDisplayAmount = () => this.setState({ amount: 10 });
  isQuerying = (querying) => this.setState({ querying });

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getTable
    } = actions;

    if (validate.NODE) {
      getTable('regproxyinfo', 'regproxyinfo', 'proxies');
    }
  }

  render() {
    const {
      accounts,
      actions,
      allBlockExplorers,
      connection,
      globals,
      pubkeys,
      settings,
      system,
      t,
      tables
    } = this.props;
    const {
      addProxy,
      amount,
      querying,
      removeProxy,
    } = this.state;

    const account = accounts[settings.account];
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const currentProxy = account && account.voter_info && account.voter_info.proxy;
    const proxies = (tables.regproxyinfo && tables.regproxyinfo.regproxyinfo.proxies.rows) || [];
    const isValidUser = (pubkeys.unlocked.includes(wallet.pubkey) || ['watch', 'ledger'].includes(settings.walletMode));

    return (proxies.length > 0)
      ? [(
        <Visibility
          continuous
          key="ProxiesTable"
          fireOnMount
          onBottomVisible={this.loadMore}
          once={false}
        >
          <ProxiesTable
            accounts={accounts}
            actions={actions}
            addProxy={this.addProxy}
            amount={amount}
            attached="top"
            currentProxy={currentProxy}
            globals={globals}
            isProxying={isProxying}
            isQuerying={this.isQuerying}
            isValidUser={isValidUser}
            proxies={proxies}
            removeProxy={this.removeProxy}
            resetDisplayAmount={this.resetDisplayAmount}
            settings={settings}
            system={system}
          />
        </Visibility>
      ), (
          (!querying && amount < proxies.length)
            ? (
              <Segment key="ProxiesTableLoading" clearing padded vertical>
                <Loader active />
              </Segment>
            ) : false
        )] : (
          <Segment attached="bottom" stacked>
            <Header textAlign="center">
              {t('producers_proxies_none_loaded')}
            </Header>
          </Segment>
      );
  }
}

export default translate('producers')(Proxies);
