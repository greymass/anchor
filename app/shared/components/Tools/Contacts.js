// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Table, Grid, Confirm } from 'semantic-ui-react';

import ToolsModalContact from './Modal/Contact';

class ToolsContacts extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      confirmDelete: false,
      contactToEdit: null,
      openModal: false
    };
  }

  onOpenModal = (contact) => this.setState({ openModal: true, contactToEdit: contact });

  onCloseModal = () => this.setState({ openModal: false });

  deleteContact = (contact) => {
    const {
      contacts
    } = this.state;

    const position = contacts.map((cont) => cont.accountName).indexOf(contact.accountName);

    contacts.slice(position, 1);

    this.setState({ openModal: true, contactToEdit: contact });
  }

  render() {
    const {
      actions,
      settings,
      t
    } = this.props;

    const {
      confirmDelete,
      contactToEdit,
      openModal
    } = this.state;

    const {
      contacts
    } = settings;

    return (
      <React.Fragment>
        <Header>
          {t('tools_contact_header_text')}
        </Header>
        <ToolsModalContact
          open={openModal}
          actions={actions}
          contacts={contacts}
          contactToEdit={contactToEdit}
          onClose={this.onCloseModal}
          trigger={
            <Button
              color="blue"
              content={t('tools_contact_button_cta')}
              fluid
              icon="address book"
              onClick={this.onOpenModal}
            />
          }
        />

        <Table>
          {(contacts).map((contact) => {
            return (
              <Table.Row>
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
                    onConfirm={() => this.deleteContact(contact)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table>
      </React.Fragment>
    );
  }
}

export default translate('tools')(ToolsContacts);
