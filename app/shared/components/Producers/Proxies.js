// @flow
import React, { Component } from 'react';
import { Divider, Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import SidebarAccount from '../../containers/Sidebar/Account';
import WalletPanel from '../Wallet/Panel';
import ProducersProxy from './Proxy'
import ProxiesTable from './Proxies/Table';

type Props = {
  actions: {
    clearSystemState: () => void,
    getAccount: () => void,
    getGlobals: () => void,
    getProducers: () => void,
    voteproducers: () => void
  },
  accounts: {},
  balances: {},
  blockExplorers: {},
  globals: {},
  history: {},
  keys: {},
  producers: {
    lastTransaction: {},
    selected: []
  },
  settings: {},
  system: {},
  t: () => void,
  tables: {},
  validate: {},
  wallet: {}
};

class Proxies extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      amount: 40,
      querying: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadMore = () => this.setState({ amount: this.state.amount + 20 });

  resetDisplayAmount = () => this.setState({ amount: 40 });
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

  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      globals,
      history,
      keys,
      settings,
      system,
      t,
      tables,
      validate,
      wallet
    } = this.props;
    const {
      addProxy,
      amount,
      querying,
      removeProxy
    } = this.state;
    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        balances={balances}
        blockExplorers={blockExplorers}
        globals={globals}
        key="WalletPanel"
        settings={settings}
        system={system}
        validate={validate}
        wallet={wallet}
      />
    )];
    const account = accounts[settings.account];
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const proxies = (tables.regproxyinfo && tables.regproxyinfo.regproxyinfo.proxies.rows) || [];
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');

    if (isValidUser && settings.walletMode !== 'wait') {
      sidebar = (
        <React.Fragment>
          <ProducersProxy
            addProxy={addProxy}
            account={account}
            accounts={accounts}
            actions={actions}
            blockExplorers={blockExplorers}
            onClose={this.onClose.bind(this)}
            isProxying={isProxying}
            isValidUser={isValidUser}
            removeProxy={removeProxy}
            settings={settings}
            system={system}
            tables={tables}
          />
        </React.Fragment>
      );
    }
    return (
      <div ref={this.handleContextRef}>
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={6}>
              <SidebarAccount
                actions={actions}
                history={history}
                wallet={wallet}
              />
              {sidebar}
            </Grid.Column>
            <Grid.Column width={10}>
              {(proxies.length > 0)
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
                     addProxy={this.addProxy.bind(this)}
                     attached="top"
                     globals={globals}
                     isProxying={isProxying}
                     isQuerying={this.isQuerying}
                     isValidUser={isValidUser}
                     proxies={proxies}
                     removeProxy={this.removeProxy.bind(this)}
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
               )]
               : (
                 <Segment attached="bottom" stacked>
                   <Header textAlign="center">
                     {t('proxies_none_loaded')}
                   </Header>
                 </Segment>
               )
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default translate('producers')(Proxies);
