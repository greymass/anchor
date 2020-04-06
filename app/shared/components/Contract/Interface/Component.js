// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Checkbox, Header, Icon, Label, List, Segment, Tab } from 'semantic-ui-react';

import ContractInterfaceTabActions from './Tab/Actions';
import ContractInterfaceTabData from './Tab/Data';
import ContractInterfaceTabTables from './Tab/Tables';
import ContractInterfaceSelectorContract from './Selector/Contract';

import EOSContract from '../../../utils/EOS/Contract';

class ContractInterfaceComponent extends Component<Props> {
  state = {
    contractAction: '',
    contractName: '',
    contractTable: '',
    contractTableScope: ''
  };
  isValidContract = (name) => {
    const { contracts } = this.props;
    return (
      contracts[name]
      && contracts[name] instanceof EOSContract
    );
  };
  onChange = (e, { name, value }) => {
    const state = { [name]: value };
    // Reset the selected action if the contract name changes
    if (name === 'contractName') {
      state.contractAction = '';
      state.contractTable = '';
      state.contractTableScope = '';
    }
    if (name === 'contractAction') {
      this.props.actions.setRecentContractAction(this.state.contractName, value);
    }
    this.setState(state);
  };
  onSet = (data, callback = () => {}) => this.setState(data, callback)
  onSubmit = () => {
    const { actions } = this.props;
    const { contractName } = this.state;
    actions.getAbi(contractName);
  };
  loadRecent = (contract, action) => {
    this.setState({
      contractName: contract,
      contractAction: action,
    }, () => {
      this.onSubmit()
    })
  }
  // Reset table scope to prevent visibility element from retriggering constantly
  onTabChange = () => this.setState({
    contractTable: '',
    contractTableScope: ''
  });
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
      transaction,
      unlocked,
    } = this.props;

    const {
      contractAction,
      contractName,
      contractTable,
      contractTableScope
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
              unlocked={unlocked}
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
              contractTableScope={contractTableScope}
              onChange={this.onChange}
              onSet={this.onSet}
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
      <Segment color="violet" piled style={{ margin: 0 }}>
        {(!settings.acceptedContractInterface)
          ? (
            (
              <Segment
                color="blue"
                content={(
                  <React.Fragment>
                    <Header>
                      <Icon color="blue" name="info circle" />
                      <Header.Content>
                        {t('interface_instructions_header')}
                        <Header.Subheader>
                          {t('interface_instructions_subheader')}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                    <p>
                      {t('interface_instructions_body_1')}
                    </p>
                    <p>
                      {t('interface_instructions_body_2')}
                    </p>
                    <p>
                      {t('interface_instructions_body_3')}
                    </p>
                    <Checkbox
                      label={t('interface_instructions_understood')}
                      onChange={() => this.props.actions.setSetting('acceptedContractInterface', true)}
                    />
                  </React.Fragment>
                )}
                padded
                secondary
                stacked
              />
            )
          ) : (
            <ContractInterfaceSelectorContract
              contract={contract}
              contractName={contractName}
              key={contractName}
              onReset={this.resetContract}
              onSet={this.onSet}
              onSubmit={this.onSubmit}
              settings={settings}
              system={system}
            />
          )
        }
        {(validContract)
          ? (
            <Tab
              defaultActiveIndex={0}
              onTabChange={this.onTabChange}
              panes={panes}
              renderActiveOnly={false}
            />
          )
          : false
        }
        {(!validContract && settings.recentContractActions && settings.recentContractActions.length > 0)
          ? (
            <Segment secondary stacked>
              <Header>
                Recently contract actions
                <Header.Subheader>
                  Click one of the recently used combinations below to load it.
                </Header.Subheader>
              </Header>
              {settings.recentContractActions.map((recent) => {
                const [recentContractName, recentContractAction] = recent.split(':');
                return (
                  <Label
                    basic
                    onClick={() => this.loadRecent(recentContractName, recentContractAction)}
                    style={{ cursor: 'pointer' }}
                    color="blue"
                  >
                    {recentContractName}
                    <Label.Detail>{recentContractAction}</Label.Detail>
                  </Label>
                )
              })}
            </Segment>
          )
          : false
        }
      </Segment>
    );
  }
}

export default translate('contract')(ContractInterfaceComponent);
