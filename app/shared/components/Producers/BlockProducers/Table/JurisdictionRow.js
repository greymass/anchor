// @flow
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class JurisdictionRow extends Component<Props> {
  render() {
    const {
      jurisdictions,
      t
    } = this.props;

    return (
      <div className="table-scroll">
        {this.props.rows[this.props.producer] && this.props.rows[this.props.producer].length > 0 && jurisdictions.PRODUCER === 'SUCCESS' &&
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
              {this.props.rows[this.props.producer].map((row, idx) => (
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
        { /* (!this.props.rows[this.props.producer] || this.props.rows[this.props.producer].length === 0) && */ jurisdictions.PRODUCER === 'PENDING' &&
          <span>Loading...</span>
        }
        {(jurisdictions.PRODUCER === 'FAILURE' || jurisdictions.ALL === 'FAILURE') &&
          <span>Error fetching jurisdictions.</span>
        }
        {(this.props.rows[this.props.producer] && this.props.rows[this.props.producer].length === 0) && jurisdictions.PRODUCER === 'SUCCESS' &&
          <span>No jurisdictions.</span>
        }
      </div>
    );
  }
}
