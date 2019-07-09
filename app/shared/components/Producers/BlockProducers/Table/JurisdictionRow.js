// @flow
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class JurisdictionRow extends Component<Props> {

  render() {
    const {
      codesLabel,
      jurisdictionLabel,
      descriptionLabel,
    } = this.props;

    return (
      <div className="table-scroll">
        {this.props.rows.length > 0 &&
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
              {this.props.rows.length > 0 && this.props.rows.map((row) => (
                <Table.Row>
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
        {/* {this.props.rows.length === 0 && !pending &&
          <Table
            className="ui striped unstackable jurisdiction-table"
          >
            <Table.Header className="fullWidth">
              <Table.Row className="active">
                <Table.HeaderCell className="no-jurisdiction">
                  No jurisdictions for this producer.
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        }
        {pending &&
          <span>Wait...</span>
        } */}
      </div>
    );
  }
}
