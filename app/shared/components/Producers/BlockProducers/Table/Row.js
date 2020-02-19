// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Popup, Progress, Responsive, Table } from 'semantic-ui-react';
import { isEqual } from 'lodash';

import DangerLink from '../../../Global/Modal/DangerLink';
import ProducersVoteWeight from '../Vote/Weight';

const nf = new Intl.NumberFormat();

class ProducersTableRow extends Component<Props> {
  shouldComponentUpdate = (nextProps) =>
    !isEqual(this.props.producer.key, nextProps.producer.key)
    || !isEqual(this.props.isValidUser, nextProps.isValidUser)
    || !isEqual(this.props.isSelected, nextProps.isSelected);

  render() {
    const {
      addProducer,
      connection,
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
    const votePercent = (producer.percent)
      ? (producer.percent * 100).toFixed(2)
      : 0;

    const voteFormatted = (producer.votes > 0)
      ? (
        <ProducersVoteWeight
          weight={producer.votes}
        />
      )
      : 'None';
    const shouldDisplayInfoButton = connection.supportedContracts && connection.supportedContracts.includes('producerinfo');
    const producersVotedIn = connection.chainId !== '73647cde120091e0a4b85bced2f3cfdb3041e266cbbe95cee59b73235a1b3b6f';

    return (
      <Table.Row positive={isActive} key={producer.key}>
        <Table.Cell
          singleLine
          textAlign="center"
        >
          {(producersVotedIn) && (
            <Popup
              content={t('producer_vote_description', { chainSymbol: connection.chainSymbol })}
              header={t('producer_vote_header', { producer: producer.owner })}
              hoverable
              position="right center"
              trigger={(
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  disabled={!isValidUser}
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
          )}
        </Table.Cell>
        <Table.Cell
          singleLine
          textAlign="center"
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
          textAlign="center"
        >
          {(producersVotedIn) && (
            <Header size="tiny">
              {nf.format(producer.tokenVotes)} {connection.chainSymbol || 'EOS'}
              <Header.Subheader>
                {votePercent}% - {voteFormatted}
              </Header.Subheader>
            </Header>
          )}
        </Table.Cell>
        <Table.Cell collapsing textAlign="center">
          {(shouldDisplayInfoButton) && (
            <span>
              {(hasInfo)
                ? (
                  <Button
                    basic
                    color="purple"
                    icon="magnify"
                    onClick={() => getProducerInfo(producer.owner)}
                    size="small"
                  />
                ) : (
                  <Popup
                    content={t('producer_json_unavailable_content')}
                    header={t('producer_json_unavailable_header')}
                    hoverable
                    inverted
                    position="left center"
                    trigger={
                      (isMainnet)
                      ? <Button basic icon="magnify" size="small" />
                      : false
                    }
                  />
                )
              }
            </span>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default translate('producers')(ProducersTableRow);
