// @flow
import React, { Component } from 'react';
import { Button, Placeholder, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { times } from 'lodash';

class BlockProducersTablePlaceholder extends Component<Props> {
  render() {
    const {
      t
    } = this.props;
    return (
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
            <Table.Row key={i}>
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
    );
  }
}

export default translate('producers')(BlockProducersTablePlaceholder);
