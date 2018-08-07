// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Confirm,
  Grid,
  Header,
  Input,
  Message,
  Table,
  Visibility
} from 'semantic-ui-react';

import { debounce, filter, findIndex } from 'lodash';

import ToolsModalContact from './Modal/Contact';

class ToolsContacts extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      contactToEdit: null,
      numberToLoad: 10,
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

    this.onSuccess('tools_contacts_success_delete');
  }

  onSuccess = (message) => {
    this.setState({
      openModal: false,
      successMessage: message || 'tools_contacts_success_add'
    }, () => {
      setTimeout(() => {
        this.setState({
          successMessage: false
        });
      }, 5000);
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

    const contactsToDisplay = filter(contacts, (contact) => {
      const matchesFullName = (String(contact.fullName).toLowerCase()).indexOf(query) > -1;
      const matchesAccountName =
        (String(contact.accountName).toLowerCase()).indexOf(query) > -1;

      return !query || matchesFullName || matchesAccountName;
    }).slice(0, numberToLoad);

    const rowButtonContainerStyle = {
      paddingTop: '30px',
      paddingBottom: '30px'
    };

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
          ) : ''}

        {(!contacts || contacts.length === 0)
          ? (
            <Message
              content={t('tools_contacts_none')}
              warning
            />
          ) : ''}

        <Table>
          <Visibility
            continuous
            key="ContactsTable"
            fireOnMount
            onBottomVisible={this.loadMore}
            once={false}
          >
            {contactsToDisplay.map((contact) => (
              <Table.Row key={contact.accountName}>
                <Table.Cell width="3">
                  <p>{contact.accountName}</p>
                </Table.Cell>
                <Table.Cell width="4">
                  <p>{contact.fullName}</p>
                </Table.Cell>
                <Table.Cell width="9">
                  <p>{contact.defaultMemo}</p>
                </Table.Cell>
                <Table.Cell style={rowButtonContainerStyle} width="2">
                  <Button
                    content={t('tools_contact_button_edit')}
                    icon="address book"
                    fluid
                    onClick={() => this.onOpenModal(contact)}
                    size="mini"
                  />
                </Table.Cell>
                <Table.Cell style={rowButtonContainerStyle} width="1">
                  <Button
                    color="red"
                    fluid
                    icon="minus circle"
                    onClick={() => this.setState({ confirmDelete: true, contactToDelete: contact })}
                    size="mini"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Visibility>
        </Table>
        <Confirm
          content={t('tools_contact_confirm_delete_text')}
          open={confirmDelete}
          onCancel={() => {
            this.setState({ confirmDelete: false });
          }}
          onConfirm={() => {
            this.deleteContact();
            this.setState({ confirmDelete: false });
          }}
        />
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsContacts);
