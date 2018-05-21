// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Label, Progress, Table } from 'semantic-ui-react';

import ProducersLink from '../Link';
import ProducersVoteWeight from '../Vote/Weight';

export default class ProducersTableRow extends Component<Props> {
  render() {
    const {
      addProducer,
      producer,
      removeProducer,
      position,
      selected,
      totalVoteWeight
    } = this.props;

    const epoch = 946684800000;
    const lastProduced = (producer.last_produced_block_time * 500) + epoch;
    const isActive = (Date.now() - lastProduced) < 1000;
    const isSelected = (selected.indexOf(producer.owner) !== -1);
    const votePercent = (totalVoteWeight)
      ? ((parseInt(producer.total_votes, 10) / parseInt(totalVoteWeight, 10)) * 100).toFixed(0)
      : 0;
    const voteFormatted = (producer.total_votes > 0)
      ? (
        <ProducersVoteWeight
          weight={producer.total_votes}
        />
      )
      : 'None';

    return (
      <I18n ns="producers">
        {
          (t) => (
            <Table.Row key={producer.owner} positive={isActive}>
              <Table.Cell textAlign="center">
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  icon={isSelected ? 'checkmark box' : 'minus square outline'}
                  onClick={
                    (isSelected)
                    ? () => removeProducer(producer.owner)
                    : () => addProducer(producer.owner)
                  }
                />
              </Table.Cell>
              <Table.Cell textAlign="center">{position}</Table.Cell>
              <Table.Cell>
                <Header size="small">
                  {producer.owner}
                  <Header.Subheader>
                    <ProducersLink producer={producer} />
                  </Header.Subheader>
                </Header>
              </Table.Cell>
              <Table.Cell width={4}>
                <Progress
                  color="teal"
                  label={(
                    <div className="label">
                      {votePercent}% - {voteFormatted}
                    </div>
                  )}
                  percent={parseFloat(votePercent * 100) / 100}
                  size="tiny"
                  style={{ minWidth: 0 }}
                />
              </Table.Cell>
              <Table.Cell>
                {(lastProduced <= epoch)
                  ? (
                    <Label
                      basic
                      color="grey"
                      content={t('producer_produced_never')}
                      size="small"
                    />
                  )
                  : (
                    <Label
                      basic
                      color="green"
                      content={t('producer_produced_recently')}
                      size="small"
                    />
                  )
                }
              </Table.Cell>
            </Table.Row>
          )
        }
      </I18n>
    );
  }
}
