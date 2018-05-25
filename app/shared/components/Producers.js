// @flow
import React, { Component } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import ProducersSelector from './Producers/Selector';
import ProducersTable from './Producers/Table';
import ProducersVotingAccount from './Producers/VotingAccount';
import ProducersWelcome from './Producers/Welcome';
import WalletConfig from './Wallet/Config';

type Props = {
  actions: {
    getAccount: () => void,
    getProducers: () => void
  },
  accounts: {},
  globals: {},
  producers: {},
  settings: {},
  validate: {},
  wallet: {}
};

export default class Producers extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      original: [],
      modified: false,
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
    const { accounts, settings } = nextProps;
    // On a new node connection, update
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.tick();
    }
    // If no selected are loaded, attempt to retrieve them from the props
    if (!this.state.selected_loaded) {
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          // If the voter_info entry exists, load those votes into state
          this.setState({
            original: account.voter_info.producers,
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
      validate
    } = this.props;
    if (validate.NODE) {
      if (validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS') {
        this.getAccount();
      }
      this.getProducers();
    }
  }

  getAccount = () => {
    const { getAccount } = this.props.actions;
    const { settings } = this.props;
    getAccount(settings);
  }

  addProducer = (producer) => {
    const producers = [...this.state.selected];
    if (producers.indexOf(producer) === -1) {
      producers.push(producer);
      this.setState({
        modified: (producers !== this.state.original),
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
      modified: (producers !== this.state.original),
      selected: producers
    });
  }

  submitProducerVotes = () => {
    console.log('submitting', this.state.selected);
    this.setState({
      submitting: true
    });
    // Simulate the state that will occur after submitting
    setTimeout(() => {
      this.setState({
        submitting: false,
        modified: false,
        original: this.state.selected
      });
    }, 200);
  }

  getProducers = () => {
    const { getProducers } = this.props.actions;
    const { settings } = this.props;
    // ensure the node is set
    if (settings.node) {
      getProducers(settings);
    }
  }

  render() {
    const {
      actions,
      accounts,
      globals,
      producers,
      settings,
      validate,
      wallet
    } = this.props;
    const {
      modified,
      selected,
      submitting
    } = this.state;
    const validUser = (
      validate.NODE === 'SUCCESS'
      && validate.ACCOUNT === 'SUCCESS'
      && validate.KEY === 'SUCCESS'
    );
    let sidebar = [(
      <WalletConfig
        actions={actions}
        accounts={accounts}
        key="WalletConfig"
        settings={settings}
        validate={validate}
        wallet={wallet}
      />
    )];
    if (validUser) {
      sidebar = [
        (
          <ProducersVotingAccount
            key="ProducersVotingAccount"
            onLogout={this.onLogout}
            settings={settings}
          />
        ),
        (
          <ProducersSelector
            account={accounts[settings.account]}
            key="ProducersSelector"
            modified={modified}
            selected={selected}
            removeProducer={this.removeProducer.bind(this)}
            submitProducerVotes={this.submitProducerVotes.bind(this)}
            submitting={submitting}
          />
        )
      ];
    }
    return (
      <Grid>
        <Grid.Row>
          <Transition.Group
            as={Grid.Column}
            duration={200}
            width={6}
          >
            {sidebar}
          </Transition.Group>
          <Grid.Column width={10}>
            {(producers.list.length > 0)
             ? (
               <ProducersTable
                 addProducer={this.addProducer.bind(this)}
                 globals={globals}
                 loading={loading}
                 producers={producers}
                 removeProducer={this.removeProducer.bind(this)}
                 selected={selected}
                 validUser={validUser}
               />
             )
             : (
               <ProducersWelcome />
             )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
