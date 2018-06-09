// @flow
import React, { Component } from 'react';
import { Header, Grid, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import SidebarConnection from './Sidebar/Connection';

import ProducersSelector from './Producers/Selector';
import ProducersTable from './Producers/Table';
import ProducersVotingPreview from './Producers/Modal/Preview';
import WalletPanel from './Wallet/Panel';

type Props = {
  actions: {
    getAccount: () => void,
    getGlobals: () => void,
    getProducers: () => void,
    voteproducers: () => void
  },
  accounts: {},
  globals: {},
  keys: {},
  producers: {
    lastTransaction: {},
    selected: []
  },
  settings: {},
  validate: {},
  wallet: {},
  balances: {},
  system: {}
};

export default class Producers extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      lastError: false,
      lastTransaction: {},
      previewing: false,
      selected: [],
      selected_loaded: false,
      submitting: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 15000);
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
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
        this.state.lastTransaction !== nextProps.producers.lastTransaction
        || this.state.lastError !== nextProps.producers.lastError
      )
    ) {
      this.setState({
        lastError: nextProps.producers.lastError,
        lastTransaction: nextProps.producers.lastTransaction,
        submitting: false
      });
    }
    // If no selected are loaded, attempt to retrieve them from the props
    if (!this.state.selected_loaded) {
      const { accounts, settings } = nextProps;
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          // If the voter_info entry exists, load those votes into state
          this.setState({
            selected: account.voter_info.producers,
            selected_loaded: true
          });
        } else {
          // otherwise notify users that they must stake before allowed voting
          // console.log('unable to vote, stake first');
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      validate
    } = this.props;
    const {
      getProducers
    } = actions;
    if (validate.NODE) {
      getProducers();
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
      voteproducers
    } = this.props.actions;
    const {
      selected
    } = this.state;
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
      globals,
      keys,
      producers,
      settings,
      validate,
      wallet,
      balances,
      system
    } = this.props;
    const {
      lastError,
      lastTransaction,
      previewing,
      selected,
      submitting
    } = this.state;
    let sidebar = [(
      <WalletPanel
        key="WalletPanel"
        actions={actions}
        accounts={accounts}
        keys={keys}
        settings={settings}
        validate={validate}
        wallet={wallet}
        balances={balances}
        system={system}
      />
    )];
    const validUser = !!keys.key;
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
    if (validUser) {
      sidebar = [
        (
          <ProducersSelector
            account={accounts[settings.account]}
            key="ProducersSelector"
            modified={modified}
            selected={selected}
            removeProducer={this.removeProducer.bind(this)}
            submitProducerVotes={() => this.previewProducerVotes(true)}
            submitting={submitting}
          />
        ),
        (
          <ProducersVotingPreview
            key="ProducersVotingPreview"
            lastError={lastError}
            lastTransaction={lastTransaction}
            open={previewing}
            onClose={() => this.previewProducerVotes(false)}
            onConfirm={this.submitProducerVotes.bind(this)}
            onOpen={() => this.previewProducerVotes(true)}
            selected={selected}
            submitting={submitting}
          />
        )
      ];
    }
    return (
      <Grid divided>
        <Grid.Row>
          <Grid.Column width={6}>
            <SidebarConnection />
            {sidebar}
          </Grid.Column>
          <Grid.Column width={10}>
            {(producers.list.length > 0)
             ? (
               <ProducersTable
                 addProducer={this.addProducer.bind(this)}
                 globals={globals}
                 producers={producers}
                 removeProducer={this.removeProducer.bind(this)}
                 selected={selected}
                 validUser={validUser}
               />
             )
             : (
               <I18n ns="producers">
                 {
                   (t) => (
                     <Segment stacked>
                       <Header textAlign="center">
                         {t('producer_none_loaded')}
                       </Header>
                     </Segment>
                   )
                 }
               </I18n>
             )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
