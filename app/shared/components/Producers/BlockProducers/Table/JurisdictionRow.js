// @flow
import React, { Component } from 'react';
import { Table, Segment } from 'semantic-ui-react';

export default class JurisdictionRow extends Component<Props> {
  render() {
    const {
      codesLabel,
      jurisdictionLabel,
      descriptionLabel,
      jurisdictions,
    } = this.props;

    return (
      <div className="table-scroll">
        {this.props.rows.length > 0 && jurisdictions.PRODUCER === 'SUCCESS' &&
          <Table
            className="ui striped unstackable jurisdiction-table"
          >
            <Table.Header className="fullWidth">
              <Table.Row className="active">
                <Table.HeaderCell>
                  {codesLabel}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {jurisdictionLabel}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {descriptionLabel}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.rows.length > 0 && this.props.rows.map((row, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell singleLine>
                    {row.code}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    {row.name}
                  </Table.Cell>
                  <Table.Cell singleLine>
                    {row.description}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        }
        {jurisdictions.PRODUCER === 'PENDING' &&
          <Table
            className="ui striped unstackable jurisdiction-table"
          >
            <Table.Header className="fullWidth">
              <Table.Row className="active">
                <Table.HeaderCell className="no-jurisdiction">
                  Loading...
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        }
        {this.props.rows.length === 0 && jurisdictions.PRODUCER === 'SUCCESS' &&
          <Table
            className="ui striped unstackable jurisdiction-table"
          >
            <Table.Header className="fullWidth">
              <Table.Row className="active">
                <Table.HeaderCell className="no-jurisdiction">
                  No jurisdictions.
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        }
      </div>
    );
  }
}
