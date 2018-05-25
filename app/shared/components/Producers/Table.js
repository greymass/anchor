// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import { Grid, Header, Input, Table } from 'semantic-ui-react';

import ProducersVoteWeight from './Vote/Weight';
import ProducersTableRow from './Table/Row';

export default class ProducersTable extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      filter: false
    };
  }

  onSearchChange = (e, { value }) => {
    this.setState({ filter: value });
  }

  render() {
    const {
      globals,
      producers,
      selected
    } = this.props;
    const {
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
                    {activatedStake.toLocaleString()} EOS staked ({activatedStakePercent}%)
                    <Header.Subheader>
                      <ProducersVoteWeight
                        weight={totalVoteWeight}
                      />
                      {' '}
                      total vote weight
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
              <Table color="violet" size="small" style={{ borderRadius: 0 }}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell collapsing />
                    <Table.HeaderCell textAlign="center" collapsing>
                      {t('block_producer_position')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('block_producer')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('block_producer_total_votes')}
                    </Table.HeaderCell>
                    <Table.HeaderCell collapsing>
                      {t('block_producer_last_produced')}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {producers
                    .list.filter(producer => (filter ? producer.owner.includes(filter) : true))
                    .sort((a, b) => parseInt(b.total_votes, 10) - parseInt(a.total_votes, 10))
                    .map((producer, idx) => (
                      <ProducersTableRow
                        addProducer={this.props.addProducer}
                        position={idx + 1}
                        producer={producer}
                        removeProducer={this.props.removeProducer}
                        selected={selected}
                        totalVoteWeight={totalVoteWeight}
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
