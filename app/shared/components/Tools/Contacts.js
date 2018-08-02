// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import {
  Button,
  Confirm,
  Grid,
  Header,
  Input,
  Loader,
  Message,
  Segment,
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

    const position = findIndex(contacts, { accountName: contact.accountName });

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
      successMessage: message || 'tools_contacts_success_create'
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

    return (
      <React.Fragment>
        <Header>
          {t('tools_contact_header_text')}
        </Header>
        <Input
          icon="search"
          onChange={this.onSearchChange}
          placeholder={t('search')}
        />
        {(successMessage)
          ? (
            <Message
              content={t(successMessage)}
              success
            />
          ) : ''}
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
              content={t('tools_contact_button_cta')}
              fluid
              icon="address book"
              onClick={() => this.onOpenModal()}
            />
          }
        />

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
                <Table.Cell width="12">
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width="8">
                        <p>{contact.fullName}</p>
                      </Grid.Column>
                      <Grid.Column width="8">
                        <p>{contact.accountName}</p>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <p>{contact.defaultMemo}</p>
                    </Grid.Row>
                  </Grid>
                </Table.Cell>
                <Table.Cell width="2">
                  <Button
                    size="mini"
                    content={t('tools_contact_button_edit')}
                    onClick={() => this.onOpenModal(contact)}
                  />
                </Table.Cell>
                <Table.Cell width="2">
                  <Button
                    size="mini"
                    content={t('tools_contact_button_delete')}
                    onClick={() => this.setState({ confirmDelete: true })}
                  />
                  <Confirm
                    open={confirmDelete}
                    onCancel={() => this.setState({ confirmDelete: false })}
                    onConfirm={() => {
                      this.deleteContact(contact);
                      this.setState({ confirmDelete: false });
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Visibility>
        </Table>
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsContacts);
