// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Header,
  Message,
  Segment,
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

  onCloseModal = () => {
    this.setState({
      delegationToEdit: null,
      delegationToRemove: null,
      openModal: false
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
      <Segment basic>
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
        <Header
          content={t('tools_delegation_header_text')}
          floated="left"
          subheader={t('tools_delegation_subheader_text')}
        />
        <Message
          content={t('tools_delegation_info_content')}
          header={t('tools_delegation_info_header')}
          icon="circle question"
          info
        />
        {(successMessage)
          ? (
            <Message
              content={t(successMessage)}
              success
            />
          ) : false }

        {(!delegations || delegations.length === 0)
          ? (
            <Message
              content={t('tools_delegations_none')}
              warning
            />
          ) : (
            <Table definition>
              <Table.Header>
                <Table.Row key="tools_contacts_headers">
                  <Table.HeaderCell width="3">
                    {t('tools_delegations_account_name')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="right">
                    {t('tools_delegations_cpu_amount')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="right">
                    {t('tools_delegations_net_amount')}
                  </Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {delegationsToDisplay.map((delegation) => (
                  <Table.Row>
                    <Table.Cell>
                      {delegation.to}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      {delegation.cpu_weight}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      {delegation.net_weight}
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Button
                        content={t('tools_delegation_button_edit')}
                        icon="microchip"
                        onClick={() => this.onOpenModal(delegation)}
                        size="mini"
                      />
                      {(delegation.to !== settings.account)
                        ? (
                          <Button
                            color="red"
                            icon="minus circle"
                            onClick={() => {
                              this.setState({
                                delegationToRemove: delegation,
                                openModal: true
                              });
                            }}
                            size="mini"
                          />
                        ) : ''}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
      </Segment>
    );
  }
}

export default translate('tools')(ToolsDelegations);
