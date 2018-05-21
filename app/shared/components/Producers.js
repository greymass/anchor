// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Grid, Segment } from 'semantic-ui-react';

import ProducersSelector from './Producers/Selector';
import ProducersTable from './Producers/Table';

type Props = {
  actions: {
    getAccount: () => void,
    getProducers: () => void
  },
  accounts: {},
  globals: {},
  producers: {},
  settings: {}
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
    this.interval = setInterval(this.tick.bind(this), 5000);
  }

  componentWillReceiveProps(nextProps) {
    const { accounts, settings } = nextProps;
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
          console.log('unable to vote, stake first');
        }
      }
    }
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
    getProducers(settings);
  }

  render() {
    const {
      accounts,
      globals,
      producers,
      settings,
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <div>
              <Grid ref={this.handleContextRef}>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Segment secondary color="purple">
                      <Header>
                        {t('producer_voter_voting_as')}
                        {settings.account}
                        <Header.Subheader>
                          {t('producer_voted_connected_to')}
                          {settings.node}
                        </Header.Subheader>
                      </Header>
                    </Segment>
                    <ProducersSelector
                      account={accounts[settings.account]}
                      modified={this.state.modified}
                      selected={this.state.selected}
                      removeProducer={this.removeProducer.bind(this)}
                      submitProducerVotes={this.submitProducerVotes.bind(this)}
                      submitting={this.state.submitting}
                    />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    {(producers.list.length > 0)
                     ? (
                       <ProducersTable
                         addProducer={this.addProducer.bind(this)}
                         globals={globals}
                         producers={producers}
                         removeProducer={this.removeProducer.bind(this)}
                         selected={this.state.selected}
                       />
                     )
                     : 'Loading'
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          )
        }
      </I18n>
    );
  }
}
