// @flow
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class JurisdictionRow extends Component<Props> {
  render() {
    const {
      rows,
      producer,
      jurisdictions,
      PRODUCERS,
      ALLS,
      t
    } = this.props;

    console.log('#### row', this.props);

    return (
      <div className="table-scroll">
        {rows[producer] && rows[producer].length > 0 && PRODUCERS[producer] === 'SUCCESS' &&
          <Table
            className="ui striped unstackable small jurisdiction-table"
          >
            <Table.Header className="fullWidth">
              <Table.Row className="active">
                <Table.HeaderCell>
                  {t('block_producer_jurisdictions_code_table_header')}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t('block_producer_jurisdictions_jurisdiction_table_header')}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t('block_producer_jurisdictions_description_table_header')}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows[producer].map((row, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell singleLine>
                    {row.code}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    <span className="jurisdiction-wrapper-name">
                      {row.name}
                    </span>
                  </Table.Cell>
                  <Table.Cell singleLine>
                    <span className="jurisdiction-wrapper-description">
                      {row.description}
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        }
        {PRODUCERS[producer] === 'PENDING' &&
          <span>{t('block_producer_jurisdictions_state_loading')}</span>
        }
        {(PRODUCERS[producer] === 'FAILURE' || ALLS[producer] === 'FAILURE') &&
          <span>{t('block_producer_jurisdictions_state_error')}</span>
        }
        {(rows[producer] && rows[producer].length === 0) && PRODUCERS[producer] === 'SUCCESS' &&
          <span>{t('block_producer_jurisdictions_state_none')}</span>
        }
      </div>
    );
  }
}
