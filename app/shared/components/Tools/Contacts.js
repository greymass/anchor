// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Table, Grid } from 'semantic-ui-react';

import ToolsModalContact from './Modal/Contact';

class ToolsContacts extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      contactToEdit: null,
      openModal: false
    };
  }

  onOpenModal = (contact) => this.setState({ openModal: true, contactToEdit: contact });

  onCloseModal = () => this.setState({ openModal: false });

  render() {
    const {
      actions,
      settings,
      t
    } = this.props;

    const {
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
          trigger={
            <Button
              color="blue"
              content={t('tools_contact_button_cta')}
              fluid
              icon="address book"
              onClick={this.onOpenModal()}
            />
          }
        />

        <Table>
          {contacts.forEach((contact) => {
            return (
              <Table.Row>
                <Table.Cell width="10">
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
                <Table.Cell width="3">
                  <Button
                    content={t('tools_contact_button_edit')}
                    onClick={this.onOpenModal(contact)}
                  />
                </Table.Cell>
                <Table.Cell width="3">
                  <Button
                    content={t('tools_contact_button_delete')}
                    onClick={this.deleteContact(contact)}
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
