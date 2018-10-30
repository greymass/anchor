// @flow
import React, { Component } from 'react';
import ReactJson from 'react-json-view';
import { translate } from 'react-i18next';
import { get } from 'dot-prop-immutable';
import throttle from 'lodash/throttle';

import { Header, Segment, Table, Visibility } from 'semantic-ui-react';

import ContractInterfaceSelectorTable from '../Selector/Table';

class ContractInterfaceTabTables extends Component<Props> {
  state = {
    lastIndex: ''
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.contractTable !== prevProps.contractTable
      || this.props.contractTableScope !== prevProps.contractTableScope
    ) {
      this.load();
    }
  }
  lastIndex = throttle(() => {
    const {
      contract,
      contractTable,
      contractTableScope,
      tables
    } = this.props;
    const tableScope = contractTableScope || contract.account;
    const tableData = get(tables, `${contract.account}.${tableScope}.${contractTable}`)
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
  load = throttle((refresh = false) => {
    // The selected contract
    const {
      actions,
      contract,
      contractTable,
      contractTableScope,
      tables
    } = this.props;
    const {
      lastIndex
    } = this.state;
    if (!contractTable) return;
    const { key_names } = contract.getTable(contractTable);
    const [index] = key_names;
    const tableScope = contractTableScope || contract.account;
    const tableData = get(tables, `${contract.account}.${tableScope}.${contractTable}`)
    let rows = false;
    let more = false;
    if (!refresh && tableData) {
      ({ more, rows } = tableData);
    }
    if (!rows || more || refresh) {
      actions.getTable(
        contract.account,
        tableScope,
        contractTable,
        100,
        index,
        rows
      );
    }
  }, 1000)
  onSet = (data) => this.props.onSet(data, () => this.load(true));
  render() {
    const {
      contract,
      contractTable,
      contractTableScope,
      onChange,
      onSet,
      t,
      tables
    } = this.props;
    let rows = [];
    let fields = [];
    if (contractTable) {
      const table = contract.getTable(contractTable);
      if (table) {
        const { type: dataType } = table;
        const tableScope = contractTableScope || contract.account;
        ({ fields } = contract.getStruct(dataType));
        const tableData = get(tables, `${contract.account}.${tableScope}.${contractTable}`)
        if (tableData) {
          ({ rows } = tableData);
        }
      }
    }

    return (
      <React.Fragment>
        <ContractInterfaceSelectorTable
          contract={contract}
          contractTable={contractTable}
          contractTableScope={contractTableScope}
          onChange={onChange}
          onSet={this.onSet}
        />
        {(contractTable)
          ? (
            <Visibility
              continuous
              key="ContractTable"
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
                              {(row[field.name] instanceof Object)
                                ? JSON.stringify(row[field.name])
                                : row[field.name]
                              }
                            </Table.Cell>
                          ))}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )
                : (
                  <Segment color="orange" secondary stacked>
                    <Header textAlign="center">
                      {t('interface_tables_no_records')}
                    </Header>
                  </Segment>
                )
              }
            </Visibility>
          ) : false
        }
      </React.Fragment>
    );
  }
}

export default translate('contract')(ContractInterfaceTabTables);
