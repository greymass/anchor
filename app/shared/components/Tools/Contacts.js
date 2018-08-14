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

import { debounce, filter, findIndex, sortBy } from 'lodash';

import ToolsModalContact from './Modal/Contact';

class ToolsContacts extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      contactToEdit: null,
      numberToLoad: 20,
      openModal: false
    };
  }

  onOpenModal = (contact) => this.setState({ openModal: true, contactToEdit: contact });

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
      contactToDelete
    } = this.state;

    const position = findIndex(contacts, { accountName: (contact || contactToDelete).accountName });

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

  loadMore = () => this.setState({ numberToLoad: this.state.numberToLoad + 20 });

  render() {
    const {
      actions,
      settings,
      t
    } = this.props;

    const {
      confirmDelete,
      contactToEdit,
      numberToLoad,
      openModal,
      query,
      successMessage
    } = this.state;

    const {
      contacts
    } = settings;

    const sortedContacts = sortBy(contacts, 'accountName');

    const contactsToDisplay = filter(sortedContacts, (contact) => {
      const matchesLabel = (String(contact.label).toLowerCase()).indexOf(query) > -1;
      const matchesAccountName =
        (String(contact.accountName).toLowerCase()).indexOf(query) > -1;

      return !query || matchesLabel || matchesAccountName;
    }).slice(0, numberToLoad);

    return (
      <React.Fragment>
        <Header>
          {t('tools_contact_header_text')}
        </Header>
        <Input
          icon="search"
          onChange={this.onSearchChange}
          placeholder={t('tools_contact_search_text')}
        />
        <ToolsModalContact
          open={openModal}
          actions={actions}
          contacts={contacts}
          contactToEdit={contactToEdit}
          deleteContact={this.deleteContact}
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

        {(!contacts || contacts.length === 0)
          ? (
            <Message
              content={t('tools_contacts_none')}
              warning
            />
          ) : (
            <div>
              <br />
              <Visibility
                continuous
                key="ContactsTable"
                fireOnMount
                onBottomVisible={this.loadMore}
                once={false}
              >
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
                    {contactsToDisplay.map((contact) => (
                      <Table.Row>
                        <Table.Cell>
                          {contact.accountName}
                        </Table.Cell>
                        <Table.Cell>
                          {contact.label}
                        </Table.Cell>
                        <Table.Cell>
                          {contact.defaultMemo}
                        </Table.Cell>
                        <Table.Cell width="2">
                          <Button
                            content={t('tools_contact_button_edit')}
                            icon="address book"
                            fluid
                            onClick={() => this.onOpenModal(contact)}
                            size="mini"
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            color="red"
                            fluid
                            icon="minus circle"
                            onClick={() => {
                              this.setState({ confirmDelete: true, contactToDelete: contact });
                            }}
                            size="mini"
                          />
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </Visibility>
              <Confirm
                content={t('tools_contact_confirm_delete_text')}
                open={confirmDelete}
                onCancel={() => {
                  this.setState({ confirmDelete: false });
                }}
                onConfirm={() => {
                  this.deleteContact();
                  this.setState({ confirmDelete: false }, () => {
                    this.onSuccess('tools_contacts_success_delete');
                  });
                }}
              />
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsContacts);
