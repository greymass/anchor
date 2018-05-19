// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import TimeAgo from 'react-timeago';
import { Header, Table } from 'semantic-ui-react';

import ProducerLink from './Link';

const notation = [
  { value: 1, symbol: '' },
  { value: 1E3, symbol: ' kv' },
  { value: 1E6, symbol: ' Mv' },
  { value: 1E9, symbol: ' Gv' },
  { value: 1E12, symbol: ' Tv' },
  { value: 1E15, symbol: ' Pv' },
  { value: 1E18, symbol: ' Ev' },
  { value: 1E21, symbol: ' Zv' },
  { value: 1E24, symbol: ' Yv' }
];

export default class ProducersTable extends Component<Props> {

  nFormatter = (num, digits) => {
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = notation.length - 1; i > 0; i--) {
      if (num >= notation[i].value) {
        break;
      }
    }
    return (num / notation[i].value).toFixed(digits).replace(rx, '$1') + notation[i].symbol;
  }

  render() {
    const {
      producers
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Table size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='center' collapsing>
                    {t('block_producer_position')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {t('block_producer')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {t('block_producer_total_votes')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {t('block_producer_last_produced')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {t('block_producer_last_active')}
                  </Table.HeaderCell>
                  <Table.HeaderCell collapsing>

                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {producers.list.sort((a, b) => parseInt(a.total_votes) < parseInt(b.total_votes)).map((producer, idx) => {
                  const epoch = 946684800000;
                  const lastProduced = (producer.last_produced_block_time * 500) + epoch;
                  const lastActive = (producer.time_became_active * 500) + epoch;
                  const isActive = (Date.now() - lastProduced) < 1000;
                  return (
                    <Table.Row key={producer.owner} active={isActive}>
                      <Table.Cell textAlign='center'>{idx + 1}</Table.Cell>
                      <Table.Cell>
                        <Header>
                          {producer.owner}
                          <Header.Subheader>
                            <ProducerLink producer={producer} />
                          </Header.Subheader>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        {this.nFormatter(producer.total_votes, 2)}
                      </Table.Cell>
                      <Table.Cell>
                        {(lastProduced === 946684800000)
                          ? 'never'
                          : <TimeAgo date={lastProduced} />
                        }
                      </Table.Cell>
                      <Table.Cell>
                        {(lastActive === 946684800000)
                          ? 'never'
                          : <TimeAgo date={lastActive} />
                        }
                      </Table.Cell>
                      <Table.Cell></Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          )
        }
      </I18n>
    );
  }
}
