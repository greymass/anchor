// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { debounce } from 'lodash';
import { Grid, Header, Input, Segment, Table } from 'semantic-ui-react';

import ProducersVoteWeight from './Vote/Weight';
import ProducersTableRow from './Table/Row';

export default class ProducersTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      filter: false
    };
  }

  onSearchChange = debounce((e, { value }) => {
    const filter = String(value).toLowerCase();
    this.setState({ filter });
  }, 300);

  filterIsEmpty() {
    const {
      filter
    } = this.state;

    return (!filter || filter.length === 0 );
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
    const loading = (producers.list.length < 1 || totalVoteWeight < 1);
    let body = false;
    if (!loading) {
      body = (
        <Table.Body>
          {producers.list
            .map((producer, idx) => {
              const isSelected = (selected.indexOf(producer.owner) !== -1);
              if (this.filterIsEmpty() || producer.owner.includes(filter)) {
                return (
                  <ProducersTableRow
                    addProducer={this.props.addProducer}
                    filter={filter}
                    isSelected={isSelected}
                    position={idx + 1}
                    producer={producer}
                    removeProducer={this.props.removeProducer}
                    totalVoteWeight={totalVoteWeight}
                    validUser={validUser}
                  />
                );
              }
            })
          }
        </Table.Body>
      );
    }
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment basic loading={loading} vertical>
              <Grid>
                <Grid.Column width="10">
                  <Header size="small">
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
                <Grid.Column width="6" textAlign="right">
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

                    <Table.HeaderCell
                      sorted={column === 'owner' ? direction : null}
                    >
                      {t('block_producer')}
                    </Table.HeaderCell>

                    <Table.HeaderCell collapsing />

                    <Table.HeaderCell
                      sorted={column === 'votes' ? direction : null}
                    >
                      {t('block_producer_total_votes')}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                {body}
              </Table>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
