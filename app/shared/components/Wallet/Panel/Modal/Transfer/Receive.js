// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Segment, Header, Icon, Modal } from 'semantic-ui-react';

class WalletPanelModalTransferReceive extends Component<Props> {
  render() {
    const {
      accountName,
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
        <Header icon="arrow circle down" content={t('transfer_receive_modal_header')} />
        <Modal.Content>
          <Segment basic clearing vertical textAlign="center">
            <Header>
              {t('transfer_receive_body_text')}
            </Header>
            <Segment
              basic
              clearing
              textAlign="center"
              style={{ padding: '2rem' }}
            >
              <h1>{accountName}</h1>
            </Segment>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={onClose}
          >
            <Icon name="x" /> {t('transfer_close')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('transfer')(WalletPanelModalTransferReceive);
