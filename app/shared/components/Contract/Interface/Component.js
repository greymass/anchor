// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Divider, Header, Label, Menu, Segment, Tab } from 'semantic-ui-react';

import ContractInterfaceTabActions from './Tab/Actions';
import ContractInterfaceTabData from './Tab/Data';
import ContractInterfaceTabTables from './Tab/Tables';
import ContractInterfaceSelectorContract from './Selector/Contract';

import EOSContract from '../../../utils/EOS/Contract';

class ContractInterfaceComponent extends Component<Props> {
  state = {
    contractAction: '',
    contractName: 'customtokens',
    contractTable: ''
  }
  isValidContract = (name) => {
    const { contracts } = this.props;
    return (
      contracts[name]
      && contracts[name] instanceof EOSContract
    );
  }
  onChange = (e, { name, value }) => {
    const state = { [name]: value };
    // Reset the selected action if the contract name changes
    if (name === 'contractName' && value !== this.state.contractName) {
      state.contractAction = '';
      state.contractTable = '';
    }
    this.setState(state);
  }
  onSubmit = () => {
    const { actions } = this.props;
    const { contractName } = this.state;
    actions.getAbi(contractName);
  }
  resetContract = () => this.setState({ contractName: '' });
  render() {
    const {
      actions,
      blockExplorers,
      contracts,
      settings,
      system,
      t,
      tables,
      transaction
    } = this.props;

    const {
      contractAction,
      contractName,
      contractTable
    } = this.state;

    // Ensure the contract is loaded and valid
    const validContract = this.isValidContract(contractName);
    // The selected contract
    const contract = (validContract) ? contracts[contractName] : null;

    const panes = [
      {
        menuItem: {
          key: 'actions',
          icon: 'edit outline',
          content: t('actions')
        },
        pane: {
          key: 'actions',
          content: (
            <ContractInterfaceTabActions
              actions={actions}
              blockExplorers={blockExplorers}
              contract={contract}
              contractAction={contractAction}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              settings={settings}
              system={system}
              transaction={transaction}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'tables',
          icon: 'table',
          content: t('tables')
        },
        pane: {
          key: 'tables',
          content: (
            <ContractInterfaceTabTables
              actions={actions}
              contract={contract}
              contractTable={contractTable}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              tables={tables}
            />
          )
        }
      },
      {
        menuItem: {
          key: 'abi',
          icon: 'file alternate outline',
          content: t('abi')
        },
        pane: {
          key: 'abi',
          content: (
            <ContractInterfaceTabData
              contract={contract}
            />
          )
        }
      },
    ];

    return (
      <Segment basic>
        <Header>
          {t('interface_header')}
          <Header.Subheader>
            {t('interface_subheader')}
          </Header.Subheader>
        </Header>
        <ContractInterfaceSelectorContract
          contract={contract}
          contractName={contractName}
          onChange={this.onChange}
          onReset={this.resetContract}
          onSubmit={this.onSubmit}
        />
        <Divider hidden />
        {(validContract)
          ? (
            <Tab
              defaultActiveIndex={0}
              panes={panes}
              renderActiveOnly={false}
            />
          ) : false
        }
      </Segment>
    );
  }
}

export default translate('contract')(ContractInterfaceComponent);
