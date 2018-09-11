// @flow
import React, { Component } from 'react';
import { Divider, Header, Grid, Loader, Segment, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import SidebarAccount from '../containers/Sidebar/Account';
import WalletPanel from './Wallet/Panel';

import ProducersSelector from './Producers/Selector';
import ProducersTable from './Producers/Table';
import ProducersVotingPreview from './Producers/Modal/Preview';
import ProducersProxy from './Producers/Proxy';

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
  validate: {},
  wallet: {}
};

class Producers extends Component<Props> {
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

  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const { settings, system } = nextProps;
    const nextValidate = nextProps.validate;
    // On a new node connection, update props + producers
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.props.actions.getGlobals();
      this.tick();
    }
    // Update state when the transaction has gone through
    if (
      this.state.submitting
      && (
        this.state.lastTransaction !== system.VOTEPRODUCER_LAST_TRANSACTION
        || this.state.lastError !== system.VOTEPRODUCER_LAST_ERROR
      )
    ) {
      this.setState({
        lastError: system.VOTEPRODUCER_LAST_ERROR,
        lastTransaction: system.VOTEPRODUCER_LAST_TRANSACTION,
        submitting: false
      });
    }
    // If no selected are loaded, attempt to retrieve them from the props
    if (
      !this.state.selected_loaded
      || this.state.selected_account !== settings.account
      || (nextProps.producers.proxy && nextProps.producers.proxy !== this.state.selected_account)
    ) {
      const { accounts } = nextProps;
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          const selected_account = account.voter_info.proxy || account.account_name;
          let selected = account.voter_info.producers
          if (selected_account !== settings.account && accounts[selected_account]) {
            selected = accounts[selected_account].voter_info.producers;
          }
          // If the voter_info entry exists, load those votes into state
          this.setState({
            selected,
            selected_account,
            selected_loaded: true
          });
        } else {
          // otherwise notify users that they must stake before allowed voting
        }
      }
    }
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
      getProducers,
      getProducersInfo
    } = actions;
    if (validate.NODE) {
      getProducers();
      getProducersInfo();
    }
  }

  addProducer = (producer) => {
    const producers = [...this.state.selected];
    if (producers.indexOf(producer) === -1) {
      producers.push(producer);
      producers.sort();
      this.setState({
        selected: producers
      });
    }
  }

  removeProducer = (producer) => {
    const producers = [...this.state.selected];
    const index = producers.indexOf(producer);
    if (index !== -1) {
      producers.splice(index, 1);
    }
    this.setState({
      selected: producers
    });
  }

  previewProducerVotes = (previewing) => this.setState({
    previewing,
    lastError: false, // Reset the last error
    lastTransaction: {} // Reset the last transaction
  });

  submitProducerVotes = () => {
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
        connection={connection}
      />
    )];
    const account = accounts[settings.account];
    const isMainnet = (connection && connection.chain && connection.chain.toLowerCase().indexOf('mainnet') !== -1);
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || settings.walletMode === 'watch');
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
    if (isValidUser && settings.walletMode !== 'wait') {
      sidebar = (
        <React.Fragment>
          <ProducersProxy
            account={account}
            actions={actions}
            blockExplorers={blockExplorers}
            keys={keys}
            isProxying={isProxying}
            isValidUser={isValidUser}
            settings={settings}
            system={system}
          />

          <Divider hidden />

          {(!isProxying) ? (
            <ProducersVotingPreview
              actions={actions}
              blockExplorers={blockExplorers}
              lastError={lastError}
              lastTransaction={lastTransaction}
              open={previewing}
              onClose={() => this.previewProducerVotes(false)}
              onConfirm={this.submitProducerVotes.bind(this)}
              onOpen={() => this.previewProducerVotes(true)}
              selected={selected}
              settings={settings}
              submitting={submitting}
              system={system}
            />
          ) : ''}

          <ProducersSelector
            account={accounts[settings.account]}
            isProxying={isProxying}
            modified={modified}
            removeProducer={this.removeProducer.bind(this)}
            selected={selected}
            submitProducerVotes={() => this.previewProducerVotes(true)}
            submitting={submitting}
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
                   <ProducersTable
                     account={accounts[settings.account]}
                     actions={actions}
                     addProducer={this.addProducer.bind(this)}
                     amount={amount}
                     attached="top"
                     globals={globals}
                     isMainnet={isMainnet}
                     isProxying={isProxying}
                     isQuerying={this.isQuerying}
                     keys={keys}
                     producers={producers}
                     removeProducer={this.removeProducer.bind(this)}
                     resetDisplayAmount={this.resetDisplayAmount}
                     selected={selected}
                     settings={settings}
                     system={system}
                     isValidUser={isValidUser}
                   />
                 </Visibility>
               ), (
                 (!querying && amount < producers.list.length)
                 ? (
                   <Segment key="ProducersTableLoading" clearing padded vertical>
                     <Loader active />
                   </Segment>
                 ) : false
               )]
               : (
                 <Segment attached="bottom" stacked>
                   <Header textAlign="center">
                     {t('producer_none_loaded')}
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

export default translate('producers')(Producers);
