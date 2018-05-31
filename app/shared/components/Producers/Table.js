// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import { Grid, Header, Input, Table } from 'semantic-ui-react';

import ProducersVoteWeight from './Vote/Weight';
import ProducersTableRow from './Table/Row';

export default class ProducersTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      column: 'votes',
      data: _.sortBy(props.producers.list, ['votes']).reverse(),
      direction: 'descending',
      filter: false
    };
  }

  onSearchChange = (e, { value }) => {
    this.setState({ filter: value });
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {
    const {
      globals,
      producers,
      selected,
      validUser
    } = this.props;
    const {
      column,
      data,
      direction,
      filter
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
    return (
      <I18n ns="producers">
        {
          (t) => (
            <div>
              <Grid columns="equal">
                <Grid.Column>
                  <Header>
                    {activatedStake.toLocaleString()} {t('block_producer_eos_staked')} ({activatedStakePercent}%)
                    <Header.Subheader>
                      <ProducersVoteWeight
                        weight={totalVoteWeight}
                      />
                      {' '}
                      {t('block_producer_total_weight')}
                    </Header.Subheader>
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="right">
                  <Input
                    icon="search"
                    onChange={this.onSearchChange}
                    placeholder="Search..."
                  />
                </Grid.Column>
              </Grid>
              <Table
                color="violet"
                size="small"
                sortable
                style={{ borderRadius: 0 }}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell collapsing />
                    <Table.HeaderCell
                      onClick={this.handleSort('owner')}
                      sorted={column === 'owner' ? direction : null}
                    >
                      {t('block_producer')}
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      onClick={this.handleSort('votes')}
                      sorted={column === 'votes' ? direction : null}
                    >
                      {t('block_producer_total_votes')}
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      collapsing
                      onClick={this.handleSort('last_produced_block_time')}
                      sorted={column === 'last_produced_block_time' ? direction : null}
                    >
                      {t('block_producer_last_production_status')}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.filter(producer => (filter ? producer.owner.includes(filter) : true))
                    // .sort((a, b) => parseInt(b.total_votes, 10) - parseInt(a.total_votes, 10))
                    .map((producer, idx) => (
                      <ProducersTableRow
                        addProducer={this.props.addProducer}
                        key={producer.owner}
                        position={idx + 1}
                        producer={producer}
                        removeProducer={this.props.removeProducer}
                        selected={selected}
                        totalVoteWeight={totalVoteWeight}
                        validUser={validUser}
                      />
                    ))
                  }
                </Table.Body>
              </Table>
            </div>
          )
        }
      </I18n>
    );
  }
}
