// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Confirm,
  Header,
  Message,
  Table,
} from 'semantic-ui-react';

import { sortBy } from 'lodash';

import ToolsModalDelegation from './Modal/Delegation';

class ToolsDelegations extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      delegationToEdit: null,
      openModal: false
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      settings
    } = this.props;

    actions.getTable('eosio', settings.account, 'delband');
  }

  onOpenModal = (delegation) => this.setState({ openModal: true, delegationToEdit: delegation });

  onCloseModal = () => this.setState({ openModal: false });

  onSuccess = (message) => {
    this.setState({
      openModal: false,
      successMessage: message || 'tools_contacts_success_add'
    });
  }

  render() {
    const {
      accounts,
      actions,
      balances,
      blockExplorers,
      tables,
      keys,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    const {
      delegationToEdit,
      delegationToRemove,
      openModal,
      successMessage
    } = this.state;

    const delegations = tables &&
                        tables.eosio &&
                        tables.eosio[settings.account] &&
                        tables.eosio[settings.account].delband.rows;

    const delegationsToDisplay = sortBy(delegations, 'accountName');

    return (
      <React.Fragment>
        <Header>
          {t('tools_delegation_header_text')}
        </Header>
        <ToolsModalDelegation
          account={accounts[settings.account]}
          actions={actions}
          balance={balances[settings.account]}
          blockExplorers={blockExplorers}
          delegationToEdit={delegationToEdit}
          delegationToRemove={delegationToRemove}
          keys={keys}
          onClose={this.onCloseModal}
          openModal={openModal}
          settings={settings}
          system={system}
          validate={validate}
          wallet={wallet}
        />

        {(successMessage)
          ? (
            <Message
              content={t(successMessage)}
              success
            />
          ) : <br />}

        {(!delegations || delegations.length === 0)
          ? (
            <Message
              content={t('tools_delegations_none')}
              warning
            />
          ) : (
            <div>
              <br />
              <Table>
                <Table.Header>
                  <Table.Row key="tools_contacts_headers">
                    <Table.HeaderCell width="3">
                      {t('tools_delegations_account_name')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('tools_delegations_cpu_amount')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('tools_delegations_net_amount')}
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {delegationsToDisplay.map((delegation) => (
                    <Table.Row>
                      <Table.Cell>
                        {delegation.to}
                      </Table.Cell>
                      <Table.Cell>
                        {delegation.cpu_weight}
                      </Table.Cell>
                      <Table.Cell>
                        {delegation.net_weight}
                      </Table.Cell>
                      <Table.Cell width="2">
                        <Button
                          content={t('tools_delegation_button_edit')}
                          icon="address book"
                          fluid
                          onClick={() => this.onOpenModal(delegation)}
                          size="mini"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="red"
                          fluid
                          icon="minus circle"
                          onClick={() => {
                            this.setState({
                              delegationToRemove: delegation,
                              openModal: true
                            });
                          }}
                          size="mini"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsDelegations);
