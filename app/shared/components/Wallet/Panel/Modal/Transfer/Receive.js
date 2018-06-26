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
        <Header icon="unlock" content={t('wallet_panel_wallet_unlock_modal_title')} />
        <Modal.Content>
          <Segment basic clearing vertical textAlign="center">
            <Header>
              {t('transfer_receiving_title')}
            </Header>
            <Header size="small">
              {t('transfer_receiving_body')}
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
            <Icon name="x" /> {t('cancel')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default translate('receive')(WalletPanelModalTransferReceive);
