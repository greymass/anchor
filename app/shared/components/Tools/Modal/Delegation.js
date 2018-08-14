// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Modal } from 'semantic-ui-react';

import ToolsFormContact from '../Form/Contact';

class ToolsModalContact extends Component<Props> {
  render() {
    const {
      actions,
      contacts,
      contactToEdit,
      deleteContact,
      onClose,
      onSuccess,
      open,
      t,
      trigger
    } = this.props;

    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={onClose}
        open={open}
        size="tiny"
      >
        <Header icon="address book" content={t('tools_modal_contact_header_text')} />
        <Modal.Content>
          <ToolsFormContact
            actions={actions}
            contactToEdit={contactToEdit}
            contacts={contacts}
            deleteContact={deleteContact}
            onClose={onClose}
            onSuccess={onSuccess}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default translate('tools')(ToolsModalContact);
