// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, List, Table } from 'semantic-ui-react';

import ProducersSelectorItem from './Selector/Item';
import ProducersSelectorItemEmpty from './Selector/Item/Empty';

export default class ProducersSelector extends Component<Props> {
  render() {
    const {
      account,
      modified,
      selected,
      submitting
    } = this.props;
    const { voter_info } = account;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <div>
              <Table definition>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      {t('producer_voter_total_staked')}
                    </Table.Cell>
                    <Table.Cell>
                      {(voter_info.staked / 10000).toFixed(4)} EOS
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Button
                color={modified ? 'green' : 'grey'}
                content={modified ? t('producer_voter_save_changes') : t('producer_voter_no_changes')}
                disabled={!modified}
                fluid
                loading={submitting}
                onClick={() => this.props.submitProducerVotes()}
              />
              <List divided relaxed>
                <List.Item>
                  <Header size="small" textAlign="center">
                    <Header.Subheader>
                      {selected.length}/30 {t('producer_voter_votes_used')}
                    </Header.Subheader>
                  </Header>
                </List.Item>
                {(selected.length)
                  ? selected.map((producer) => (
                    <ProducersSelectorItem
                      producer={producer}
                      removeProducer={this.props.removeProducer}
                    />
                  ))
                  : (
                    <ProducersSelectorItemEmpty
                      modified={modified}
                    />
                  )
                }
              </List>
            </div>
          )
        }
      </I18n>
    );
  }
}
