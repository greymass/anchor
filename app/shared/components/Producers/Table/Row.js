// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Label, Popup, Progress, Table } from 'semantic-ui-react';

import TimeAgo from 'react-timeago';

import ProducersLink from '../Link';
import ProducersVoteWeight from '../Vote/Weight';

const statusCodes = {
  enabled: {
    status: 'enabled',
    color: 'green',
    message: 'producer_production_enabled'
  },
  disabled: {
    status: 'disabled',
    color: 'yellow',
    message: 'producer_production_disabled'
  },
  never: {
    status: 'never',
    color: 'grey',
    message: 'producer_production_never'
  }
};

export default class ProducersTableRow extends Component<Props> {
  getProductionStatus = (lastProduced) => {
    const timeAgo = Date.now() - lastProduced;
    // Account for two rounds worth of time with a 5 second drift (131 seconds)
    if (timeAgo < ((1000 * 21 * 6 * 0.5 * 2) + 5000)) {
      return 'enabled';
    // If the last produced is less than or equal to the epoch, it's never produced
    } else if (lastProduced <= 946684800000) {
      return 'never';
    }
    // Beyond 131 seconds - they aren't producing
    return 'disabled';
  }

  render() {
    const {
      addProducer,
      producer,
      removeProducer,
      selected,
      totalVoteWeight,
      validUser
    } = this.props;
    const epoch = 946684800000;
    const lastProduced = (producer.last_produced_block_time * 500) + epoch;
    const isActive = (Date.now() - lastProduced) < 1000;
    const isSelected = (selected.indexOf(producer.owner) !== -1);
    const votePercent = (totalVoteWeight)
      ? ((parseInt(producer.votes, 10) / parseInt(totalVoteWeight, 10)) * 100).toFixed(2)
      : 0;
    // console.log(votePercent, producer.votes, totalVoteWeight);
    const voteFormatted = (producer.votes > 0)
      ? (
        <ProducersVoteWeight
          weight={producer.votes}
        />
      )
      : 'None';
    const producerStatusCode = this.getProductionStatus(lastProduced);
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Table.Row positive={isActive}>
              <Table.Cell textAlign="center">
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  disabled={!validUser}
                  icon={isSelected ? 'checkmark box' : 'minus square outline'}
                  onClick={
                    (isSelected)
                    ? () => removeProducer(producer.owner)
                    : () => addProducer(producer.owner)
                  }
                />
              </Table.Cell>
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
                <Popup
                  content={
                    (statusCodes[producerStatusCode].status === 'never')
                    ? 'Never'
                    : (
                      <span>
                        Last Block:
                        {' '}
                        <TimeAgo date={lastProduced} />
                      </span>
                    )
                  }
                  inverted
                  position="top center"
                  trigger={(
                    <Label
                      basic
                      color={statusCodes[producerStatusCode].color}
                      content={t(statusCodes[producerStatusCode].message)}
                      size="small"
                    />
                  )}
                />

              </Table.Cell>
            </Table.Row>
          )
        }
      </I18n>
    );
  }
}
