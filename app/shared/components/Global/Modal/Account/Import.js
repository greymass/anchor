// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Message, Modal } from 'semantic-ui-react';

class GlobalModalAccountImport extends Component<Props> {
  render() {
    const {
      onClose,
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
        <Header icon="unlock" content={t('global_modal_account_import_header')} />
        <Modal.Content>

        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
          <Button
            color="green"
            content={t('global_modal_account_import_action')}
            icon="circle plus"
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('global')(GlobalModalAccountImport);
