// @flow
import React, { Component } from 'react';
import { Button, Dimmer, Grid, Header, Loader, Placeholder, Segment, Table, Visibility } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import { times } from 'lodash';

import ProducersTable from './BlockProducers/Table';

class BlockProducers extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      amount: 10,
      display: false,
      querying: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ display: true }), 250);
    setTimeout(() => this.tick(), 500);
    this.interval = setInterval(this.tick.bind(this), 120000);
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

  resetDisplayAmount = () => this.setState({ amount: 10 });
  isQuerying = (querying) => this.setState({ querying });

  tick() {
    const {
      actions,
      connection,
      validate
    } = this.props;
    const {
      getProducers,
      getProducersInfo
    } = actions;
    if (validate.NODE) {
      getProducers();

      const contracts = get(connection, 'supportedContracts', []);

      if (contracts && contracts.includes('producerinfo')) {
        getProducersInfo();
      }
    }
  }

  render() {
    const {
      actions,
      accounts,
      addProducer,
      connection,
      globals,
      keys,
      producers,
      removeProducer,
      selected,
      settings,
      sidebar,
      system,
      t
    } = this.props;
    const {
      amount,
      display,
      querying
    } = this.state;

    const account = accounts[settings.account];
    const isMainnet = connection.chainKey && connection.chainKey.toLowerCase().indexOf('mainnet') !== -1;
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    const isValidUser = !!((keys && keys.key && settings.walletMode !== 'wait') || ['watch','ledger'].includes(settings.walletMode));
    const isLoaded = !!(display && producers.list.length > 0);

    return (
      <Grid divided>
        <Dimmer active={!isLoaded} inverted>
          <Loader size="large" inverted>
            <Header>
              Loading Producers...
            </Header>
          </Loader>
        </Dimmer>
        <Grid.Row>
          <Grid.Column width={6}>
            {(isLoaded)
              ? sidebar
              : (
                <Segment raised>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length='medium' />
                      <Placeholder.Line length='short' />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </Segment>
              )
            }
          </Grid.Column>
          <Grid.Column width={10}>
            {(isLoaded)
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
                    addProducer={addProducer}
                    amount={amount}
                    attached="top"
                    connection={connection}
                    globals={globals}
                    isMainnet={isMainnet}
                    isProxying={isProxying}
                    isQuerying={this.isQuerying}
                    keys={keys}
                    producers={producers}
                    removeProducer={removeProducer}
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
                <Table
                  color="violet"
                  size="small"
                  striped
                  style={{ borderRadius: 0 }}
                  unstackable
                >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell collapsing />
                      <Table.HeaderCell collapsing />
                      <Table.HeaderCell>
                        {t('block_producer')}
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center" width={5}>
                        {t('block_producer_total_votes')}
                      </Table.HeaderCell>
                      <Table.HeaderCell collapsing />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {times(10, i => (
                      <Table.Row>
                        <Table.Cell singleLine>
                          <Button
                            color="grey"
                            disabled
                            icon="magnify"
                            size="small"
                          />
                          <Button
                            color="grey"
                            disabled
                            icon="minus square outline"
                            size="small"
                          />
                        </Table.Cell>
                        <Table.Cell
                          singleLine
                        >
                          <Placeholder>
                            <Placeholder.Line />
                          </Placeholder>
                        </Table.Cell>
                        <Table.Cell
                          singleLine
                        >
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        </Table.Cell>
                        <Table.Cell
                          singleLine
                          textAlign="center"
                        >
                          <Placeholder>
                            <Placeholder.Header>
                              <Placeholder.Line />
                              <Placeholder.Line />
                            </Placeholder.Header>
                          </Placeholder>
                        </Table.Cell>
                        <Table.Cell
                          singleLine
                        >
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default translate('producers')(BlockProducers);
