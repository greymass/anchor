// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Icon, Modal, Segment } from 'semantic-ui-react';

export default class ProducersVotingPreviewSuccess extends Component<Props> {
  render() {
    const {
      lastTransaction,
      onClose
    } = this.props;
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment>
              <Header icon="checkmark" content={t('producer_voter_preview_transaction_successful_title')} />
              <Modal.Content>
                <h3>
                  {t('producer_voter_preview_transaction_successful_message')}
                </h3>
                <Segment basic padded textAlign="center">
                  <pre>{lastTransaction.transaction_id}</pre>
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button color="green" onClick={onClose}>
                  <Icon name="checkmark" /> {t('producer_voter_preview_close')}
                </Button>
              </Modal.Actions>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
