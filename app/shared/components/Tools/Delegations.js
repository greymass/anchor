// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Confirm,
  Header,
  Input,
  Message,
  Table,
  Visibility
} from 'semantic-ui-react';

import { debounce, findIndex, sortBy } from 'lodash';

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

  onOpenModal = (delegation) => this.setState({ openModal: true, delegationToEdit: delegation });

  onCloseModal = () => this.setState({ openModal: false });

  onSearchChange = debounce((e, { value }) => {
    const query = String(value).toLowerCase();

    this.setState({ query });
  }, 300);

  deleteContact = (contact) => {
    const {
      actions,
      settings
    } = this.props;
    const {
      contacts
    } = settings;
    const {
      delegationToDelete
    } = this.state;

    const position = findIndex(contacts, { accountName: (contact || delegationToDelete).accountName });

    contacts.splice(position, 1);

    actions.setSetting(
      'contacts',
      contacts
    );
  }

  onSuccess = (message) => {
    this.setState({
      openModal: false,
      successMessage: message || 'tools_contacts_success_add'
    });
  }

  render() {
    const {
      actions,
      delegations,
      settings,
      t
    } = this.props;

    const {
      confirmDelete,
      delegationToEdit,
      openModal,
      successMessage
    } = this.state;

    const delegationsToDisplay = sortBy(delegations, 'accountName');

    return (
      <React.Fragment>
        <Header>
          {t('tools_delegation_header_text')}
        </Header>
        <ToolsModalDelegation
          open={openModal}
          actions={actions}
          delegationToEdit={delegationToEdit}
          deleteDelegation={this.deleteDelegation}
          onClose={this.onCloseModal}
          onSuccess={this.onSuccess}
          trigger={
            <Button
              color="blue"
              content={t('tools_contact_button_add')}
              icon="plus circle"
              style={{ float: 'right' }}
              onClick={() => this.onOpenModal()}
            />
          }
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
                      {t('tools_contacts_contact_account_name')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('tools_contacts_contact_label')}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {t('tools_contacts_contact_default_memo')}
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {delegationsToDisplay.map((delegation) => (
                    <Table.Row>
                      <Table.Cell>
                        {delegation.accountName}
                      </Table.Cell>
                      <Table.Cell>
                        {delegation.label}
                      </Table.Cell>
                      <Table.Cell>
                        {delegation.defaultMemo}
                      </Table.Cell>
                      <Table.Cell width="2">
                        <Button
                          content={t('tools_contact_button_edit')}
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
                            this.setState({ confirmDelete: true, delegationToDelete: delegation });
                          }}
                          size="mini"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Confirm
                content={t('tools_delegations_confirm_delete_text')}
                open={confirmDelete}
                onCancel={() => {
                  this.setState({ confirmDelete: false });
                }}
                onConfirm={() => {
                  this.deleteContact();
                  this.setState({ confirmDelete: false }, () => {
                    this.onSuccess('tools_delegations_success_delete');
                  });
                }}
              />
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsDelegations);
