// @flow
import React, { Component } from 'react';
import { Divider, Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import SidebarAccount from '../../containers/Sidebar/Account';
import WalletPanel from '../Wallet/Panel';
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
      lastError: false,
      lastTransaction: {},
      previewing: false,
      querying: false,
      selected: [],
      selected_account: false,
      selected_loaded: false,
      submitting: false,
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

  submitProxy = () => {
    const {
      clearSystemState,
      voteproducers
    } = this.props.actions;
    const {
      selected
    } = this.state;
    clearSystemState();
    voteproducers(selected);
    this.setState({
      lastError: false, // Reset the last error
      lastTransaction: {}, // Reset the last transaction
      submitting: true
    });
  }

  render() {
    const {
      actions,
      accounts,
      balances,
      blockExplorers,
      connection,
      globals,
      history,
      keys,
      producers,
      settings,
      system,
      t,
      tables,
      transaction,
      validate,
      wallet
    } = this.props;
    const {
      amount,
      lastError,
      lastTransaction,
      previewing,
      querying,
      selected,
      submitting
    } = this.state;
    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        balances={balances}
        blockExplorers={blockExplorers}
        globals={globals}
        key="WalletPanel"
        keys={keys}
        settings={settings}
        system={system}
        transaction={transaction}
        validate={validate}
        wallet={wallet}
      />
    )];
    const account = accounts[settings.account];
    const isMainnet = (connection && connection.chain === 'eos-mainnet');
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
    if (isValidUser && settings.walletMode !== 'wait') {
      sidebar = (
        <React.Fragment>
          <ProducersProxy
            account={account}
            accounts={accounts}
            actions={actions}
            blockExplorers={blockExplorers}
            keys={keys}
            isProxying={isProxying}
            isValidUser={isValidUser}
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
              {(producers.list.length > 0)
               ? [(
                 <Visibility
                   continuous
                   key="ProducersTable"
                   fireOnMount
                   onBottomVisible={this.loadMore}
                   once={false}
                 >
                   <ProxiesTable
                     account={accounts[settings.account]}
                     actions={actions}
                     setAsProxy={this.addProxy.bind(this)}
                     attached="top"
                     globals={globals}
                     isProxying={isProxying}
                     isQuerying={this.isQuerying}
                     keys={keys}
                     producers={producers}
                     removeProxy={this.removeProxy.bind(this)}
                     settings={settings}
                     system={system}
                     isValidUser={isValidUser}
                   />
                 </Visibility>
               ), (
                 (!querying && amount < producers.list.length)
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
