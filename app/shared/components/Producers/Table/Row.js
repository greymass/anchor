// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Icon, Label, Popup, Progress, Responsive, Table } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import TimeAgo from 'react-timeago';

import DangerLink from '../../Global/Modal/DangerLink';
import ProducersVoteWeight from '../Vote/Weight';

const statusCodes = {
  enabled: {
    status: 'enabled',
    color: 'green',
    icon: 'cube',
    message: 'producer_production_enabled'
  },
  disabled: {
    status: 'disabled',
    color: 'orange',
    icon: 'clock',
    message: 'producer_production_disabled'
  },
  never: {
    status: 'never',
    color: 'grey',
    icon: 'x',
    message: 'producer_production_never'
  }
};

export default class ProducersTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.producer.key, nextProps.producer.key)
    || !isEqual(this.props.validUser, nextProps.validUser)
    || !isEqual(this.props.filter, nextProps.filter)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  getProductionStatus = (lastProduced) => {
    const timeAgo = Date.now() - lastProduced;
    // Account for two rounds worth of blocks with a 30 second drift (156 seconds)
    // seconds in round = 63 (21 producer * 6 block * 0.5 block time)
    if (timeAgo < ((21 * 6 * 0.5 * 2 * 1000) + 30000)) {
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
      isSelected,
      producer,
      removeProducer,
      totalVoteWeight,
      validUser
    } = this.props;
    const epoch = 946684800000;
    const lastProduced = (producer.last_produced_block_time * 500) + epoch;
    const isActive = (Date.now() - lastProduced) < 1000;
    const votePercent = (totalVoteWeight)
      ? ((parseInt(producer.votes, 10) / parseInt(totalVoteWeight, 10)) * 100).toFixed(2)
      : 0;
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
              <Table.Cell
                singleLine
                textAlign="center"
              >
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  disabled={!validUser}
                  icon={isSelected ? 'checkmark box' : 'minus square outline'}
                  onClick={
                    (isSelected)
                    ? () => removeProducer(producer.owner)
                    : () => addProducer(producer.owner)
                  }
                  size="small"
                />
              </Table.Cell>
              <Table.Cell
                singleLine
              >
                <Header size="tiny">
                  <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
                    {producer.owner}
                  </span>
                  <Header.Subheader>
                    <DangerLink
                      content={producer.url.substring(0,30).replace(/(^\w+:|^)\/\//, '')}
                      link={producer.url}
                    />
                  </Header.Subheader>
                </Header>
              </Table.Cell>
              <Table.Cell
                singleLine
                width={5}
              >
                <Progress
                  color="teal"
                  label={(
                    <div className="label">
                      {votePercent}%
                      <Responsive as="span" minWidth={800}>
                        - {voteFormatted}
                      </Responsive>
                    </div>
                  )}
                  percent={parseFloat(votePercent * 100) / 100}
                  size="tiny"
                  style={{ minWidth: 0 }}
                />
              </Table.Cell>
            </Table.Row>
          )
        }
      </I18n>
    );
  }
}
