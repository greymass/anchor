// @flow
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class JurisdictionRow extends Component<Props> {

  render() {
    return (
      <div className="table-scroll">
        <Table
          className="ui striped unstackable jurisdiction-table"
        >
          <Table.Header className="fullWidth">
            <Table.Row className="active">
              <Table.HeaderCell>
                Jurisdiction
              </Table.HeaderCell>
              <Table.HeaderCell>
                Description
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.rows.map((row) => (
              <Table.Row>
                <Table.Cell>
                  {row.name}
                </Table.Cell>
                <Table.Cell>
                  {row.description}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
