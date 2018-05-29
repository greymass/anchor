// @flow
import React, { Component } from 'react';
import { Grid, Transition } from 'semantic-ui-react';

import ProducersSelector from './Producers/Selector';
import ProducersTable from './Producers/Table';
import ProducersVotingAccount from './Producers/VotingAccount';
import ProducersWelcome from './Producers/Welcome';
import WalletPanel from './Wallet/Panel';

type Props = {
  actions: {
    getAccount: () => void,
    getProducers: () => void,
    voteproducers: () => void
  },
  accounts: {},
  globals: {},
  keys: {},
  producers: {
    selected: []
  },
  settings: {},
  validate: {},
  wallet: {}
};

export default class Producers extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
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
    // On a new node connection, update
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.tick();
    }
    if (this.state.submitting && this.state.selected === nextProps.producers.selected) {
      this.setState({ submitting: false });
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

  submitProducerVotes = () => {
    const {
      voteproducers
    } = this.props.actions;
    voteproducers(this.state.selected);
    this.setState({ submitting: true });
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
      wallet
    } = this.props;
    const {
      selected,
      submitting
    } = this.state;
    let sidebar = [(
      <WalletPanel
        actions={actions}
        accounts={accounts}
        keys={keys}
        settings={settings}
        validate={validate}
        wallet={wallet}
      />
    )];
    const validUser = (keys.key);
    const modified = (selected.sort().toString() !== producers.selected.sort().toString());
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
