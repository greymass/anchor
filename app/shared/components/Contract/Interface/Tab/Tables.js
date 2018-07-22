// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import throttle from 'lodash/throttle';

import { Table, Visibility } from 'semantic-ui-react';

import ContractInterfaceSelectorTable from '../Selector/Table';

class ContractInterfaceTabTables extends Component<Props> {
  state = {
    lastIndex: ''
  };
  lastIndex = throttle(() => {
    const {
      contract,
      contractTable,
      tables
    } = this.props;
    const tableData = get(tables, `${contract.account}.${contract.account}.${contractTable}`)
    if (tableData) {
      const { rows } = tableData;
      const { key_names } = contract.getTable(contractTable);
      const [index] = key_names;
      if (rows && rows.length > 0) {
        const lastIndex = rows[rows.length - 1][index];
        this.setState({
          lastIndex
        });
      }
    }
  }, 500)
  load = throttle(() => {
    // The selected contract
    const {
      actions,
      contract,
      contractTable,
      tables
    } = this.props;
    const {
      lastIndex
    } = this.state;
    const { key_names } = contract.getTable(contractTable);
    const [index] = key_names;
    const tableData = get(tables, `${contract.account}.${contract.account}.${contractTable}`)
    let existing = false;
    if (tableData) {
      const { more, rows } = tableData;
      if (more) {
        existing = rows;
      }
    }
    actions.getTable(
      contract.account,
      contract.account,
      contractTable,
      100,
      index,
      existing
    );

  }, 1000)
  render() {
    const {
      contract,
      contractTable,
      onChange,
      onSubmit,
      tables
    } = this.props;

    let rows = [];
    let fields = [];
    if (contractTable) {
      const { type: dataType } = contract.getTable(contractTable);
      ({ fields } = contract.getStruct(dataType));
      const tableData = get(tables, `${contract.account}.${contract.account}.${contractTable}`)
      if (tableData) {
        ({ rows } = tableData);
      }
    }

    return (
      <React.Fragment>
        <ContractInterfaceSelectorTable
          contract={contract}
          onChange={onChange}
          onSubmit={onSubmit}
        />
        {(contractTable)
          ? (
            <Visibility
              continuous
              key="ContractTable"
              fireOnMount
              onBottomVisible={this.load}
              onBottomPassedReverse={this.lastIndex}
            >
              {(rows && rows.length > 0)
                ? (
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        {fields.map((field) => (
                          <Table.HeaderCell>
                            {field.name}
                          </Table.HeaderCell>
                        ))}
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {rows.map((row) => (
                        <Table.Row>
                          {fields.map((field) => (
                            <Table.Cell>
                              {row[field.name]}
                            </Table.Cell>
                          ))}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                ) : false
              }
            </Visibility>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceTabTables);
