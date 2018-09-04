// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Popup, Progress, Responsive, Table } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import DangerLink from '../../../Global/Modal/DangerLink';
import ProducersVoteWeight from '../Vote/Weight';

class ProducersTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.producer.key, nextProps.producer.key)
    || !isEqual(this.props.isValidUser, nextProps.isValidUser)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  render() {
    const {
      addProducer,
      getProducerInfo,
      hasInfo,
      isMainnet,
      isSelected,
      producer,
      position,
      isProxying,
      isValidUser,
      removeProducer,
      settings,
      t,
      totalVoteWeight
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
    return (
      <Table.Row positive={isActive} key={producer.key}>
        <Table.Cell
          singleLine
          textAlign="center"
        >
          {(hasInfo)
            ? (
              <Button
                color="purple"
                icon="magnify"
                onClick={() => getProducerInfo(producer.owner)}
                size="small"
              />
            )
            : (
              <Popup
                content={t('producer_json_unavailable_content')}
                header={t('producer_json_unavailable_header')}
                hoverable
                inverted
                position="left center"
                trigger={
                  (isMainnet)
                  ? <Button icon="magnify" size="small" />
                  : false
                }
              />
            )
          }
          <Popup
            content={t('producer_vote_content')}
            header={t('producer_vote_header', { producer: producer.owner })}
            hoverable
            position="right center"
            trigger={(
              <Button
                color={isSelected ? 'blue' : 'grey'}
                disabled={!isValidUser || isProxying}
                icon={isSelected ? 'checkmark box' : 'minus square outline'}
                onClick={
                  (isSelected)
                  ? () => removeProducer(producer.owner)
                  : () => addProducer(producer.owner)
                }
                size="small"
              />
            )}
          />
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <b>{ position }</b>
        </Table.Cell>
        <Table.Cell
          singleLine
        >
          <Header size="small">
            <span styles={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace' }}>
              {producer.owner}
            </span>
            <Header.Subheader>
              <DangerLink
                content={producer.url.substring(0, 30).replace(/(^\w+:|^)\/\//, '')}
                link={producer.url}
                settings={settings}
              />
            </Header.Subheader>
          </Header>
        </Table.Cell>
        <Table.Cell
          singleLine
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
        <Table.Cell
          singleLine
        >
          {(position < 22)
          ? (
            <Popup
              content={t('active_producer')}
              inverted
              position="left center"
              trigger={(
                <Icon
                  color="green"
                  name="cubes"
                />
              )}
            />
            ) : false
          }
          {(producer.isBackup && position > 21)
          ? (
            <Popup
              content={t('backup_producer')}
              inverted
              position="left center"
              trigger={(
                <Icon
                  color="yellow"
                  name="cube"
                />
              )}
            />
            ) : ''
          }

        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('producers')(ProducersTableRow);
