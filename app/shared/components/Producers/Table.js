// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { debounce, filter, findIndex } from 'lodash';
import { Grid, Header, Input, Segment, Transition, Table } from 'semantic-ui-react';
import { get } from 'dot-prop-immutable';

import ProducersModalInfo from './Modal/Info.js';
import ProducersTableRow from './Table/Row';
import ProducersVoteWeight from './Vote/Weight';

class ProducersTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: false,
      viewing: false
    };
  }

  onSearchChange = debounce((e, { value }) => {
    const { isQuerying } = this.props;
    const query = String(value).toLowerCase();
    this.setState({ query }, () => {
      isQuerying((query && query.length > 0));
    });
    this.props.resetDisplayAmount();
  }, 400);

  querying() {
    const {
      query
    } = this.state;
    return (query && query.length > 0);
  }

  clearProducerInfo = () => this.setState({ viewing: false });
  getProducerInfo = (producer) => this.setState({ viewing: producer });

  render() {
    const {
      amount,
      globals,
      isMainnet,
      isProxying,
      isValidUser,
      producers,
      selected,
      settings,
      system,
      t
    } = this.props;
    const {
      query,
      viewing
    } = this.state;
    const {
      current
    } = globals;
    const activatedStake = (current.total_activated_stake)
      ? parseInt(current.total_activated_stake / 10000, 10)
      : 0;
    const activatedStakePercent = parseFloat((activatedStake / 1000000000) * 100, 10).toFixed(2);
    const totalVoteWeight = (current.total_producer_vote_weight)
      ? current.total_producer_vote_weight
      : 0;
    const loading = (producers.list.length < 1 || totalVoteWeight < 1);
    const querying = this.querying();
    let baseTable = <Table.Body />;
    let searchTable = (
      <Table.Body>
        <Table.Row>
          <Table.Cell colSpan={5}>
            {t('producer_none_match')}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    );
    if (!loading) {
      const fullResults = producers.list.slice(0, amount);
      baseTable = (
        <Table.Body key="FullResults">
          {fullResults.map((producer, idx) => {
            const isSelected = (selected.indexOf(producer.owner) !== -1);
            const hasInfo = !!(get(producers.producersInfo, producer.owner));
            return (
              <ProducersTableRow
                addProducer={this.props.addProducer}
                getProducerInfo={this.getProducerInfo}
                hasInfo={hasInfo}
                key={`${isProxying}-${producer.key}-${hasInfo}`}
                isMainnet={isMainnet}
                isProxying={isProxying}
                isSelected={isSelected}
                isValidUser={isValidUser}
                position={idx + 1}
                producer={producer}
                removeProducer={this.props.removeProducer}
                system={system}
                settings={settings}
                totalVoteWeight={totalVoteWeight}
              />
            );
          })}
        </Table.Body>
      );

      if (querying) {
        const partResults = filter(producers.list, (producer) =>
          producer.owner.indexOf(query) > -1).slice(0, amount);
        if (partResults.length > 0) {
          searchTable = (
            <Table.Body key="PartResults">
              {partResults.map((producer) => {
                const isSelected = (selected.indexOf(producer.owner) !== -1);
                const hasInfo = !!(get(producers.producersInfo, producer.owner));
                return (
                  <ProducersTableRow
                    addProducer={this.props.addProducer}
                    getProducerInfo={this.getProducerInfo}
                    hasInfo={hasInfo}
                    key={producer.key}
                    isMainnet={isMainnet}
                    isProxying={isProxying}
                    isSelected={isSelected}
                    isValidUser={isValidUser}
                    position={findIndex(producers.list, { owner: producer.owner }) + 1}
                    producer={producer}
                    removeProducer={this.props.removeProducer}
                    settings={settings}
                    totalVoteWeight={totalVoteWeight}
                  />
                );
              })}
            </Table.Body>
          );
        }
      }
    }
    return (
      <Segment basic loading={loading} vertical>
        <ProducersModalInfo
          producerInfo={producers.producersInfo[viewing]}
          onClose={this.clearProducerInfo}
          settings={settings}
          viewing={viewing}
        />
        <Grid>
          <Grid.Column width={8}>
            <Header size="small">
              {activatedStake.toLocaleString()} {t('block_producer_eos_staked', {tokenSymbol:settings.blockchain.prefix})} ({activatedStakePercent}%)
              <Header.Subheader>
                <ProducersVoteWeight
                  weight={totalVoteWeight}
                />
                {' '}
                {t('block_producer_total_weight')}
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={8} key="ProducersVotingPreview" textAlign="right">
            <Input
              icon="search"
              onChange={this.onSearchChange}
              placeholder={t('search')}
            />
          </Grid.Column>
        </Grid>
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
              <Table.HeaderCell width={5}>
                {t('block_producer_total_votes')}
              </Table.HeaderCell>
              <Table.HeaderCell collapsing />
            </Table.Row>
          </Table.Header>
          <Transition visible={querying} animation="slide down" duration={200}>
            {searchTable}
          </Transition>
          <Transition visible={!querying} animation="slide down" duration={200}>
            {baseTable}
          </Transition>
        </Table>
      </Segment>
    );
  }
}

export default translate('producers')(ProducersTable);
